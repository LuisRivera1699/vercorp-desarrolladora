import type { Metadata } from "next";
import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin Vercorp Desarrolladora",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-neutral-50 text-foreground">{children}</div>
    </AdminAuthProvider>
  );
}
