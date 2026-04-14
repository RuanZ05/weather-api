import Link from "next/link";

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-50">Sobre</h1>
      <p className="mt-2 text-sm text-slate-400">WeatherNow — trabalho de Programação e Design para Web II</p>

      <dl className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-slate-950/40 p-6 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-500">Aluno</dt>
          <dd className="mt-1 text-slate-100">Ruan</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-500">Matrícula</dt>
          <dd className="mt-1 text-slate-100">2023018472</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-slate-500">Curso</dt>
          <dd className="mt-1 text-slate-100">Tecnologia em Sistemas de Computação</dd>
        </div>
      </dl>

      <p className="mt-8 text-base leading-relaxed text-slate-300">
        O WeatherNow foi feito para consultar clima em tempo real por cidade usando a API da
        OpenWeatherMap. A ideia é manter a interface direta: buscar, ver o essencial na hora
        e, se precisar, abrir uma página com mais números (umidade e vento).
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex text-sm font-medium text-sky-300 underline-offset-4 hover:underline"
      >
        ← Voltar para a página principal
      </Link>
    </div>
  );
}
