import { motion } from "framer-motion";

interface Props {
  width?: number;
  height?: number;
  /** 0..1 progress along route */
  progress: number;
}

/**
 * Stylized mock map. Renders deep-charcoal canvas with grid, mock arterials,
 * water, parks, and a hero route polyline. Real Mapbox/Google integration
 * will replace this component while preserving its public API.
 */
export function MockMap({ width = 1200, height = 720, progress }: Props) {
  const clamped = Math.min(1, Math.max(0, progress));
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="map-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#0b1015" />
          <stop offset="55%" stopColor="#0d141a" />
          <stop offset="100%" stopColor="#0a1117" />
        </linearGradient>
        <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(148,163,184,0.05)" strokeWidth="1" />
        </pattern>
        <pattern id="map-grid-fine" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(148,163,184,0.025)" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
        </radialGradient>
        <linearGradient id="route-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>

      <rect width={width} height={height} fill="url(#map-bg)" />
      <rect width={width} height={height} fill="url(#map-grid-fine)" />
      <rect width={width} height={height} fill="url(#map-grid)" />

      {/* water */}
      <path d="M 0 540 Q 220 480 420 520 T 820 500 T 1200 540 L 1200 720 L 0 720 Z" fill="#0a2230" opacity="0.55" />
      {/* parks */}
      <ellipse cx="280" cy="180" rx="120" ry="60" fill="#102a1d" opacity="0.6" />
      <ellipse cx="940" cy="260" rx="160" ry="70" fill="#102a1d" opacity="0.5" />

      {/* arterials */}
      {[
        "M -40 220 Q 300 200 600 240 T 1240 220",
        "M -40 400 Q 320 380 640 420 T 1240 400",
        "M 200 -40 Q 220 220 260 440 T 300 760",
        "M 760 -40 Q 800 220 840 460 T 880 760",
      ].map((d, i) => (
        <g key={i}>
          <path d={d} stroke="rgba(148,163,184,0.18)" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d={d} stroke="rgba(226,232,240,0.22)" strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
      ))}

      {/* hero route casing */}
      <path
        d="M 140 600 C 280 540 320 460 420 440 S 620 380 720 320 S 940 220 1080 160"
        stroke="rgba(45,212,191,0.18)"
        strokeWidth="22"
        fill="none"
        strokeLinecap="round"
      />
      {/* traveled */}
      <motion.path
        d="M 140 600 C 280 540 320 460 420 440 S 620 380 720 320 S 940 220 1080 160"
        stroke="url(#route-grad)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="1 1"
        pathLength={1}
        initial={{ strokeDashoffset: 1 }}
        animate={{ strokeDashoffset: 1 - clamped }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ filter: "drop-shadow(0 0 14px rgba(45,212,191,0.45))" }}
      />
      {/* remaining (dashed) */}
      <path
        d="M 140 600 C 280 540 320 460 420 440 S 620 380 720 320 S 940 220 1080 160"
        stroke="rgba(251,146,60,0.55)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="6 10"
        pathLength={1}
        strokeDashoffset={0}
        style={{ opacity: 1 - clamped }}
      />

      {/* pickup marker */}
      <g transform="translate(140 600)">
        <circle r="14" fill="#0f172a" stroke="#2dd4bf" strokeWidth="3" />
        <circle r="5" fill="#2dd4bf" />
      </g>
      {/* dropoff marker */}
      <g transform="translate(1080 160)">
        <circle r="14" fill="#0f172a" stroke="#fb923c" strokeWidth="3" />
        <circle r="5" fill="#fb923c" />
      </g>

      <rect width={width} height={height} fill="url(#vignette)" pointerEvents="none" />
    </svg>
  );
}
