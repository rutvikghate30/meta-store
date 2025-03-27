
import { motion } from "framer-motion";

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

export const slideInFromLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

export const slideInFromRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.5, 
      ease: [0.34, 1.56, 0.64, 1]
    } 
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

export const pageFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } }
};

export const pageSlideUp = {
  initial: { opacity: 0, y: 25 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0, 
    y: 15,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6
};

// Enhanced hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
};

export const hoverLift = {
  whileHover: { y: -7 },
  whileTap: { y: 0 },
  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
};

export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// For implementing staggered children entries with improved timing
export const staggeredChildren = (delay = 0.12) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: delay,
      delayChildren: 0.1
    }
  }
});

export const listItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
};

// New animations
export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.34, 1.56, 0.64, 1] 
    }
  }
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -5 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.34, 1.56, 0.64, 1] 
    }
  }
};

export const buttonHover = {
  whileHover: { 
    scale: 1.03,
    y: -3, 
    transition: { 
      duration: 0.3, 
      ease: [0.34, 1.56, 0.64, 1] 
    }
  },
  whileTap: { 
    scale: 0.97, 
    y: 0, 
    transition: { duration: 0.1 } 
  }
};

export const cardHover = {
  whileHover: { 
    y: -6, 
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    transition: { 
      duration: 0.3, 
      ease: [0.34, 1.56, 0.64, 1] 
    }
  },
  whileTap: { 
    y: -2, 
    boxShadow: "0 5px 10px rgba(0,0,0,0.05)",
    transition: { duration: 0.1 } 
  }
};
