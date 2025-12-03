import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'neon' | 'dark' | 'light';
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  variant = 'dark',
  animated = false 
}) => {
  
  const style: React.CSSProperties = {};

  // Opcional: Adiciona um leve brilho para a variante neon para manter a estética do site,
  // mas preserva a imagem original da logo.
  if (variant === 'neon') {
     style.filter = "drop-shadow(0 0 5px rgba(79, 255, 176, 0.6))";
  }

  return (
    <img 
      src="LOGO%20SP%20CREATIVE.png" 
      alt="SP Creative Logo" 
      className={`${className} object-contain ${animated ? 'animate-logo-pulse' : ''}`}
      style={style}
    />
  );
};

export default Logo;