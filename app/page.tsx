'use client';

import Image from "next/image";
import Header from "@/components/Header";
import { useState, useEffect } from "react";

export default function Home() {
  const [isAnimated, setIsAnimated] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load background preference from localStorage on page load
  useEffect(() => {
    const savedBackground = localStorage.getItem('stockit-background-preference');
    if (savedBackground !== null) {
      const isAnimated = savedBackground === 'animated';
      setIsAnimated(isAnimated);
    }
  }, []);

  const handleBackgroundToggle = (isAnimated: boolean) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsAnimated(isAnimated);
      setIsTransitioning(false);
    }, 250);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Animated Background Video */}
      <video
        key="animated-bg"
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-500 ease-in-out ${
          isAnimated && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      
      {/* Static Background Image */}
      <div 
        key="static-bg"
        className={`absolute inset-0 z-0 transition-all duration-500 ease-in-out ${
          !isAnimated && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        style={{
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Ambient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 z-5" />
      
      {/* Content overlay */}
      <div className="relative flex-col items-center justify-center z-10">
        <Header onBackgroundToggle={handleBackgroundToggle} initialBackgroundState={isAnimated} />
      </div>
      
      {/* Transition overlay for smooth switching */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black/50 z-20 transition-opacity duration-250 ease-in-out" />
      )}
    </div>
  );
}
