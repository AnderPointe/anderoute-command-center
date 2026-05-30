import { MapPin, Navigation } from "lucide-react";
import type { Load } from "@/types/loads";

interface Props {
  load: Load;
}

export function LoadMapPreview({ load }: Props) {
  const hasPickup = load.pickup_latitude != null && load.pickup_longitude != null;
  const hasDropoff = load.dropoff_latitude != null && load.dropoff_longitude != null;

  if (!hasPickup && !hasDropoff) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-[#1e3a5f] bg-slate-50 dark:bg-[#080f1d]/60 p-6 text-center">
        <Navigation className="size-6 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
        <div className="text-xs text-slate-400 dark:text-slate-500">
          No coordinates available for this load.
        </div>
        <div className="text-[10px] text-slate-300 dark:text-slate-600 mt-0.5">
          Add pickup/drop-off lat/lng to see the route.
        </div>
      </div>
    );
  }

  // Build a Google Maps Static API URL for a route preview
  const apiKey =
    (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) ||
    (import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string | undefined);

  const pickupStr = hasPickup ? `${load.pickup_latitude},${load.pickup_longitude}` : null;
  const dropoffStr = hasDropoff ? `${load.dropoff_latitude},${load.dropoff_longitude}` : null;

  const staticMapUrl = apiKey
    ? (() => {
        const markers = [
          pickupStr ? `color:teal|label:P|${pickupStr}` : null,
          dropoffStr ? `color:orange|label:D|${dropoffStr}` : null,
        ]
          .filter(Boolean)
          .map((m) => `&markers=${encodeURIComponent(m!)}`)
          .join("");
        return `https://maps.googleapis.com/maps/api/staticmap?size=480x220&maptype=roadmap&style=feature:all|element:geometry|color:0x0f1a2e&style=feature:road.highway|color:0x2a4a6e${markers}&key=${apiKey}`;
      })()
    : null;

  return (
    <div className="space-y-3">
      {/* Map image or placeholder */}
      <div className="rounded-xl border border-slate-200 dark:border-[#1e3a5f] overflow-hidden bg-[#0b1526] relative">
        {staticMapUrl ? (
          <img
            src={staticMapUrl}
            alt="Load route map"
            className="w-full h-44 object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="h-44 flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
            <Navigation className="size-8 opacity-30" />
            <span className="text-[10px]">Map preview requires Google Maps API key</span>
          </div>
        )}

        {/* Overlay labels */}
        <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
          {hasPickup && (
            <div className="self-start flex items-center gap-1.5 bg-teal-600/90 text-white rounded-lg px-2 py-1 text-[10px] font-semibold backdrop-blur-sm">
              <MapPin className="size-3" />
              {load.pickup_city}, {load.pickup_state}
            </div>
          )}
          {hasDropoff && (
            <div className="self-end flex items-center gap-1.5 bg-orange-500/90 text-white rounded-lg px-2 py-1 text-[10px] font-semibold backdrop-blur-sm">
              <MapPin className="size-3" />
              {load.dropoff_city}, {load.dropoff_state}
            </div>
          )}
        </div>
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-2 gap-2">
        {hasPickup && (
          <div className="rounded-lg border border-teal-200 dark:border-teal-500/20 bg-teal-50 dark:bg-teal-500/10 px-3 py-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className="size-2 rounded-full bg-teal-500" />
              <span className="text-[9px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                Pickup
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              {load.pickup_city}, {load.pickup_state}
            </div>
            {load.pickup_name && (
              <div className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                {load.pickup_name}
              </div>
            )}
            <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
              {load.pickup_latitude?.toFixed(4)}, {load.pickup_longitude?.toFixed(4)}
            </div>
          </div>
        )}
        {hasDropoff && (
          <div className="rounded-lg border border-orange-200 dark:border-orange-500/20 bg-orange-50 dark:bg-orange-500/10 px-3 py-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className="size-2 rounded-full bg-orange-500" />
              <span className="text-[9px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                Drop-off
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              {load.dropoff_city}, {load.dropoff_state}
            </div>
            {load.dropoff_name && (
              <div className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                {load.dropoff_name}
              </div>
            )}
            <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
              {load.dropoff_latitude?.toFixed(4)}, {load.dropoff_longitude?.toFixed(4)}
            </div>
          </div>
        )}
      </div>

      {load.miles && (
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Navigation className="size-3" />
          <span>{load.miles.toLocaleString()} miles estimated</span>
          {load.rate && load.miles > 0 && (
            <>
              <span className="opacity-40">·</span>
              <span>${(load.rate / load.miles).toFixed(2)}/mi</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
