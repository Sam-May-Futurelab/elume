import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, Star, Heart, Zap } from 'lucide-react';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="scroll-indicator"
      style={{ width: `${scrollProgress * 100}%` }}
    />
  );
}

export function FloatingParticles() {
  return (
    <div className="floating-particles">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  );
}

export function InteractiveButton({ 
  children, 
  className = "", 
  onClick, 
  ...props 
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.button
      className={`relative overflow-hidden magnetic-hover ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(228, 207, 164, 0.3), transparent)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

export function AnimatedCounter({ 
  target, 
  suffix = "", 
  prefix = "",
  duration = 2 
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [target, duration]);

  return (
    <span className="font-bold text-gold">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function BlobBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-gold/20 to-lilac/20 blob-morph opacity-60" />
      <div className="absolute top-1/2 right-20 w-48 h-48 bg-gradient-to-br from-lilac/30 to-gold/20 blob-morph opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-gradient-to-br from-gold/15 to-lilac/25 blob-morph opacity-50" style={{ animationDelay: '4s' }} />
    </div>
  );
}

export function ShimmerCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`shimmer-effect ${className}`}>
      {children}
    </div>
  );
}

// Advanced Particle System with Physics
export function AdvancedParticleSystem() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    life: number;
  }>>([]);

  useEffect(() => {
    const createParticle = (x: number, y: number) => ({
      id: Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 6 + 2,
      color: Math.random() > 0.5 ? '#E4CFA4' : '#DAD7F0',
      life: 1
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.95) { // Only create particles occasionally
        const newParticle = createParticle(e.clientX, e.clientY);
        setParticles(prev => [...prev.slice(-20), newParticle]); // Keep only last 20
      }
    };

    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 0.02,
          size: particle.size * 0.99
        })).filter(particle => particle.life > 0)
      );
    };

    const interval = setInterval(animateParticles, 16);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      ))}
    </div>
  );
}

// Magnetic Hover Effect for Elements
export function MagneticElement({ 
  children, 
  strength = 0.2,
  className = "" 
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// Liquid Morphing Background
export function LiquidMorphBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-10"
          style={{
            width: 300 + i * 100,
            height: 300 + i * 100,
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? '#E4CFA4' : '#DAD7F0'
            } 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 50, -25, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
            borderRadius: ["50%", "45% 55%", "55% 45%", "50%"],
          }}
          transition={{
            duration: 25 + i * 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          initial={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
        />
      ))}
    </div>
  );
}

// 3D Tilt Effect
// Liquid Card Effect (replaces TiltCard)
export function LiquidCard({ 
  children, 
  className = "",
  intensity = 0.003 
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const [transformX, setTransformX] = useState(0);
  const [transformY, setTransformY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Much more subtle movement with clamping
    const deltaX = Math.max(-2, Math.min(2, (e.clientX - centerX) * intensity));
    const deltaY = Math.max(-2, Math.min(2, (e.clientY - centerY) * intensity));
    
    setTransformX(deltaX);
    setTransformY(deltaY);
  };

  const handleMouseLeave = () => {
    setTransformX(0);
    setTransformY(0);
  };  return (
    <motion.div
      className={className}
      animate={{ 
        x: transformX,
        y: transformY,
        scale: transformX !== 0 || transformY !== 0 ? 1.002 : 1,
      }}
      transition={{ type: "spring", stiffness: 800, damping: 50 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        padding: '12px', // Increased padding to prevent content cutoff
        margin: '4px', // Add margin for breathing room
      }}
    >
      <motion.div
        animate={{
          borderRadius: transformX !== 0 || transformY !== 0 
            ? ["20px", "21px 19px", "19px 21px", "20px"]
            : "20px"
        }}
        transition={{ duration: 2, repeat: transformX !== 0 || transformY !== 0 ? Infinity : 0 }}
        className="w-full h-full"
        style={{
          padding: '6px', // Additional inner padding
          overflow: 'visible', // Ensure content isn't clipped
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Floating Action Orbs
export function FloatingActionOrbs() {
  const orbs = [
    { icon: Heart, color: '#E4CFA4', delay: 0 },
    { icon: Star, color: '#DAD7F0', delay: 1 },
    { icon: Sparkles, color: '#E4CFA4', delay: 2 },
    { icon: Zap, color: '#DAD7F0', delay: 3 },
  ];

  return (
    <div className="fixed right-8 bottom-8 z-40">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute w-12 h-12 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
          style={{ 
            backgroundColor: `${orb.color}20`,
            borderColor: `${orb.color}40`,
          }}          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(index) * 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
          initial={{
            bottom: index * 60,
            right: Math.sin(index) * 20,
          }}
          whileHover={{
            scale: 1.2,
            boxShadow: `0 0 20px ${orb.color}60`,
          }}
        >
          <orb.icon 
            className="w-6 h-6" 
            style={{ color: orb.color }} 
          />
        </motion.div>
      ))}
    </div>
  );
}

// Text Reveal Animation
export function TextReveal({ 
  children, 
  className = "",
  delay = 0 
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const words = children.split(' ');

  return (
    <div className={className}>
      {words.map((word, index) => (        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.1,
            type: "spring",
            stiffness: 100,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
