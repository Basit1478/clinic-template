"use client";

import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export default function EntranceExperience() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"closed" | "opening" | "complete">("closed");
  const progressRef = useRef(0);
  const openingRef = useRef(false);
  const completionTimer = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const beginOpening = useCallback(() => {
    if (openingRef.current) return;
    openingRef.current = true;
    progressRef.current = 1;
    setProgress(1);
    setPhase("opening");
    completionTimer.current = window.setTimeout(
      () => setPhase("complete"),
      reduceMotion ? 180 : 880,
    );
  }, [reduceMotion]);

  useEffect(() => () => {
    if (completionTimer.current !== null) window.clearTimeout(completionTimer.current);
  }, []);

  useEffect(() => {
    if (phase === "complete") return;

    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    window.scrollTo({ top: 0, behavior: "instant" });

    const advance = (amount: number) => {
      if (openingRef.current) return;
      const next = clamp(progressRef.current + (reduceMotion ? 1 : amount));
      progressRef.current = next;
      setProgress(next);
      if (next >= 0.98) beginOpening();
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      advance(event.deltaY / 720);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      const nextY = event.touches[0]?.clientY;
      if (touchY.current === null || nextY === undefined) return;
      advance((touchY.current - nextY) / 520);
      touchY.current = nextY;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowDown", "PageDown", " ", "Enter"].includes(event.key)) return;
      event.preventDefault();
      advance(0.24);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, [beginOpening, phase, reduceMotion]);

  if (phase === "complete") return null;

  const openness = phase === "opening" ? 1 : progress;
  const leftTransform = reduceMotion
    ? "translateX(0)"
    : `perspective(1500px) translateX(${-openness * 16}vw) rotateY(${openness * 84}deg)`;
  const rightTransform = reduceMotion
    ? "translateX(0)"
    : `perspective(1500px) translateX(${openness * 16}vw) rotateY(${-openness * 84}deg)`;
  const transition = phase === "opening"
    ? { duration: reduceMotion ? 0.12 : 0.72, ease: [0.76, 0, 0.24, 1] as const }
    : { duration: 0.12, ease: [0.23, 1, 0.32, 1] as const };

  return (
    <motion.div
      className="entrance-gate"
      role="dialog"
      aria-modal="true"
      aria-label="Morrow Dental entrance"
      animate={{ opacity: phase === "opening" ? 0 : 1 }}
      transition={{ duration: reduceMotion ? 0.14 : 0.32, delay: phase === "opening" && !reduceMotion ? 0.5 : 0 }}
    >
      <div className="entrance-reveal" aria-hidden="true" />

      <motion.div className="entrance-door entrance-door-left" animate={{ transform: leftTransform }} transition={transition} aria-hidden="true">
        <span className="door-inlay door-inlay-top" />
        <span className="door-inlay door-inlay-bottom" />
        <span className="door-seam-detail" />
      </motion.div>

      <motion.div className="entrance-door entrance-door-right" animate={{ transform: rightTransform }} transition={transition} aria-hidden="true">
        <span className="door-inlay door-inlay-top" />
        <span className="door-inlay door-inlay-bottom" />
        <span className="door-seam-detail" />
      </motion.div>

      <motion.div className="entrance-copy" animate={{ opacity: 1 - openness * 1.8, transform: `translate(-50%, calc(-50% - ${openness * 20}px))` }} transition={{ duration: 0.12 }}>
        <div className="entrance-monogram" aria-hidden="true"><span /><span /></div>
        <p className="entrance-kicker">A calmer dental experience</p>
        <h1>Morrow <em>Dental</em></h1>
        <button type="button" className="entrance-prompt" onClick={beginOpening}>
          <span>Scroll to enter</span>
          <span className="entrance-scroll-icon"><ArrowDown size={16} /></span>
        </button>
      </motion.div>

      <div className="entrance-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(0.04, openness)})` }} />
      </div>
      <span className="sr-only" aria-live="polite">Entrance {Math.round(openness * 100)} percent open</span>
    </motion.div>
  );
}
