'use client';

import { useState } from 'react';
import useStore, { plans } from '../store/useStore';
import { ChevronRight, ChevronLeft, Zap, Clock, Gauge, Heart, Check } from 'lucide-react';

const iconMap = {
  fast: <Zap className="w-6 h-6" />,
  medium: <Gauge className="w-6 h-6" />,
  slow: <Clock className="w-6 h-6" />,
};

const colorMap = {
  fast: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-100 text-orange-600', accent: 'text-orange-600' },
  medium: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600', accent: 'text-blue-600' },
  slow: { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-100 text-green-600', accent: 'text-green-600' },
};

export default function PlanSelection() {
  const { selectPlan, setStep, healthGoal } = useStore();
  const [selected, setSelected] = useState(null);
  
  const handleContinue = () => {
    if (selected) {
      selectPlan(selected);
      setStep('guider');
    }
  };
  
  const handleBack = () => {
    setStep('age');
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-medium text-gray-800">Healthcare Twin</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-normal text-gray-900 mb-3">
            Choose your recovery path
          </h1>
          <p className="text-gray-600 text-lg">
            For <span className="text-blue-600 font-medium">{healthGoal?.name}</span> — Select the intensity that works best for you.
          </p>
        </div>
        
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map((plan) => {
            const colors = colorMap[plan.id];
            const isSelected = selected?.id === plan.id;
            
            return (
              <button
                key={plan.id}
                onClick={() => setSelected(plan)}
                className={`
                  relative p-6 rounded-2xl transition-all duration-200 text-left border-2
                  ${isSelected 
                    ? `${colors.bg} ${colors.border}` 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.icon}`}>
                  {iconMap[plan.id]}
                </div>
                
                <h3 className="text-gray-900 font-medium text-xl mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gray-100 rounded-lg px-3 py-1">
                    <span className="text-gray-900 font-medium">{plan.days}</span>
                    <span className="text-gray-500 text-sm ml-1">days</span>
                  </div>
                  <div className={`rounded-lg px-3 py-1 ${colors.bg}`}>
                    <span className={`text-sm font-medium ${colors.accent}`}>{plan.intensity}</span>
                  </div>
                </div>
                
                {/* Intensity bars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        (plan.id === 'fast' && i <= 3) ||
                        (plan.id === 'medium' && i <= 2) ||
                        (plan.id === 'slow' && i <= 1)
                          ? plan.id === 'fast' ? 'bg-orange-400' : plan.id === 'medium' ? 'bg-blue-400' : 'bg-green-400'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Features */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Check className="w-4 h-4 text-gray-400" />
                    <span>{plan.id === 'fast' ? '4-5' : plan.id === 'medium' ? '3-4' : '2-3'} daily tasks</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Check className="w-4 h-4 text-gray-400" />
                    <span>{plan.id === 'fast' ? 'Maximum' : plan.id === 'medium' ? 'Balanced' : 'Gentle'} progression</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Check className="w-4 h-4 text-gray-400" />
                    <span>Personalized for your age</span>
                  </div>
                </div>
                
                {/* Selected indicator */}
                {isSelected && (
                  <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center ${plan.id === 'fast' ? 'bg-orange-600' : plan.id === 'medium' ? 'bg-blue-600' : 'bg-green-600'}`}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-full font-medium
              transition-all duration-200
              ${selected 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-12">
          <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
          <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
          <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
          <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
        </div>
      </main>
    </div>
  );
}
