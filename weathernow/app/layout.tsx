import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WeatherNow — clima em tempo real",
  description:
    "Busque uma cidade e veja temperatura, sensação térmica, descrição do céu e detalhes extras.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-950 text-slate-100 antialiased`}
      >
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#070b14] via-slate-950 to-slate-900">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-30%,rgba(56,189,248,0.22),transparent_55%),radial-gradient(ellipse_50%_45%_at_100%_10%,rgba(251,191,36,0.12),transparent_50%),radial-gradient(ellipse_45%_50%_at_0%_80%,rgba(6,182,212,0.1),transparent_45%)]"
            aria-hidden
          />
          <header className="relative z-10 border-b border-white/10 bg-slate-950/30 backdrop-blur-sm">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <Link
                href="/"
                className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-50 hover:text-white"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-cyan-600 text-base shadow-lg shadow-sky-500/25 ring-1 ring-white/20 transition group-hover:shadow-sky-400/40"
                  aria-hidden
                >
                  ☀
                </span>
                WeatherNow
              </Link>
              <nav className="flex items-center gap-5 text-sm text-slate-400">
                <Link href="/" className="hover:text-slate-100">
                  Início
                </Link>
                <Link href="/sobre" className="hover:text-slate-100">
                  Sobre
                </Link>
              </nav>
            </div>
          </header>

          <main className="relative z-10">{children}</main>

          <footer className="relative z-10 mx-auto max-w-5xl px-4 py-10 text-xs text-slate-600 sm:px-6">
            Dados em tempo real via OpenWeatherMap. Projeto acadêmico — FAETERJ.
          </footer>
        </div>
      </body>
    </html>
  );
}
