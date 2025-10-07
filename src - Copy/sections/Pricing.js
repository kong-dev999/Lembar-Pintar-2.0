"use client";

import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const plans = (yearly) => [
  {
    name: "Free",
    badge: "Mulai Belajar",
    price: yearly ? "GRATIS" : "GRATIS",
    suffix: "selamanya",
    cta: "Coba Gratis",
    href: "/signup",
    highlight: false,
    features: [
      "Ribuan template dasar",
      "Export PNG (720p)",
      "10 proyek aktif",
      "5 kredit AI Assist / bln",
      "Tanpa kartu kredit",
    ],
  },
  {
    name: "Pro",
    badge: "Paling Populer",
    price: yearly ? "Rp35.000" : "Rp30.000",
    suffix: yearly ? "/bln (tagihan tahunan)" : "/bln",
    cta: "Upgrade ke Pro",
    href: "/checkout?plan=pro",
    highlight: true,
    features: [
      "Semua di Free",
      "Export PNG/PDF (1080p)",
      "Tak terbatas proyek",
      "Brand Kit & Font kustom",
      "50 kredit AI Assist / bln",
      "Scheduler Post (IG/TikTok)",
      "Tanpa watermark",
    ],
  },
  {
    name: "Premium",
    badge: "Untuk Sekolah/Tim",
    price: yearly ? "Custom" : "Rp200.000",
    suffix: yearly ? "/user/bln (tahunan)" : "/user/bln",
    cta: "Hubungi Penjualan",
    href: "/contact",
    highlight: false,
    features: [
      "Semua di Pro",
      "Kolaborasi realtime",
      "Folder & izin anggota",
      "Template institusi",
      "SSO (Google Workspace)",
      "Analytics & audit log",
      "Prioritas dukungan",
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  const data = plans(yearly);

  return (
    <section id="harga" className="relative w-full py-8">
      {/* header bg subtle */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-slate-50" />
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Harga Termurah di Kelasnya
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Pilih paket yang pas untuk{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              mengajar & berkarya
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            Fokus ke materi & hasil. Kami yang urus template, brand kit, kolaborasi, dan AI assist.
          </p>

          {/* Billing Toggle */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium",
                !yearly ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              Bulanan
            </button>
            <button
              onClick={() => setYearly(true)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium",
                yearly ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              Tahunan <span className="ml-1 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">Hemat 20%</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3">
          {data.map((plan) => (
            <div
              key={plan.name}
              className={[
                "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white",
                plan.highlight ? "border-blue-200 shadow-xl shadow-blue-500/10" : "border-slate-200 shadow-sm",
              ].join(" ")}
            >
              {/* ribbon */}
              {plan.highlight && (
                <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow">
                  Rekomendasi
                </div>
              )}

              {/* header */}
              <div className="p-6 sm:p-8">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {plan.badge}
                </span>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{plan.name}</h3>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="pb-1 text-sm text-slate-500">{plan.suffix}</span>
                </div>
              </div>

              <div className="mx-6 h-px bg-slate-200" />

              {/* fitur = pengisi ruang */}
              <ul className="grid gap-3 p-6 sm:p-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <CheckIcon className="mt-0.5 h-5 w-5 text-green-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* tombol = selalu di bawah */}
              <div className="p-6 sm:p-8 pt-0">
                <Link
                  href={plan.href}
                  className={[
                    "inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-center text-sm font-semibold shadow transition",
                    plan.highlight
                      ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:brightness-110"
                      : "border border-blue-600 text-blue-600 hover:bg-blue-50",
                  ].join(" ")}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Harga dapat berubah sewaktu-waktu. Paket Tahunan ditagihkan per tahun. Paket Premium minimal 3 pengguna.
        </p>
      </div>
    </section>
  );
}