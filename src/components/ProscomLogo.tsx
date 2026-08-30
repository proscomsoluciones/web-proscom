import React from 'react';

interface ProscomLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  showSpABadge?: boolean;
  showTagline?: boolean;
}

export const ProscomLogo: React.FC<ProscomLogoProps> = ({
  className = "",
  variant = 'dark',
}) => {
  const logoSrc =
    variant === 'light'
      ? '/images/proscom-logo-light.png'
      : '/images/proscom-logo-transparent.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Proscom — Soluciones Tecnológicas a Medida"
        className="h-10 md:h-12 w-auto object-contain shrink-0"
      />
    </div>
  );
};

export default ProscomLogo;
