import { auth } from "@/lib/firebase";

/** Pide a la web que vuelva a leer los proyectos de Firestore. */
export async function publish() {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch("/api/revalidate", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`Revalidate ${response.status}`);
}
