"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  tone?: "light" | "dark";
};

export function VoiceWave({ className = "", tone = "dark" }: Props) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const reduce = mounted && !!reduceMotion;
  const strokeA = tone === "dark" ? "#16A34A" : "#BBF7D0";
  const strokeB = tone === "dark" ? "#14532D" : "#FFFFFF";
  const strokeC = tone === "dark" ? "#86EFAC" : "rgba(255,255,255,0.55)";

  const paths = [
    "M0 60 C 40 20, 80 100, 120 60 S 200 20, 240 60 S 320 100, 360 60 S 440 20, 480 60",
    "M0 60 C 40 90, 80 30, 120 60 S 200 90, 240 60 S 320 30, 360 60 S 440 90, 480 60",
  ];

  const strokes = [strokeB, strokeA, strokeC];

  return (
    <div className={className} aria-hidden style={{ width: "100%", height: "100%" }}>
      <svg
        viewBox="0 0 480 120"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            fill="none"
            stroke={strokes[i]}
            strokeWidth={i === 0 ? 3.4 : i === 1 ? 2.5 : 1.7}
            strokeLinecap="round"
            opacity={0.95 - i * 0.18}
            d={paths[0]}
            initial={false}
            animate={{ d: [paths[0], paths[1], paths[0]] }}
            transition={{
              duration: reduce ? 5.5 : 3.1 + i * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.16,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
