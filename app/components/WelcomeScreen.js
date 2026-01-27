'use client';

import Image from 'next/image';
import useStore from '../store/useStore';
import { ChevronRight } from 'lucide-react';

export default function WelcomeScreen() {
  const { setStep } = useStore();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/healthmirrorbg.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-5xl w-full">
          {/* Logo and Title */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 rounded-3xl mb-8 shadow-2xl">
              <Image src="/logo-m.svg" alt="HealthMirror Logo" width={56} height={56} className="w-16 h-16" />
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-lg">
              HealthMirror
            </h1>
            
            <p className="text-2xl sm:text-3xl font-semibold text-white/95 mb-4">
              Your personal health companion
            </p>
            
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-medium">
              Transform your health journey with personalized plans, intelligent tracking, and meaningful progress
            </p>
          </div>
          
          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={() => setStep('health-profile')}
              className="inline-flex items-center gap-3 px-12 py-5 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold text-xl transition-all shadow-2xl hover:shadow-blue-500/30 hover:scale-105"
            >
              Get started
              <ChevronRight className="w-7 h-7" />
            </button>
            
            <p className="text-white/70 text-lg font-medium mt-8">
              Start your personalized health journey today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
