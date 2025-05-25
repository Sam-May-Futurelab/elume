'use client';

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowRight, Star, Sparkles, ShoppingBag, Play, Users, Award, Zap, Heart, Droplets, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  ScrollProgress, 
  FloatingParticles, 
  InteractiveButton, 
  AnimatedCounter, 
  BlobBackground,
  ShimmerCard,
  AdvancedParticleSystem,
  MagneticElement,
  LiquidMorphBackground,
  LiquidCard,
  FloatingActionOrbs,
  TextReveal
} from '@/components/effects';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [magnetElements, setMagnetElements] = useState<{ id: string; x: number; y: number; strength: number }[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Enhanced cursor tracking with magnetic effects
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [cursorX, cursorY]);

  // Section scrolling detector
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrollY / windowHeight);
      setCurrentSection(section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-pearl text-charcoal relative overflow-hidden">
      <ScrollProgress />
      <BlobBackground />
      <LiquidMorphBackground />
      <AdvancedParticleSystem />
      <FloatingActionOrbs />
      
      {/* Enhanced multi-layer cursor system */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-full h-full bg-gold/40 rounded-full"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.2 }}
        />        <motion.div
          className="absolute inset-0 w-full h-full bg-lilac/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            borderRadius: ["50%", "40% 60%", "60% 40%", "50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating navigation dots */}
      <motion.div 
        className="fixed right-8 top-1/2 -translate-y-1/2 z-40 space-y-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {['Hero', 'Products', 'Stats', 'Testimonials'].map((section, index) => (
          <motion.div
            key={section}
            className={cn(
              "w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-300",
              currentSection === index 
                ? "bg-gold border-gold scale-125" 
                : "bg-transparent border-mist hover:border-gold"
            )}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              const element = document.getElementById(section.toLowerCase());
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </motion.div>

      {/* Ambient light orbs */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? '#E4CFA4' : '#DAD7F0'
              } 0%, transparent 70%)`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            initial={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      {/* Navigation */}
      <Nav />
        {/* Hero Section */}
      <HeroSection opacity={opacity} scale={scale} />
      
      {/* Before & After */}
      <BeforeAfter />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Product Showcase */}
      <ProductShowcase />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glassmorphism-advanced border-b border-mist/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <MagneticElement>
          <motion.div
            className="text-2xl font-playfair font-semibold tracking-wide iridescent-text"
            whileHover={{ scale: 1.05 }}
          >
            Elume
          </motion.div>
        </MagneticElement>
        
        <div className="hidden md:flex items-center space-x-8">
          {['Products', 'Science', 'Reviews', 'About'].map((item) => (
            <MagneticElement key={item}>
              <motion.a
                href="#"
                className="text-sm font-medium hover:text-gold transition-colors quantum-flicker"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            </MagneticElement>
          ))}
        </div>
        
        <MagneticElement>
          <motion.button
            className="plasma-button magnetic-field px-6 py-2 rounded-full text-sm font-medium text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
        </MagneticElement>
      </div>
    </motion.nav>
  );
}

function HeroSection({ opacity, scale }: { opacity: any; scale: any }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <FloatingParticles />
      
      {/* Enhanced Background Elements with Liquid Morphing */}
      <div className="absolute inset-0 bg-gradient-to-br from-pearl via-lilac/10 to-gold/10" />
      
      {/* Liquid Morphing Orbs - Repositioned for split layout */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 liquid-morph opacity-20"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-48 h-48 holographic opacity-15"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Split Hero Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content */}
        <motion.div
          style={{ opacity, scale }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center justify-center lg:justify-start mb-6"
          >
            <motion.div
              className="quantum-flicker"
              animate={{ 
                y: [0, -8, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-6 h-6 text-gold mr-2" />
            </motion.div>
            <span className="text-sm font-medium tracking-wide uppercase text-charcoal/70">
              Radiance, Refined
            </span>
          </motion.div>
          
          <MagneticElement strength={0.1}>
            <TextReveal 
              className="text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-playfair font-bold mb-6 leading-tight iridescent-text"
              delay={0.4}
            >
              The Future of Glow
            </TextReveal>
          </MagneticElement>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-charcoal/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Skincare for the luminous you — powered by science, perfected by nature.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
          >
            <MagneticElement>
              <InteractiveButton className="plasma-button magnetic-field px-8 py-4 rounded-full font-medium text-lg text-white hover-lift-3d flex items-center group">
                Discover Eluma
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </InteractiveButton>
            </MagneticElement>
            
            <MagneticElement>
              <InteractiveButton className="glassmorphism-advanced cosmic-dust flex items-center text-charcoal/70 hover:text-charcoal transition-colors group px-6 py-4 rounded-full">
                <div className="w-12 h-12 holographic rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                Watch Our Story
              </InteractiveButton>
            </MagneticElement>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            className="flex justify-center lg:justify-start items-center gap-6 opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2 }}
          >
            {[
              { icon: Heart, label: "Cruelty Free" },
              { icon: Droplets, label: "Clean Beauty" },
              { icon: Sun, label: "Natural Glow" },
            ].map((item, index) => (
              <MagneticElement key={item.label}>
                <motion.div
                  className="flex items-center gap-2 text-sm neural-connections"
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="w-5 h-5 text-gold" />
                  <span>{item.label}</span>
                </motion.div>
              </MagneticElement>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative"
        >
          <LiquidCard intensity={15} className="rounded-3xl overflow-hidden">
            <motion.div
              className="relative group perspective-3d"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src="/images/elume-hero.png"
                alt="Elume skincare hero - radiant, glowing skin"
                className="w-full h-auto rounded-3xl shadow-2xl hover-lift-3d"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Image Overlay Effects */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-gold/10 via-transparent to-lilac/5 group-hover:from-gold/20 transition-all duration-300" />
              
              {/* Floating Elements around Image */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gold rounded-full magnetic-field opacity-80"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-lilac rounded-full quantum-flicker opacity-60"
                animate={{ 
                  scale: [1, 1.2, 1],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
          </LiquidCard>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const stats = [
    { icon: Users, value: 50000, suffix: "+", label: "Happy Customers", delay: 0 },
    { icon: Award, value: 98, suffix: "%", label: "Satisfaction Rate", delay: 0.2 },
    { icon: Zap, value: 30, suffix: " Days", label: "Visible Results", delay: 0.4 },
    { icon: Star, value: 5.0, suffix: "/5", label: "Average Rating", delay: 0.6 }
  ];

  return (
    <section id="stats" ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-lilac/5" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <TextReveal className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Trusted by Thousands
          </TextReveal>
          <p className="text-xl text-charcoal/70">Real results that speak for themselves</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: stat.delay,
                type: "spring",
                stiffness: 100
              }}
              className="text-center group"            >              <LiquidCard intensity={8}>
                <ShimmerCard className="glassmorphism-advanced rounded-2xl p-8 hover-lift-3d neural-connections shadow-2xl shadow-gold/30 hover:shadow-3xl hover:shadow-gold/50 transition-all duration-300">
                  <MagneticElement><motion.div
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="w-16 h-16 bg-gradient-to-br from-gold to-lilac rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow magnetic-field"
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </MagneticElement>
                  
                  <div className="text-3xl md:text-4xl font-bold mb-2 iridescent-text">
                    {isInView && <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2} />}
                  </div>
                  
                  <p className="text-charcoal/70 font-medium">{stat.label}</p>
                </ShimmerCard>
              </LiquidCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const products = [
    {
      name: "Dew Serum",
      description: "Daily hydration with hyaluronic acid + niacinamide",
      price: "$68",
      image: "🌿"
    },
    {
      name: "Night Veil",
      description: "Overnight peptide-rich repair cream",
      price: "$89",
      image: "🌙"
    },
    {
      name: "Halo Drops",
      description: "Vitamin C glow booster",
      price: "$54",
      image: "✨"
    },
    {
      name: "Clean Slate",
      description: "Gentle foaming cleanser",
      price: "$42",
      image: "💧"
    }
  ];

  return (
    <section id="products" ref={ref} className="py-24 bg-gradient-to-b from-pearl to-mist/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <TextReveal className="text-5xl md:text-6xl font-playfair font-bold mb-6">
            Science Meets Softness
          </TextReveal>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Each formula is crafted with precision, blending cutting-edge ingredients with gentle care.
          </p>
        </motion.div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="group relative"
            >
              {/* Premium Card Container */}
              <motion.div 
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/30 shadow-2xl"
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(228, 207, 164, 0.3)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25 
                }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(228, 207, 164, 0.1) 0%, rgba(218, 215, 240, 0.1) 100%)'
                  }}
                />
                
                {/* Floating Light Effect */}
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-gold/60 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
                
                <div className="relative z-10 p-8">
                  {/* Product Icon with Enhanced Animation */}
                  <motion.div 
                    className="text-7xl mb-8 text-center relative"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ 
                      duration: 1,
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -10,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.4 }
                    }}
                  >
                    <span className="drop-shadow-lg">{product.image}</span>
                    {/* Subtle glow effect */}
                    <motion.div
                      className="absolute inset-0 blur-xl opacity-30"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {product.image}
                    </motion.div>
                  </motion.div>
                  
                  {/* Product Name with Stagger Animation */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.15 + 0.5 }}
                    className="mb-6"
                  >
                    <h3 className="text-2xl font-playfair font-bold text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-gold to-lilac rounded-full group-hover:w-24 transition-all duration-300" />
                  </motion.div>
                  
                  {/* Description with Fade-in */}
                  <motion.p 
                    className="text-charcoal/70 mb-8 leading-relaxed text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.15 + 0.6 }}
                  >
                    {product.description}
                  </motion.p>
                  
                  {/* Price and Button with Split Animation */}
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.15 + 0.7 }}
                  >
                    <motion.span 
                      className="text-3xl font-bold bg-gradient-to-r from-gold to-lilac bg-clip-text text-transparent"
                      whileHover={{ scale: 1.05 }}
                    >
                      {product.price}
                    </motion.span>
                    
                    <motion.button
                      className="relative overflow-hidden bg-gradient-to-r from-gold to-lilac p-4 rounded-2xl text-white shadow-lg group/btn"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(228, 207, 164, 0.4)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {/* Button shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"
                        style={{ skewX: '-20deg' }}
                      />
                      <ShoppingBag className="w-6 h-6 relative z-10 group-hover/btn:scale-110 transition-transform" />
                    </motion.button>
                  </motion.div>
                </div>
                
                {/* Premium Border Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-gold/20 via-transparent to-lilac/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor'
                  }}
                />
              </motion.div>
              
              {/* Floating Particles on Hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gold/60 rounded-full"
                    initial={{ 
                      x: Math.random() * 100,
                      y: Math.random() * 100,
                      scale: 0
                    }}
                    animate={{
                      y: [0, -50, -100],
                      x: [0, Math.random() * 40 - 20],
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${60 + Math.random() * 30}%`
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-mist/50 to-lilac/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <TextReveal className="text-5xl md:text-6xl font-playfair font-bold mb-6">
            Glow Like You Mean It
          </TextReveal>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Real results from real people. See the transformation.
          </p>
        </motion.div>        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"        >
          <div className="glassmorphism rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:shadow-xl hover:shadow-gold/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >                <div className="space-y-6">                  <div className="glassmorphism rounded-2xl p-6">
                    <h3 className="text-2xl font-playfair font-semibold mb-3 text-charcoal">Before</h3>
                    <div className="w-full h-48 bg-white/20 rounded-xl overflow-hidden">
                      <img 
                        src="/images/before-skin.png" 
                        alt="Before using Eluma skincare products"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="space-y-6">                  <div className="liquid-morph rounded-2xl p-6 magnetic-field">
                    <h3 className="text-2xl font-playfair font-semibold mb-3 text-white">After 30 Days</h3>
                    <div className="w-full h-48 bg-pearl rounded-xl overflow-hidden">
                      <img 
                        src="/images/after-skin.png" 
                        alt="After 30 days using Eluma skincare products"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 1 + i * 0.1, duration: 0.5, type: "spring" }}
                  >
                    <Star className="w-6 h-6 text-gold fill-current quantum-flicker" />
                  </motion.div>
                ))}
              </div>
              <p className="text-lg italic text-charcoal/80">
                "I've never felt more confident in my skin. The glow is unreal!"
              </p>
              <p className="text-sm text-charcoal/60 mt-2">— Sarah M., verified customer</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const testimonials = [
    {
      name: "Emma Chen",
      role: "Beauty Editor",
      content: "Eluma has completely transformed my skincare routine. The science behind it is incredible.",
      rating: 5
    },
    {
      name: "Jessica Rivera",
      role: "Dermatologist",
      content: "I recommend Eluma to all my patients. The formulations are gentle yet effective.",
      rating: 5
    },
    {
      name: "Aisha Patel",
      role: "Skincare Enthusiast",
      content: "The glow is real! I've tried everything, but nothing compares to Eluma.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" ref={ref} className="py-24 bg-gradient-to-b from-lilac/20 to-pearl">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <TextReveal className="text-5xl md:text-6xl font-playfair font-bold mb-6">
            Loved by Thousands
          </TextReveal>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="glassmorphism rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-gold/20 hover:bg-white/10">
                <div className="flex items-center mb-4 justify-center md:justify-start">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
                      whileHover={{ scale: 1.3, rotate: 15 }}
                    >                      <Star className="w-8 h-8 mr-1 relative" 
                            style={{ 
                              color: '#FFD700',
                              fill: '#FFD700',
                              filter: 'drop-shadow(0 0 2px rgba(255, 215, 0, 0.6))',
                              stroke: '#FFA500',
                              strokeWidth: '0.5px'
                            }} />
                    </motion.div>
                  ))}
                </div>
                <motion.p 
                  className="text-charcoal/80 mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  "{testimonial.content}"
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <p className="font-semibold text-charcoal">{testimonial.name}</p>
                  <p className="text-sm text-charcoal/60">{testimonial.role}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-gold/10 via-pearl to-lilac/10 relative overflow-hidden">
      <div className="absolute inset-0 holographic opacity-30" />
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <MagneticElement>
            <TextReveal className="text-5xl md:text-7xl font-playfair font-bold mb-6">
              Ready to Glow?
            </TextReveal>
          </MagneticElement>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-charcoal/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of women who've discovered their most radiant skin with Eluma.
          </motion.p>
          
          <MagneticElement>
            <motion.button
              className="plasma-button magnetic-field px-12 py-6 rounded-full font-semibold text-lg text-white hover-lift-3d inline-flex items-center group shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Start Your Glow Journey
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </MagneticElement>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm text-charcoal/60 mt-6"
          >
            Free shipping on orders over $75 • 30-day money-back guarantee
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-charcoal text-pearl py-16 relative overflow-hidden">
      <div className="absolute inset-0 liquid-morph opacity-10" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <MagneticElement>
              <h3 className="text-3xl font-playfair font-bold mb-4 iridescent-text">Elume</h3>
            </MagneticElement>
            <p className="text-pearl/70 mb-6 max-w-md leading-relaxed">
              Skincare for the luminous you. Powered by science, perfected by nature.
            </p>
            <div className="flex space-x-4">
              {['Instagram', 'TikTok', 'YouTube'].map((social) => (
                <MagneticElement key={social}>
                  <a
                    href="#"
                    className="text-pearl/70 hover:text-gold transition-colors quantum-flicker"
                  >
                    {social}
                  </a>
                </MagneticElement>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-pearl/70">
              {['Dew Serum', 'Night Veil', 'Halo Drops', 'Clean Slate'].map((product) => (
                <li key={product}>
                  <MagneticElement>
                    <a href="#" className="hover:text-pearl transition-colors neural-connections">
                      {product}
                    </a>
                  </MagneticElement>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-pearl/70">
              {['Contact Us', 'FAQ', 'Shipping', 'Returns'].map((item) => (
                <li key={item}>
                  <MagneticElement>
                    <a href="#" className="hover:text-pearl transition-colors cosmic-dust">
                      {item}
                    </a>
                  </MagneticElement>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-pearl/20 mt-12 pt-8 text-center text-pearl/60">
          <p>&copy; 2025 Eluma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
