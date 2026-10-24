/**
 * template.tsx se vuelve a montar en cada navegación:
 * se usa para una transición suave de entrada entre páginas.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
