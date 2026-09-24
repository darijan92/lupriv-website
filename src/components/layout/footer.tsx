import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { InstagramIcon } from "@/components/icons";
import { SITE } from "@/data/locations";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-emerald-100 bg-charcoal-950 text-sand-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <Logo className="[&_span]:text-white [&_.text-emerald-600]:text-emerald-400 [&_.bg-emerald-50]:bg-emerald-900/40 [&_.ring-emerald-100]:ring-emerald-800" />
          <p className="max-w-md text-sm leading-relaxed text-sand-200/80">
            Ljekarne Lupriv Plus — uz vas od 1994.
          </p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300 hover:text-emerald-200"
          >
            <InstagramIcon className="h-4 w-4" /> {SITE.instagramHandle}
          </a>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-sand-100">
            Navigacija
          </h3>
          <ul className="space-y-2 text-sm text-sand-200/80">
            <li>
              <Link href="/o-nama" className="hover:text-white">
                O nama
              </Link>
            </li>
            <li>
              <Link href="/usluge" className="hover:text-white">
                Usluge
              </Link>
            </li>
            <li>
              <Link href="/proizvodi" className="hover:text-white">
                Proizvodi
              </Link>
            </li>
            <li>
              <Link href="/poslovnice" className="hover:text-white">
                Poslovnice
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-white">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-sand-100">
            Sjedište
          </h3>
          <ul className="space-y-3 text-sm text-sand-200/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{SITE.addressLine}</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <a href={`tel:${SITE.phoneE164}`} className="hover:text-white">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-sand-200/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 LJZU Lupriv Plus Mostar. Sva prava pridržana.</p>
          <p>
            Dostava diljem BiH · poštarina {SITE.deliveryFee} · besplatno iznad{" "}
            {SITE.freeDeliveryOver}
          </p>
        </div>
        <p className="mx-auto max-w-6xl px-4 pb-4 text-[10px] text-sand-200/40 sm:px-6">
          Fotografije: Unsplash
        </p>
      </div>
    </footer>
  );
}
