'use client';

import useStore from '../store/useStore';
import { Heart, ChevronRight, Target, TrendingUp, Award } from 'lucide-react';

export default function WelcomeScreen() {
  const { setStep } = useStore();
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Logo and Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-normal text-gray-900 mb-4">
            Healthcare Twin
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Your personal health companion
          </p>
          
          <p className="text-gray-500 max-w-lg mx-auto">
            Transform your health journey with personalized plans, intelligent tracking, and meaningful progress
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-300 transition-colors">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Personalized Plans</h3>
            <p className="text-gray-600 text-sm">Tailored health programs designed for your specific goals and needs</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-300 transition-colors">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Track Progress</h3>
            <p className="text-gray-600 text-sm">Monitor your journey with intelligent insights and visual feedback</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-300 transition-colors">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Stay Motivated</h3>
            <p className="text-gray-600 text-sm">Build lasting habits with rewards and your personal health companion</p>
          </div>
        </div>
        
        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={() => setStep('health-profile')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium text-lg transition-colors shadow-sm"
          >
            Get started
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <p className="text-gray-500 text-sm mt-6">
            Start your personalized health journey today
          </p>
        </div>
      </div>
    </div>
  );
}
