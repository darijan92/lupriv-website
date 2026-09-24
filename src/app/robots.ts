import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/payload";

const isProd = process.env.VERCEL_ENV === "production";

export default async function robots(): Promise<MetadataRoute.Robots> {
  if (!isProd) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  const site = await getSiteSettings();
  const BASE = site.url.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
