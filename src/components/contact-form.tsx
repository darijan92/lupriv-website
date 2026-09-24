"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE } from "@/data/locations";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Upit s weba — ${name || "Lupriv Plus"}`);
    const body = encodeURIComponent(
      `Ime: ${name}\nEmail: ${email}\n\nPoruka:\n${message}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pošaljite poruku</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Ime</Label>
            <Input id="name" name="name" placeholder="Vaše ime" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="vaš@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Poruka</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Kako vam možemo pomoći?"
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Pošalji poruku
          </Button>
          {sent && (
            <p className="text-sm text-emerald-800">
              Otvara se vaš email klijent. Ako se nije otvorio, pišite na {SITE.email}.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
