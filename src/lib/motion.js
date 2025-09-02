// src/lib/motion.js

"use client";

// Aquest arxiu actua com un intermediari segur.
// Importem tot el que necessitem de framer-motion aquí...
import { motion, AnimatePresence } from 'framer-motion';

// ...i ho re-exportem com a exportacions anomenades.
// Això és el que el nou compilador de Next.js entén correctament.
export { motion, AnimatePresence };