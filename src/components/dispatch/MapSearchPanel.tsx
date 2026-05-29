/**
 * MapSearchPanel — local search across drivers and POIs.
 *
 * The primary search in Anderoute3DDispatchMap uses Google Places Autocomplete
 * attached directly to the input element. This panel is available as a standalone
 * component for embedded use cases where Google Places is not available.
 */

import { useCallback, useRef, useState } from "react";
import { Search, X, MapPin, Truck, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchLocal } from "@/services/mapSearchService";
import type { LiveDriverLocation, MapPoi, MapSearchResult } from "@/types/map";

interface Props {
  drivers: LiveDriverLocation[];
  pois: MapPoi[];
  onSelectResult: (result: MapSearchResult) => void;
}

const TYPE_ICON = {
  driver: Truck,
  poi: MapPin,
  location: Navigation,
};

export function MapSearchPanel({ drivers, pois, onSelectResult }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MapSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const runSearch = useCallback(
    (q: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (!q.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      debounceRef.current = setTimeout(() => {
        const res = searchLocal(q, drivers, pois);
        setResults(res);
        setLoading(false);
      }, 280);
    },
    [drivers, pois],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    runSearch(e.target.value);
  };

  const clear = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  const select = (r: MapSearchResult) => {
    onSelectResult(r);
    setQuery(r.label);
    setResults([]);
    setFocused(false);
  };

  const showDropdown = focused && (results.length > 0 || loading || query.length > 0);

  return (
    <div className="absolute top-3 left-14 z-30 w-64">
      {/* Input */}
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border px-3 py-2 transition-all",
          "bg-[#0f1a2e]/95 border-[#1e3a5f] backdrop-blur-md shadow-lg",
          focused && "border-teal-500/60 shadow-teal-500/10 shadow-xl",
        )}
      >
        <Search
          className={cn(
            "size-3.5 shrink-0 transition-colors",
            focused ? "text-teal-400" : "text-slate-500",
          )}
        />
        <input
          ref={inputRef}
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search drivers, loads, POIs…"
          className="flex-1 bg-transparent text-[11px] text-slate-200 placeholder:text-slate-600 outline-none"
        />
        {query && (
          <button onClick={clear} className="shrink-0 text-slate-600 hover:text-slate-300">
            <X className="size-3" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          className="mt-1 w-full rounded-xl border border-[#1e3a5f] bg-[#0b1526]/97 shadow-2xl backdrop-blur-xl overflow-hidden"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}
        >
          {loading && (
            <div className="flex items-center gap-2 px-3 py-2 text-[10px] text-slate-500">
              <span className="size-1.5 rounded-full bg-teal-400 animate-pulse" />
              Searching…
            </div>
          )}

          {!loading && results.length === 0 && query.length > 0 && (
            <div className="px-3 py-3 text-[10px] text-slate-500">
              No results found for "{query}"
            </div>
          )}

          {results.map((r) => {
            const Icon = TYPE_ICON[r.type] ?? MapPin;
            const isPlaceholder = r.id === "geocode-placeholder";
            return (
              <button
                key={r.id}
                onClick={() => !isPlaceholder && select(r)}
                className={cn(
                  "flex w-full items-start gap-2.5 px-3 py-2 text-left transition-colors",
                  isPlaceholder ? "cursor-default opacity-60" : "hover:bg-white/5",
                )}
              >
                <Icon
                  className={cn(
                    "mt-0.5 size-3 shrink-0",
                    r.type === "driver"
                      ? "text-teal-400"
                      : r.type === "poi"
                        ? "text-orange-400"
                        : "text-slate-500",
                  )}
                />
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-slate-200 truncate">{r.label}</div>
                  {r.meta && <div className="text-[9px] text-slate-500 truncate">{r.meta}</div>}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
