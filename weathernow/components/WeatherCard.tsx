import type { WeatherData } from "@/lib/weather";

type WeatherCardProps = {
  data: WeatherData;
  /** Na home mostramos só o essencial; na página da cidade incluímos vento, umidade e país. */
  variant?: "summary" | "full";
};

function iconSrc(iconCode: string) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function WeatherCard({ data, variant = "summary" }: WeatherCardProps) {
  const showExtra = variant === "full";

  return (
    <article className="overflow-hidden rounded-2xl border border-sky-400/20 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950/95 shadow-[0_20px_60px_-15px_rgba(14,165,233,0.25),0_18px_50px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/5">
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={iconSrc(data.iconCode)}
            alt=""
            width={96}
            height={96}
            className="h-20 w-20 shrink-0 sm:h-24 sm:w-24"
          />
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
              {data.cityName}
              {showExtra ? (
                <span className="ml-2 text-base font-normal text-slate-400">
                  ({data.country})
                </span>
              ) : null}
            </h2>
            <p className="mt-1 capitalize text-slate-300">{data.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 sm:justify-end">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Agora</p>
            <p className="text-4xl font-semibold tabular-nums text-slate-50 sm:text-5xl">
              {Math.round(data.temp)}°C
            </p>
          </div>
          <div className="min-w-[8rem]">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Sensação
            </p>
            <p className="text-2xl font-medium tabular-nums text-slate-100">
              {Math.round(data.feelsLike)}°C
            </p>
          </div>
        </div>
      </div>

      {showExtra ? (
        <div className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2">
          <div className="bg-slate-950/40 p-4 sm:p-5">
            <p className="text-xs uppercase tracking-wide text-slate-500">Umidade</p>
            <p className="mt-1 text-lg font-medium tabular-nums text-slate-100">
              {data.humidity}%
            </p>
          </div>
          <div className="bg-slate-950/40 p-4 sm:p-5">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Vento
            </p>
            <p className="mt-1 text-lg font-medium tabular-nums text-slate-100">
              {data.windSpeed.toFixed(1)} m/s
            </p>
          </div>
        </div>
      ) : null}
    </article>
  );
}
