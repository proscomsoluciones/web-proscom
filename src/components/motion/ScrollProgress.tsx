"use client";

import React, { useEffect, useRef } from "react";

/** Barra fina en la parte superior que muestra cuánto se ha recorrido la página. */
export const ScrollProgress: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed top-0 inset-x-0 h-[3px] z-[60] pointer-events-none">
      <div
        ref={ref}
        className="h-full origin-left bg-gradient-to-r from-[#1479D4] via-[#19C6E6] to-[#7FE7FF] shadow-[0_0_12px_#19C6E6]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};
