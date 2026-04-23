import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

/**
 * PremiumFluidModal - A highly optimized, premium UI component for floating elements.
 * Adheres to strict performance and aesthetic constraints:
 * - NO height/width/layout animations
 * - ONLY transform and opacity
 * - GPU accelerated with will-change and translateZ(0)
 * - Spring-based continuous motion
 */



const PremiumFluidModal = ({ 
  isOpen, 
  onClose, 
  children, 
  className = "", 
  triggerId = "",
  style = {} 
}) => {
  React.useEffect(() => {
    if (!isOpen || !onClose) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Motion settings from specifications
  const springConfig = {
    type: "spring",
    stiffness: 260, // 240-280
    damping: 22,    // 20-24
    mass: 1,
    restDelta: 0.001
  };

  const containerVariants = {
    closed: {
      opacity: 0,
      y: 14,
      scale: 0.95,
      transition: {
         ...springConfig,
         // Ensure it animates out fully before unmounting
         opacity: { duration: 0.2 }
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ...springConfig,
        // Stagger children for natural appearance
        staggerChildren: 0.05, // 40-60ms stagger
        delayChildren: 0.02
      }
    }
  };

  // Modern shadow system: increases slightly on open via filter: drop-shadow
  // or just using box-shadow with transition.
  // Specifications say: "soft shadow that slightly increases on open"
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={containerVariants}
          style={{
            willChange: "transform, opacity",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            ...style
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={triggerId || undefined}
          className={`z-999 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 ${className}`}
        >
          {/* Add GPU acceleration layer */}
          <div style={{ transform: "translateZ(0)" }}>
            {children}
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * PremiumFluidWrapper - Helper to stagger child elements
 */
export const PremiumFluidChild = ({ children, className = "" }) => {
  const childVariants = {
    closed: { opacity: 0, y: 5 },
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 22 } }
  };

  return (
    <Motion.div variants={childVariants} className={className}>
      {children}
    </Motion.div>
  );
};

export default PremiumFluidModal;



