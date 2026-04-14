import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <p className="text-sm font-medium text-sky-300">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-50">Página não encontrada</h1>
      <p className="mt-3 text-sm text-slate-400">
        Se você veio de um link de cidade, confira se o nome está certo ou tente buscar de
        novo na página inicial.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex text-sm font-medium text-sky-300 underline-offset-4 hover:underline"
      >
        Voltar para a busca
      </Link>
    </div>
  );
}
