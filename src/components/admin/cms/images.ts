import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { PROJECTS_STORAGE_ROOT } from "@/lib/projects/constants";
import { parseSvg } from "@/lib/projects/svg";
import type { SvgAsset } from "@/lib/projects/types";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_DIMENSION = 2400;
const MAX_BYTES = 5 * 1024 * 1024;
export const OG_SIZE = { width: 1200, height: 630 };

type StoredImage = { url: string; path: string; width: number; height: number };

const pending = new Map<string, Blob>();

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen."));
    };
    img.src = url;
  });
}

/**
 * Las imágenes se guardan en WebP; los planos, con más calidad para que se
 * lean las cotas. La de redes sociales se recorta a 1200x630 en JPEG, el
 * formato que aceptan todas las redes.
 */
export async function prepareImage(
  file: File,
  { og = false, sharp = false } = {},
): Promise<StoredImage> {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Usa una imagen JPG, PNG o WebP.");
  }

  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;

  if (og) {
    canvas.width = OG_SIZE.width;
    canvas.height = OG_SIZE.height;
    const scale = Math.max(OG_SIZE.width / img.naturalWidth, OG_SIZE.height / img.naturalHeight);
    const width = img.naturalWidth * scale;
    const height = img.naturalHeight * scale;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, OG_SIZE.width, OG_SIZE.height);
    context.drawImage(img, (OG_SIZE.width - width) / 2, (OG_SIZE.height - height) / 2, width, height);
  } else {
    const scale = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, og ? "image/jpeg" : "image/webp", sharp ? 0.92 : 0.86),
  );
  if (!blob) throw new Error("No se pudo procesar la imagen.");
  if (blob.size >= MAX_BYTES) {
    throw new Error("La imagen sigue pesando más de 5 MB. Usa una más liviana.");
  }

  const url = URL.createObjectURL(blob);
  pending.set(url, blob);
  return { url, path: "", width: canvas.width, height: canvas.height };
}

/** Lee un SVG, extrae sus formas y deja el archivo original listo para subir. */
export async function prepareSvg(file: File): Promise<SvgAsset> {
  if (file.type !== "image/svg+xml" && !file.name.toLowerCase().endsWith(".svg")) {
    throw new Error("Usa un archivo SVG.");
  }
  if (file.size >= MAX_BYTES) throw new Error("El SVG pesa más de 5 MB.");

  const parsed = parseSvg(await file.text());
  const blob = new Blob([await file.arrayBuffer()], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  pending.set(url, blob);
  return { url, path: "", ...parsed };
}

function isStored(value: unknown): value is StoredImage {
  return (
    typeof value === "object" &&
    value !== null &&
    "url" in value &&
    "path" in value &&
    "width" in value &&
    "height" in value
  );
}

export function collectImagePaths(value: unknown, paths = new Set<string>()) {
  if (isStored(value)) {
    if (value.path) paths.add(value.path);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectImagePaths(item, paths));
  } else if (typeof value === "object" && value !== null) {
    Object.values(value).forEach((item) => collectImagePaths(item, paths));
  }
  return paths;
}

export function projectFolder(slug: string) {
  return `${PROJECTS_STORAGE_ROOT}/${slug}`;
}

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

async function uploadPending<T extends StoredImage>(image: T, folder: string): Promise<T> {
  const blob = pending.get(image.url);
  if (!blob) return image;

  const path = `${folder}/${crypto.randomUUID()}.${EXTENSIONS[blob.type] ?? "webp"}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob, {
    contentType: blob.type,
    cacheControl: "public, max-age=31536000",
  });
  const url = await getDownloadURL(storageRef);
  pending.delete(image.url);
  URL.revokeObjectURL(image.url);
  return { ...image, url, path };
}

/** Sube las imágenes nuevas a `folder` y devuelve el valor con sus URLs definitivas. */
export async function uploadPendingImages<T>(value: T, folder: string): Promise<T> {
  if (isStored(value)) return (await uploadPending(value, folder)) as T;
  if (Array.isArray(value)) {
    return (await Promise.all(value.map((item) => uploadPendingImages(item, folder)))) as T;
  }
  if (typeof value === "object" && value !== null) {
    const entries = await Promise.all(
      Object.entries(value).map(async ([key, item]) => [key, await uploadPendingImages(item, folder)]),
    );
    return Object.fromEntries(entries) as T;
  }
  return value;
}

export async function deleteImages(paths: Iterable<string>) {
  await Promise.allSettled([...paths].map((path) => deleteObject(ref(storage, path))));
}

/** Todo lo que haya en la carpeta del proyecto, incluidos archivos que ya no estén en el documento. */
export async function listProjectImages(slug: string) {
  const { items } = await listAll(ref(storage, projectFolder(slug)));
  return items.map((item) => item.fullPath);
}
