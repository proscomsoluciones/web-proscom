"use client";

import React, { useEffect, useState } from "react";

interface TypewriterWordsProps {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdTime?: number;
}

/**
 * Escribe y borra palabras en bucle con cursor parpadeante.
 * Renderiza la primera palabra completa en el servidor (SEO / sin JS).
 */
export const TypewriterWords: React.FC<TypewriterWordsProps> = ({
  words,
  className = "",
  typeSpeed = 70,
  deleteSpeed = 38,
  holdTime = 2200,
}) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [phase, setPhase] = useState<"hold" | "deleting" | "typing">("hold");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const current = words[index];
    let timeout: number;

    if (phase === "hold") {
      timeout = window.setTimeout(() => setPhase("deleting"), holdTime);
    } else if (phase === "deleting") {
      if (text.length === 0) {
        timeout = window.setTimeout(() => {
          setIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, 250);
      } else {
        timeout = window.setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
      }
    } else {
      if (text === current) {
        timeout = window.setTimeout(() => setPhase("hold"), 0);
      } else {
        timeout = window.setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed
        );
      }
    }
    return () => window.clearTimeout(timeout);
  }, [text, phase, index, words, typeSpeed, deleteSpeed, holdTime]);

  return (
    <span className={className} aria-hidden="true">
      <span className="text-gradient-cyan">{text}</span>
      <span
        aria-hidden="true"
        className="animate-caret inline-block w-[0.08em] h-[0.95em] -mb-[0.1em] ml-1 bg-[#19C6E6] rounded-sm shadow-[0_0_12px_#19C6E6]"
      />
    </span>
  );
};
