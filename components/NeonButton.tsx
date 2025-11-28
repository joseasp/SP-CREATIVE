import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'medium' | 'large';
  icon?: React.ReactNode;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  className = '', 
  icon,
  ...props 
}) => {
  // Styles inspired by PDF Snippet 4.1 "Neon Glow"
  // Using specific hex codes: Electric Mint (#4FFFB0) and Deep Midnight (#050A30)
  
  const baseStyles = "relative font-bold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 overflow-hidden group font-heading";
  
  const variants = {
    // Primary: Deep Midnight background with Neon Mint text/border/glow
    // This provides high contrast on the light blue background requested
    primary: `
      bg-[#050A30] text-[#4FFFB0] 
      border border-[#4FFFB0]
      shadow-[0_0_15px_rgba(79,255,176,0.4)] 
      hover:shadow-[0_0_25px_rgba(79,255,176,0.7)]
      hover:-translate-y-1
      rounded-xl
    `,
    
    // Secondary: Solid Mint background with Dark text (Inverted)
    secondary: `
      bg-[#4FFFB0] text-[#050A30] 
      shadow-[0_4px_15px_rgba(5,10,48,0.1)] 
      hover:bg-[#3cefa0]
      hover:shadow-[0_8px_25px_rgba(79,255,176,0.5)]
      hover:-translate-y-1
      rounded-xl
    `,

    // Outline: Minimalist for light background
    outline: `
      bg-transparent border-2 border-[#050A30] text-[#050A30]
      hover:bg-[#050A30] hover:text-[#4FFFB0] hover:border-[#050A30]
      rounded-xl
    `,

    ghost: `
      bg-transparent text-[#050A30] hover:bg-[#050A30]/5
      rounded-lg
    `
  };

  const sizes = {
    medium: "px-6 py-3 text-sm tracking-wide uppercase",
    large: "px-8 py-4 text-base tracking-widest uppercase"
  };

  return (
    <button 
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="transition-transform group-hover:translate-x-1 duration-300">{icon}</span>}
      </span>
      
      {/* Glossy sheen effect */}
      {variant === 'primary' && (
         <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out z-0" />
      )}
    </button>
  );
};

export default NeonButton;