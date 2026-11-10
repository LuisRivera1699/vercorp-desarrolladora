import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { revalidateTag } from "next/cache";
import { HOME_TAG } from "@/lib/home/constants";
import { BACKING_TAG, PROJECTS_TAG } from "@/lib/projects/constants";

function adminAuth() {
  const app =
    getApps()[0] ??
    initializeApp({ projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID });
  return getAuth(app);
}

export async function POST(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) {
    return Response.json({ error: "Falta el token." }, { status: 401 });
  }

  try {
    await adminAuth().verifyIdToken(token);
  } catch {
    return Response.json({ error: "Sesión no válida." }, { status: 401 });
  }

  revalidateTag(PROJECTS_TAG, { expire: 0 });
  revalidateTag(BACKING_TAG, { expire: 0 });
  revalidateTag(HOME_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
