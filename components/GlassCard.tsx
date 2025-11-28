import React, { useRef, useState, MouseEvent } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  disableTilt?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  disableTilt = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disableTilt || !cardRef.current) return;

    const div = cardRef.current;
    const rect = div.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateY = ((mouseX - width / 2) / width) * 10; 
    const rotateX = ((mouseY - height / 2) / height) * -10;

    setRotation({ x: rotateX, y: rotateY });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl transition-all duration-300 ease-out ${className}`}
      style={{
        transform: !disableTilt ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 
        Bubble / Glossy Glass Effect
        - High blur
        - White reflection on top/left (linear-gradient)
        - Very rounded corners (rounded-3xl)
      */}
      <div 
        className="absolute inset-0 rounded-3xl z-0"
        style={{
           background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.2) 100%)',
           backdropFilter: 'blur(20px)',
           WebkitBackdropFilter: 'blur(20px)',
           border: '1px solid rgba(255, 255, 255, 0.8)',
           borderTop: '2px solid rgba(255, 255, 255, 0.9)', // Stronger reflection on top
           borderLeft: '2px solid rgba(255, 255, 255, 0.9)',
           boxShadow: '0 8px 32px 0 rgba(5, 10, 48, 0.08)' 
        }}
      />
      
      {/* Neon Glow Hover Effect - Softer now */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none z-10 transition-opacity duration-500"
        style={{
          opacity: opacity,
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(79, 255, 176, 0.2), transparent 40%)`
        }} 
      />

      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;