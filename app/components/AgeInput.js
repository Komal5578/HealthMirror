'use client';

import { useState } from 'react';
import useStore from '../store/useStore';
import { ChevronRight, ChevronLeft, User, AlertCircle, Heart } from 'lucide-react';

export default function AgeInput() {
  const { setUserAge, setStep, userAge } = useStore();
  const [age, setAge] = useState(userAge || '');
  const [error, setError] = useState('');
  
  const handleContinue = () => {
    const ageNum = parseInt(age);
    
    if (!age || isNaN(ageNum)) {
      setError('Please enter a valid age');
      return;
    }
    
    if (ageNum < 10) {
      setError('You must be at least 10 years old to use this app');
      return;
    }
    
    if (ageNum > 120) {
      setError('Please enter a valid age');
      return;
    }
    
    setUserAge(ageNum);
    setStep('plan');
  };
  
  const handleBack = () => {
    setStep('health-profile');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-medium text-gray-900">HealthMirror</span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-normal text-gray-900 mb-3">
            How old are you?
          </h1>
          <p className="text-gray-600">
            We'll customize your tasks to be safe and appropriate for your age.
          </p>
        </div>
        
        {/* Age Input */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm">
          <div className="relative">
            <input
              type="number"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                setError('');
              }}
              placeholder="Enter your age"
              className="w-full text-center text-5xl font-medium bg-transparent text-gray-900 placeholder-gray-300 border-b-2 border-gray-200 pb-4 focus:outline-none focus:border-blue-500 transition-colors"
              min="10"
              max="120"
            />
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-red-500 mt-4 justify-center">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Age range info */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-medium">Y</span>
              </div>
              <p className="text-gray-900 text-sm font-medium">10-17</p>
              <p className="text-xs text-gray-500">Youth</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-medium">A</span>
              </div>
              <p className="text-gray-900 text-sm font-medium">18-50</p>
              <p className="text-xs text-gray-500">Adult</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-medium">S</span>
              </div>
              <p className="text-gray-900 text-sm font-medium">51+</p>
              <p className="text-xs text-gray-500">Senior</p>
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            type="button"
            onClick={handleContinue}
            disabled={!age}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-full font-medium
              transition-all duration-200 cursor-pointer
              ${age 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-12">
          <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
        </div>
      </main>
    </div>
  );
}
