import Link from "next/link";
import { notFound } from "next/navigation";
import { WeatherCard } from "@/components/WeatherCard";
import { fetchWeatherByCity } from "@/lib/weather";

type PageProps = {
  params: { name: string };
};

export default async function CityPage({ params }: PageProps) {
  const city = decodeURIComponent(params.name);

  let data;
  try {
    data = await fetchWeatherByCity(city);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("NEXT_PUBLIC_WEATHER_KEY")) {
      return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <p className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            {msg}
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex text-sm text-sky-300 underline-offset-4 hover:underline"
          >
            Voltar para a busca
          </Link>
        </div>
      );
    }
    notFound();
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div>
        <p className="text-sm text-slate-500">Cidade</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          {data.cityName}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Inclui país, umidade e vento — tudo que a rota pede além da tela principal.
        </p>
      </div>

      <WeatherCard data={data} variant="full" />

      <Link
        href="/"
        className="inline-flex w-fit text-sm font-medium text-sky-300 underline-offset-4 hover:underline"
      >
        ← Voltar para a página principal
      </Link>
    </div>
  );
}
