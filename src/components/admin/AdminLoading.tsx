export default function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center" role="status">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      <span className="sr-only">Cargando</span>
    </div>
  );
}
