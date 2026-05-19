import { motion } from "framer-motion";

interface Props {
  /** 0..1 along the hero route path */
  progress: number;
}

/**
 * Driver puck. Animates along the same hero polyline used in MockMap by
 * sampling pre-computed bezier waypoints. Heading follows direction of travel.
 */
const waypoints: Array<{ x: number; y: number; h: number }> = [
  { x: 140, y: 600, h: -34 },
  { x: 340, y: 470, h: -38 },
  { x: 540, y: 410, h: -22 },
  { x: 720, y: 320, h: -34 },
  { x: 920, y: 230, h: -28 },
  { x: 1080, y: 160, h: -22 },
];

function sample(t: number) {
  const clamped = Math.min(0.999, Math.max(0, t));
  const idx = clamped * (waypoints.length - 1);
  const i = Math.floor(idx);
  const f = idx - i;
  const a = waypoints[i];
  const b = waypoints[i + 1] ?? a;
  return {
    x: a.x + (b.x - a.x) * f,
    y: a.y + (b.y - a.y) * f,
    h: a.h + (b.h - a.h) * f,
  };
}

export function MapVehicleMarker({ progress }: Props) {
  const p = sample(progress);
  return (
    <motion.g
      animate={{ x: p.x, y: p.y }}
      transition={{ type: "tween", duration: 1.6, ease: "linear" }}
      style={{ pointerEvents: "none" }}
    >
      {[26, 18, 12].map((r, i) => (
        <motion.circle
          key={r}
          r={r}
          fill="none"
          stroke="#2dd4bf"
          strokeOpacity={0.4 - i * 0.1}
          strokeWidth={1.5}
          animate={{ r: [r, r + 6, r], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <g transform={`rotate(${p.h})`}>
        <circle r="11" fill="#0a0e12" stroke="#2dd4bf" strokeWidth="2" />
        <path d="M 0 -6 L 5 5 L 0 2 L -5 5 Z" fill="#2dd4bf" />
      </g>
    </motion.g>
  );
}
