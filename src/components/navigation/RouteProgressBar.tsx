import { motion } from "framer-motion";

interface Props {
  progress: number; // 0..100
  totalMiles: number;
  remainingMiles: number;
}

export function RouteProgressBar({ progress, totalMiles, remainingMiles }: Props) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-500">
        <span>Route Progress</span>
        <span className="text-slate-300">{Math.round(progress)}%</span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400"
          style={{ boxShadow: "0 0 18px -4px rgba(45,212,191,0.7)" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
        <span>{(totalMiles - remainingMiles).toFixed(0)} mi traveled</span>
        <span>{remainingMiles.toFixed(0)} mi remaining</span>
      </div>
    </div>
  );
}
