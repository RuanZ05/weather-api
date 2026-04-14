export type WeatherData = {
  cityName: string;
  country: string;
  temp: number;
  feelsLike: number;
  description: string;
  iconCode: string;
  humidity: number;
  windSpeed: number;
};

type OpenWeatherResponse = {
  message?: string;
  name?: string;
  sys?: { country?: string };
  main?: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather?: { description: string; icon: string }[];
  wind?: { speed: number };
};

export function buildWeatherUrl(city: string, apiKey: string) {
  const q = encodeURIComponent(city.trim());
  return `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apiKey}&units=metric&lang=pt_br`;
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const key = process.env.NEXT_PUBLIC_WEATHER_KEY;
  if (!key) {
    throw new Error(
      "Defina NEXT_PUBLIC_WEATHER_KEY no arquivo .env.local (na raiz do projeto)."
    );
  }

  const url = buildWeatherUrl(city, key);
  const res = await fetch(url, { cache: "no-store" });
  const data = (await res.json()) as OpenWeatherResponse;

  if (!res.ok) {
    const msg =
      typeof data.message === "string" ? data.message : "Erro ao consultar a API.";
    throw new Error(msg);
  }

  const w = data.weather?.[0];
  if (!data.name || !data.main || !w) {
    throw new Error("Resposta inesperada da API.");
  }

  return {
    cityName: data.name,
    country: data.sys?.country ?? "—",
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    description: w.description,
    iconCode: w.icon,
    humidity: data.main.humidity,
    windSpeed: data.wind?.speed ?? 0,
  };
}
