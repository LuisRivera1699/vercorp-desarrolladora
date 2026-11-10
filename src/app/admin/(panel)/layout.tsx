"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import AdminLoading from "@/components/admin/AdminLoading";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAdminAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/admin/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (loading || !user) return <AdminLoading />;

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-black/5 lg:block">
        <AdminSidebar email={user.email} />
      </aside>

      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-black/5 bg-white/90 px-5 backdrop-blur lg:hidden">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/brand/vercorp-desarrolladora-logo-dark.png"
            alt="Vercorp Desarrolladora"
            width={900}
            height={291}
            priority
            className="h-7 w-auto"
          />
          <span className="text-[10px] font-semibold tracking-[0.22em] text-foreground/45 uppercase">
            Admin
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="admin-mobile-menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-black/[0.04]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </header>

      <div
        id="admin-mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú del panel"
          inert={!menuOpen}
          className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AdminSidebar email={user.email} onNavigate={closeMenu} />
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Cerrar menú"
            className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-lg text-foreground/60 transition-colors hover:bg-black/[0.04]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>

      <div className="lg:pl-60">
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">{children}</main>
      </div>
    </>
  );
}
