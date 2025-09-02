// src/components/specific/VideoPlayer.jsx
import React from 'react';
import { motion } from 'framer-motion';

const VideoPlayer = ({ src, isMuted }) => {
  return (
    <motion.div
      className="w-full h-full aspect-video overflow-hidden rounded-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <video
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        controls 
      />
    </motion.div>
  );
};

export default VideoPlayer;