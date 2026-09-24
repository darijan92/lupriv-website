"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InstagramIcon } from "@/components/icons";
import { SITE } from "@/data/locations";

const nav = [
  { href: "/", label: "Početna" },
  { href: "/o-nama", label: "O nama" },
  { href: "/usluge", label: "Usluge" },
  { href: "/proizvodi", label: "Proizvodi" },
  { href: "/poslovnice", label: "Poslovnice" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-emerald-50 text-emerald-900"
                  : "text-charcoal-700 hover:bg-sand-50 hover:text-charcoal-900"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="icon" aria-label="Instagram">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href="/poslovnice">Naše poslovnice</Link>
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-charcoal-800 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Zatvori izbornik" : "Otvori izbornik"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-emerald-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-medium",
                  pathname === item.href ? "bg-emerald-50 text-emerald-900" : "text-charcoal-800"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-emerald-800"
            >
              <InstagramIcon className="h-4 w-4" /> Instagram {SITE.instagramHandle}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
