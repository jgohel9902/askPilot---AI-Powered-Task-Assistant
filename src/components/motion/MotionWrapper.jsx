/* eslint-disable no-unused-vars */
// src/components/motion/MotionWrapper.jsx
import { motion, AnimatePresence } from "../../lib/motion.js";

export function MotionWrapper({ children, className = "", style = {} }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
    >
      {children}
    </motion.div>
  );
}

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export { AnimatePresence };
