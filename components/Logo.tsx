import React, { useState } from 'react';

// @ts-ignore
import logoSrc from '../LOGOSP.png';

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
  const [imgError, setImgError] = useState(false);

  const style: React.CSSProperties = {};
  if (variant === 'neon') {
     style.filter = "drop-shadow(0 0 5px rgba(79, 255, 176, 0.6))";
  }

  // Se a imagem falhar, renderiza um logotipo em texto estilizado (Fallback)
  if (imgError) {
    const textColor = variant === 'neon' ? 'text-[#4FFFB0]' : 'text-[#050A30]';
    const borderColor = variant === 'neon' ? 'border-[#4FFFB0]' : 'border-[#050A30]';
    
    return (
       <div 
         className={`font-heading font-bold flex items-center justify-center border-2 rounded-full leading-none select-none ${textColor} ${borderColor} ${className} ${animated ? 'animate-logo-pulse' : ''}`}
         style={{ fontSize: '150%' }}
       >
         SP
       </div>
    );
  }

  return (
    <img 
      src={logoSrc} 
      alt="SP Creative Logo" 
      className={`${className} object-contain ${animated ? 'animate-logo-pulse' : ''}`}
      style={style}
      onError={(e) => {
        // Se der erro ao carregar, ativa o modo texto
        console.error("Erro ao carregar logo:", e);
        setImgError(true);
      }}
    />
  );
};

export default Logo;