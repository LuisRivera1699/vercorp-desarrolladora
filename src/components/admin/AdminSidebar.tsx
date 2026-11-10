"use client";

import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { ADMIN_NAV, ADMIN_NAV_FOOTER, type AdminNavIcon, type AdminNavItem } from "./adminNav";

const ICONS: Record<AdminNavIcon, React.ReactNode> = {
  projects: (
    <>
      <path d="M3.5 19.5h17" />
      <path d="M4.5 19.5 10 9l3.5 6 2-3 4 7.5" />
      <path d="M15.5 4.5v4M15.5 4.5h3.5l-1 1.25 1 1.25h-3.5" />
    </>
  ),
  backing: (
    <>
      <path d="M12 3.5 5 6.5v5c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9v-5l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  content: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M8 9h8M8 12.5h8M8 16h5" />
    </>
  ),
};

export function NavIcon({ icon, className }: { icon: AdminNavIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {ICONS[icon]}
    </svg>
  );
}

export default function AdminSidebar({
  email,
  onNavigate,
}: {
  email: string | null;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-white">
      <Link
        href="/admin"
        onClick={onNavigate}
        className="flex h-16 shrink-0 items-center gap-3 border-b border-black/5 px-5"
      >
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

      <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Secciones del panel">
        <NavList items={ADMIN_NAV} pathname={pathname} onNavigate={onNavigate} />
      </nav>

      {ADMIN_NAV_FOOTER.length ? (
        <nav className="shrink-0 px-3 pb-3" aria-label="Ajustes del panel">
          <NavList items={ADMIN_NAV_FOOTER} pathname={pathname} onNavigate={onNavigate} />
        </nav>
      ) : null}

      <div className="shrink-0 border-t border-black/5 p-4">
        <p className="truncate text-xs text-foreground/55" title={email ?? undefined}>
          {email}
        </p>
        <button
          type="button"
          onClick={() => signOut(auth)}
          className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium ring-1 ring-black/10 transition-colors hover:bg-black/[0.04]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden
          >
            <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10" />
          </svg>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

function NavList({
  items,
  pathname,
  onNavigate,
}: {
  items: AdminNavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-1">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent-soft/60 text-ink"
                  : "text-foreground/70 hover:bg-black/[0.04] hover:text-foreground"
              }`}
            >
              <NavIcon
                icon={item.icon}
                className={`h-[18px] w-[18px] shrink-0 ${active ? "text-earth" : ""}`}
              />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
