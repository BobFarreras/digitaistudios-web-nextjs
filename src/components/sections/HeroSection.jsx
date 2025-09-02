// src/components/sections/HeroSection.jsx

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { Sparkles, PlayCircle, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import heroImage from '/public/images/hero.webp'; // Canviat el nom de l'import per claredat

const HeroSection = ({ onOpenDemo }) => {
  const heroVideoId = "qVmiuo-Rj7s";
  const [showVideo, setShowVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);
  const [isApiReady, setIsApiReady] = useState(false);

  useEffect(() => {
    if (!showVideo || !isApiReady) return;
    const onPlayerStateChange = (event) => {
      if (event.data === 0) { // ENDED
        setShowVideo(false);
      }
    };
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player('youtube-player-container', {
        videoId: heroVideoId,
        playerVars: { autoplay: 1, mute: 1, controls: 0, showinfo: 0, rel: 0, iv_load_policy: 3, modestbranding: 1 },
        events: { 'onStateChange': onPlayerStateChange }
      });
    }
    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [showVideo, isApiReady, heroVideoId]);

  const handleImageClick = () => setShowVideo(true);
  const toggleMute = (e) => {
    e.stopPropagation();
    if (!playerRef.current) return;
    isMuted ? playerRef.current.unMute() : playerRef.current.mute();
    setIsMuted(!isMuted);
  };

  return (
    <>
      <Script
        src="https://www.youtube.com/iframe_api"
        onReady={() => {
          window.onYouTubeIframeAPIReady = () => setIsApiReady(true);
          if (window.YT && window.YT.Player) setIsApiReady(true);
        }}
      />
<section id="inici" className="pt-36 pb-20 hero-pattern min-h-screen flex items-center overflow-x-hidden">
<div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Columna de text */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    <span className="gradient-text">Automatitza</span> el teu negoci.<br />
                    <span className="text-foreground">Allibera temps.</span><br />
                    <span className="gradient-text">Impulsa el futur.</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Transforma la teva petita empresa amb solucions d'intel·ligència artificial que automatitzen processos, milloren la productivitat i ofereixen experiències excepcionals als teus clients.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/solucions">
                        <Button variant="default" size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-primary/30 transition-all duration-300 gradient-bg text-primary-foreground transform hover:scale-105">
                            Descobreix les Solucions
                        </Button>
                    </Link>
                </div>
                <div className="mt-12 flex items-center space-x-4 sm:space-x-8">
                    <div className="text-center"><div className="text-2xl sm:text-3xl font-bold gradient-text">+50</div><div className="text-xs sm:text-sm text-muted-foreground">Empreses confien</div></div>
                    <div className="text-center"><div className="text-2xl sm:text-3xl font-bold gradient-text">20h</div><div className="text-xs sm:text-sm text-muted-foreground">Estalviades/setmana</div></div>
                    <div className="text-center"><div className="text-2xl sm:text-3xl font-bold gradient-text">150%</div><div className="text-xs sm:text-sm text-muted-foreground">Més productivitat</div></div>
                </div>
            </motion.div>

            {/* Columna de vídeo/imatge */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className={`relative w-full aspect-video rounded-3xl shadow-2xl overflow-hidden ${!showVideo ? 'floating-animation' : ''}`}>
                {showVideo ? (
                  <>
                    <div id="youtube-player-container" className="w-full h-full absolute top-0 left-0"></div>
                    <button onClick={toggleMute} className="absolute bottom-3 right-3 z-10 bg-black/40 p-2 rounded-full text-white backdrop-blur-sm hover:bg-black/60 transition-colors" aria-label={isMuted ? "Activar so" : "Silenciar"}>
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                  </>
                ) : (
                  <div className="relative cursor-pointer group" onClick={handleImageClick}>
                    <Image src={heroImage} alt="Equip divers col·laborant en una oficina moderna." className="w-full h-full object-cover" priority />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      <PlayCircle className="w-20 h-20 text-white opacity-80" />
                    </div>
                  </div>
                )}
              </div>

              {/* --- CANVIS AQUÍ --- */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 120 }}
                className={`absolute glass-effect rounded-2xl p-4 sm:p-6 shadow-xl transition-all duration-700 ease-in-out ${
                  showVideo 
                  ? '-bottom-8 -left-4 lg:-bottom-16 lg:-left-16' 
                  : '-bottom-4 -left-2 lg:-bottom-6 lg:-left-6'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium">IA activa 24/7</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 120 }}
                className={`absolute glass-effect rounded-2xl p-4 sm:p-6 shadow-xl transition-all duration-700 ease-in-out ${
                  showVideo 
                  ? '-top-8 -right-4 lg:-top-16 lg:-right-16'
                  : '-top-4 -right-2 lg:-top-6 lg:-right-6'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="text-xs sm:text-sm font-medium">Automatització intel·ligent</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;