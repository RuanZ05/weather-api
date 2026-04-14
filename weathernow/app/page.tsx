"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { WeatherCard } from "@/components/WeatherCard";
import { fetchWeatherByCity, type WeatherData } from "@/lib/weather";

export default function Home() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(city: string) {
    setError(null);
    setLoading(true);
    try {
      const result = await fetchWeatherByCity(city);
      setData(result);
    } catch (e) {
      setData(null);
      setError(e instanceof Error ? e.message : "Não foi possível buscar o clima agora.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10">
      {/* Hero — tema céu / raio de sol */}
      <section className="relative overflow-hidden rounded-[2rem] border border-sky-400/25 bg-slate-900/50 shadow-[0_0_0_1px_rgba(56,189,248,0.08),0_25px_80px_-20px_rgba(14,165,233,0.35)] backdrop-blur-md">
        <div
          className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-sky-500/30 blur-3xl home-hero-glow-a"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-400/25 blur-3xl home-hero-glow-b"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl home-hero-glow-a"
          style={{ animationDelay: "-4s" }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 home-hero-shimmer" aria-hidden />

        <div className="relative px-6 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Ao vivo
            </span>
            <span className="text-xs font-medium text-sky-200/80">OpenWeatherMap</span>
          </div>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl sm:leading-[1.05]">
            <span className="bg-gradient-to-br from-white via-sky-100 to-cyan-200 bg-clip-text text-transparent">
              O céu de qualquer cidade,
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-200 to-yellow-100 bg-clip-text text-transparent">
              na hora que você quiser.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
            Em poucos segundos você vê se está quente ou frio, como está o céu e a sensação do
            ar. Se quiser ir além, depois dá para abrir uma tela a mais com umidade, vento e
            país — tudo bem explicadinho.
          </p>

          {/* Decoração: nuvens minimalistas (SVG) */}
          <svg
            className="pointer-events-none absolute bottom-4 right-4 h-24 w-40 text-white/10 sm:right-10 sm:h-28 sm:w-48"
            viewBox="0 0 200 100"
            fill="currentColor"
            aria-hidden
          >
            <path d="M160 55c0-12-10-22-22-22-2 0-4 0-6 1-5-15-19-26-36-26-20 0-36 14-39 33a25 25 0 0 0-22 25c0 14 11 25 25 25h95c11 0 20-9 20-20 0-9-6-17-15-19z" />
            <path d="M70 40c-8 0-15 4-19 10-2-8-9-14-18-14-10 0-18 8-18 18 0 2 0 4 1 6H70c6 0 11-5 11-11 0-5-4-9-9-10z" opacity="0.7" />
          </svg>
        </div>
      </section>

      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 shadow-inner shadow-sky-950/50 backdrop-blur sm:p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-sky-300/90">
            Onde você quer olhar o tempo?
          </p>
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </div>

        {error ? (
          <p
            className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100 shadow-lg shadow-amber-900/20"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        {data ? (
          <div className="space-y-4">
            <WeatherCard data={data} variant="summary" />
            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                href={`/cidade/${encodeURIComponent(data.cityName)}`}
                className="inline-flex items-center justify-center rounded-xl border border-sky-400/40 bg-gradient-to-r from-sky-500/20 to-cyan-500/20 px-5 py-2.5 font-semibold text-sky-100 shadow-lg shadow-sky-900/30 transition hover:border-sky-300/60 hover:from-sky-500/30 hover:to-cyan-500/30"
              >
                Ver página completa desta cidade →
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-slate-400 underline-offset-4 hover:text-slate-200 hover:underline"
              >
                Sobre o projeto
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-slate-900/35 px-4 py-4 text-sm leading-relaxed text-slate-300">
            <p>
              Não precisa saber nada de tecnologia: escreva o nome da cidade do jeito que você
              costuma falar ou ver no jornal, clique em{" "}
              <strong className="text-slate-100">Buscar</strong> e espere um instante. Serve
              para onde você mora, onde tem família ou para onde está planejando ir.
            </p>
            <p className="mt-3 text-slate-400">
              Se não aparecer nada, confira o nome (às vezes muda um acento ou a grafia) e
              tente de novo — é normal errar na primeira.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
