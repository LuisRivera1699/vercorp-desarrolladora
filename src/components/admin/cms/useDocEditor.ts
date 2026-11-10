"use client";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import { collectImagePaths, deleteImages, uploadPendingImages } from "./images";
import { publish } from "./publish";

export type SaveStatus =
  | "loading"
  | "load-error"
  | "not-found"
  | "idle"
  | "saving"
  | "saved"
  | "not-published"
  | "error";

/**
 * Edita un documento de Firestore: guarda, sube las imágenes nuevas a
 * `folder`, borra las que dejaron de usarse y publica.
 */
export function useDocEditor<T extends object>(
  path: string,
  id: string,
  {
    validate,
    folder,
    fallback,
  }: {
    validate: (value: T) => string[];
    folder?: string;
    /** Contenido inicial si el documento todavía no existe. */
    fallback?: T;
  },
) {
  const [value, setValue] = useState<T | null>(null);
  const [savedJson, setSavedJson] = useState("");
  const [status, setStatus] = useState<SaveStatus>("loading");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    getDoc(doc(db, path, id))
      .then((snapshot) => {
        if (!active) return;
        if (snapshot.exists()) {
          const data = snapshot.data() as T;
          setValue(data);
          setSavedJson(JSON.stringify(data));
          setStatus("idle");
        } else if (fallback) {
          setValue(fallback);
          setSavedJson(JSON.stringify(fallback));
          setStatus("idle");
        } else {
          setStatus("not-found");
        }
      })
      .catch(() => active && setStatus("load-error"));
    return () => {
      active = false;
    };
    // `fallback` es un valor fijo de quien llama.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, id]);

  const dirty = useMemo(
    () => value !== null && JSON.stringify(value) !== savedJson,
    [value, savedJson],
  );

  const saved = useMemo(() => (savedJson ? (JSON.parse(savedJson) as T) : null), [savedJson]);

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const update = useCallback((next: T) => {
    setValue(next);
    setErrors([]);
    setStatus((current) => (current === "saving" ? current : "idle"));
  }, []);

  const save = useCallback(async () => {
    if (!value || status === "saving") return;

    const problems = validate(value);
    setErrors(problems);
    if (problems.length) {
      setStatus("error");
      return;
    }

    setStatus("saving");
    try {
      const uploaded = folder ? await uploadPendingImages(value, folder) : value;
      await setDoc(doc(db, path, id), uploaded);

      if (folder) {
        const before = collectImagePaths(JSON.parse(savedJson || "null"));
        const after = collectImagePaths(uploaded);
        await deleteImages([...before].filter((item) => !after.has(item)));
      }

      setValue(uploaded);
      setSavedJson(JSON.stringify(uploaded));

      try {
        await publish();
        setStatus("saved");
      } catch {
        setStatus("not-published");
      }
    } catch {
      setErrors(["No se pudo guardar. Revisa tu conexión e inténtalo de nuevo."]);
      setStatus("error");
    }
  }, [path, id, folder, validate, value, savedJson, status]);

  /** Olvida los cambios sin guardar, para salir sin el aviso del navegador. */
  const discard = useCallback(() => setSavedJson(JSON.stringify(value)), [value]);

  return { value, update, save, discard, saved, status, errors, dirty };
}
