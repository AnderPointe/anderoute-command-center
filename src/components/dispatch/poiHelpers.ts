/**
 * poiHelpers — POI category metadata, marker colors, and SVG icon generators.
 */

import type { PoiCategory } from "@/types/map";

export interface PoiCategoryMeta {
  label: string;
  emoji: string;
  color: string;
  textColor: string;
}

export const POI_CATEGORY_META: Record<PoiCategory, PoiCategoryMeta> = {
  depot: { label: "Depot", emoji: "◆", color: "#14b8a6", textColor: "#fff" },
  warehouse: { label: "Warehouse", emoji: "🏗", color: "#64748b", textColor: "#fff" },
  customer: { label: "Customer", emoji: "👤", color: "#14b8a6", textColor: "#fff" },
  truck_stop: { label: "Truck Stop", emoji: "🚛", color: "#f97316", textColor: "#fff" },
  fuel: { label: "Fuel", emoji: "⛽", color: "#f59e0b", textColor: "#fff" },
  maintenance: { label: "Maint.", emoji: "🔧", color: "#ef4444", textColor: "#fff" },
  airport: { label: "Airport", emoji: "✈️", color: "#3b82f6", textColor: "#fff" },
  port: { label: "Port", emoji: "⚓", color: "#2563eb", textColor: "#fff" },
  rail_yard: { label: "Rail Yard", emoji: "🚂", color: "#6b7280", textColor: "#fff" },
  store: { label: "Store", emoji: "🏪", color: "#22c55e", textColor: "#fff" },
  landmark: { label: "Landmark", emoji: "⭐", color: "#a855f7", textColor: "#fff" },
  lake: { label: "Lake", emoji: "🌊", color: "#3b82f6", textColor: "#fff" },
  river: { label: "River", emoji: "🌊", color: "#60a5fa", textColor: "#fff" },
  custom: { label: "Custom", emoji: "📍", color: "#0f172a", textColor: "#fff" },
};

/**
 * Creates an SVG data URL for a POI marker.
 */
export function poiMarkerSvg(category: PoiCategory, selected = false): string {
  const meta = POI_CATEGORY_META[category] ?? POI_CATEGORY_META.custom;
  const size = selected ? 36 : 28;
  const r = size / 2;
  const inner = r * 0.6;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 8}" viewBox="0 0 ${size} ${size + 8}">
    <defs>
      <filter id="shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.4"/>
      </filter>
    </defs>
    <circle cx="${r}" cy="${r}" r="${r - 1}" fill="${meta.color}" filter="url(#shadow)" opacity="0.9"/>
    <circle cx="${r}" cy="${r}" r="${inner}" fill="white" opacity="0.95"/>
    <line x1="${r}" y1="${size - 1}" x2="${r}" y2="${size + 7}" stroke="${meta.color}" stroke-width="2" opacity="0.7"/>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/**
 * Creates an SVG data URL for a driver marker.
 */
export function driverMarkerSvg(
  color: string,
  selected: boolean,
  heading?: number | null,
  stale = false,
): string {
  const size = selected ? 36 : 26;
  const r = size / 2;
  const opacity = stale ? 0.4 : 1;
  const rotation = heading != null ? heading : 0;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="${selected ? 3 : 1.5}" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    ${selected ? `<circle cx="${r}" cy="${r}" r="${r - 1}" fill="${color}" opacity="0.2"/>` : ""}
    <g transform="rotate(${rotation}, ${r}, ${r})">
      <circle cx="${r}" cy="${r}" r="${r * 0.7}" fill="${color}" opacity="${opacity}" filter="${selected ? "url(#glow)" : "none"}" stroke="white" stroke-width="${selected ? 2.5 : 1.5}"/>
      <polygon points="${r},${r * 0.15} ${r + r * 0.3},${r * 0.6} ${r - r * 0.3},${r * 0.6}" fill="white" opacity="${stale ? 0.3 : 0.9}"/>
    </g>
  </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
