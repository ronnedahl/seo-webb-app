"use client";

import { useState } from "react";

interface KeywordResult {
  keyword: string;
  search_volume: number | null;
  competition: string | null;
  competition_index: number | null;
  cpc: number | null;
  monthly_searches: { year: number; month: number; search_volume: number }[];
}

interface Location {
  code: number;
  name: string;
  language: string;
}

const LOCATIONS: Location[] = [
  { code: 2752, name: "Sverige", language: "sv" },
  { code: 2840, name: "USA", language: "en" },
  { code: 2826, name: "Storbritannien", language: "en" },
  { code: 2276, name: "Tyskland", language: "de" },
  { code: 2208, name: "Danmark", language: "da" },
  { code: 2578, name: "Norge", language: "no" },
  { code: 2246, name: "Finland", language: "fi" },
];

export default function KeywordSearch() {
  const [keyword, setKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location>(LOCATIONS[0]);
  const [result, setResult] = useState<KeywordResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/keyword-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: keyword.trim(),
          location_code: selectedLocation.code,
          language_code: selectedLocation.language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Något gick fel");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ett oväntat fel uppstod");
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number | null) => {
    if (num === null) return "N/A";
    return num.toLocaleString("sv-SE");
  };

  const getCompetitionColor = (level: string | null) => {
    switch (level?.toUpperCase()) {
      case "LOW":
        return "text-green-600 dark:text-green-400";
      case "MEDIUM":
        return "text-yellow-600 dark:text-yellow-400";
      case "HIGH":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-zinc-600 dark:text-zinc-400";
    }
  };

  const translateCompetition = (level: string | null) => {
    switch (level?.toUpperCase()) {
      case "LOW":
        return "Låg";
      case "MEDIUM":
        return "Medel";
      case "HIGH":
        return "Hög";
      default:
        return "N/A";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="keyword" className="block text-sm font-medium mb-2">
            Sökord
          </label>
          <input
            id="keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Skriv in ett sökord..."
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Land
          </label>
          <select
            id="location"
            value={selectedLocation.code}
            onChange={(e) => {
              const loc = LOCATIONS.find((l) => l.code === Number(e.target.value));
              if (loc) setSelectedLocation(loc);
            }}
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc.code} value={loc.code}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !keyword.trim()}
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 text-white font-medium rounded-lg transition-colors"
        >
          {loading ? "Söker..." : "Sök"}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-8 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">
            Resultat för &quot;{result.keyword}&quot;
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                Månadsvis sökvolym
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatNumber(result.search_volume)}
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                Konkurrens
              </p>
              <p className={`text-2xl font-bold ${getCompetitionColor(result.competition)}`}>
                {translateCompetition(result.competition)}
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                Konkurrensindex
              </p>
              <p className="text-2xl font-bold">
                {result.competition_index !== null
                  ? `${result.competition_index}%`
                  : "N/A"}
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-zinc-800 rounded-lg">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                CPC (USD)
              </p>
              <p className="text-2xl font-bold">
                {result.cpc !== null ? `$${result.cpc.toFixed(2)}` : "N/A"}
              </p>
            </div>
          </div>

          {result.monthly_searches && result.monthly_searches.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Sökvolym per månad</h3>
              <div className="overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                  {result.monthly_searches.slice(0, 12).map((month, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-2 bg-white dark:bg-zinc-800 rounded-lg min-w-[60px]"
                    >
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {month.month}/{month.year.toString().slice(-2)}
                      </span>
                      <span className="text-sm font-medium">
                        {formatNumber(month.search_volume)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
