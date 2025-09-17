import { motion } from "motion/react";

export function SwipeIndicators() {
  return (
    <>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="w-0.5 h-8 bg-white/40 rounded-full"
            animate={{ y: [-3, 3, -3] }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <p className="text-xs font-medium rotate-90 whitespace-nowrap">
            Swipe
          </p>
          <motion.div
            className="w-0.5 h-8 bg-white/40 rounded-full"
            animate={{ y: [3, -3, 3] }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </>
  );
}
