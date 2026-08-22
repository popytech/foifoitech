"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

// Adapté de Magic UI (magicui.design/docs/components/magic-card).
// Simplifié pour ce site (pas de mode sombre / next-themes) : la carte
// suit le curseur avec un halo de bordure en dégradé.
export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#D9D9D955",
  gradientOpacity = 0.8,
  gradientFrom = "#0A4B8C",
  gradientTo = "#00D2C8",
}) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const gradientSizeRef = useRef(gradientSize);
  useEffect(() => {
    gradientSizeRef.current = gradientSize;
  }, [gradientSize]);

  const reset = useCallback(() => {
    const off = -gradientSizeRef.current;
    mouseX.set(off);
    mouseY.set(off);
  }, [mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <motion.div
      className={cn(
        // Halo permanent et discret même sans survol (essentiel sur mobile,
        // où le suivi du curseur ne se déclenche jamais).
        "group relative isolate overflow-hidden rounded-[inherit] border border-transparent shadow-[0_0_0_1px_rgba(10,75,140,0.12)]",
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerEnter={handlePointerMove}
      style={{
        background: useMotionTemplate`
          linear-gradient(white 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            rgba(226, 232, 240, 0.8) 100%
          ) border-box
        `,
      }}
    >
      <div className="absolute inset-px z-20 rounded-[inherit] bg-white" />

      <motion.div
        className="pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientColor},
              transparent 100%
            )
          `,
          opacity: gradientOpacity,
        }}
      />

      <div className="relative z-40">{children}</div>
    </motion.div>
  );
}

export default MagicCard;
