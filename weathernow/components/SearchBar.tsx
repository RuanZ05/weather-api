"use client";

import { FormEvent, useState } from "react";

type SearchBarProps = {
  onSearch: (city: string) => void | Promise<void>;
  isLoading?: boolean;
  placeholder?: string;
  defaultValue?: string;
};

export function SearchBar({
  onSearch,
  isLoading = false,
  placeholder = "Ex.: Rio de Janeiro, Niterói, Lisboa…",
  defaultValue = "",
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const city = value.trim();
    if (!city || isLoading) return;
    await onSearch(city);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
    >
      <label className="sr-only" htmlFor="city-search">
        Nome da cidade
      </label>
      <input
        id="city-search"
        type="search"
        name="city"
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
        className="min-h-11 w-full flex-1 rounded-lg border border-white/15 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 outline-none ring-sky-400/40 placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-sky-500 px-5 text-sm font-medium text-slate-950 transition hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:pointer-events-none disabled:opacity-50"
      >
        {isLoading ? "Buscando…" : "Buscar"}
      </button>
    </form>
  );
}
