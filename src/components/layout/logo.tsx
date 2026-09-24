import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2 group", className)} aria-label="Lupriv Plus početna">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden>
          <rect x="13" y="4" width="6" height="24" rx="1.5" className="fill-emerald-600" />
          <rect x="4" y="13" width="24" height="6" rx="1.5" className="fill-emerald-600" />
        </svg>
      </span>
      <span className="flex items-baseline gap-1">
        <span className="text-xl font-bold tracking-tight text-charcoal-900 group-hover:text-charcoal-800">
          Lupriv
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Plus</span>
      </span>
    </Link>
  );
}
