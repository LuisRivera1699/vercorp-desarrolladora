type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  nullValue?: null;
  timestampValue?: string;
  mapValue?: { fields?: Record<string, FirestoreValue> };
  arrayValue?: { values?: FirestoreValue[] };
};

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
};

function decodeValue(value: FirestoreValue): unknown {
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.integerValue !== undefined) return Number(value.integerValue);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.timestampValue !== undefined) return value.timestampValue;
  if (value.mapValue) return decodeFields(value.mapValue.fields);
  if (value.arrayValue) return (value.arrayValue.values ?? []).map(decodeValue);
  return null;
}

function decodeFields(fields: Record<string, FirestoreValue> = {}) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, decodeValue(value)]),
  );
}

/**
 * Lee una colección pública por REST, con caché hasta que el admin publique
 * (`revalidateTag`). `what` se usa en el mensaje de error.
 */
export async function fetchCollection(path: string, tag: string, what: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}?pageSize=300`;

  const response = await fetch(url, {
    cache: "force-cache",
    next: { tags: [tag] },
  });
  if (!response.ok) {
    throw new Error(`No se pudieron leer ${what} (Firestore ${response.status}).`);
  }

  const { documents = [] } = (await response.json()) as { documents?: FirestoreDocument[] };
  return documents.map((doc) => ({
    id: doc.name.split("/").pop()!,
    data: decodeFields(doc.fields),
  }));
}
