import React from "react";

interface SplitWordsProps {
  text: string;
  /** Retraso extra (ms) antes de que empiece la primera palabra */
  delay?: number;
  /** Separación entre palabras (ms) */
  stagger?: number;
}

/**
 * Divide un texto en palabras que suben una a una cuando su contenedor
 * con {...reveal()} entra en pantalla. Funciona en Server Components.
 */
export const SplitWords: React.FC<SplitWordsProps> = ({ text, delay = 0, stagger = 55 }) => {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="split-word">
            <span style={{ "--word-delay": `${delay + i * stagger}ms` } as React.CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </>
  );
};
