'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import useStore from '../store/useStore';
import { ChevronLeft, ChevronRight, Sparkles, User, Palette, Heart } from 'lucide-react';

// Dynamic import for Three.js component
const Avatar3D = dynamic(() => import('./Avatar3D'), { 
  ssr: false,
  loading: () => (
    <div className="h-[280px] flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </div>
  )
});

const avatarColors = [
  { name: 'Light', color: '#FFE0BD' },
  { name: 'Peach', color: '#FFDAB9' },
  { name: 'Tan', color: '#D2B48C' },
  { name: 'Brown', color: '#8B7355' },
  { name: 'Sky', color: '#87CEEB' },
  { name: 'Mint', color: '#98FB98' },
  { name: 'Lavender', color: '#DDA0DD' },
  { name: 'Gold', color: '#FFD700' },
];

export default function GuiderSetup() {
  const { setGuiderInfo, setStep, setAvatarColor, avatarColor, generateDailyTasks, setGuiderEmail } = useStore();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [selectedColor, setSelectedColor] = useState(avatarColor);
  const [error, setError] = useState('');
  
  const handleStart = () => {
    if (!name.trim()) {
      setError('Please enter your Guider\'s name');
      return;
    }
    
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError('Please enter a valid age');
      return;
    }
    
    // Validate email if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setGuiderInfo(name.trim(), ageNum);
    if (email) setGuiderEmail(email.trim());
    setAvatarColor(selectedColor);
    generateDailyTasks();
    setStep('dashboard');
  };
  
  const handleBack = () => {
    setStep('plan');
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-normal text-gray-900 mb-3">
            Create your Guider
          </h1>
          <p className="text-gray-600 text-lg">
            Nominate a friend or family member to be your virtual companion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Avatar Preview */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 order-2 lg:order-1">
            <div className="text-center mb-4">
              <h3 className="text-gray-900 font-medium flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Avatar Preview
              </h3>
            </div>
            
            <Avatar3D height="280px" />
            
            {/* Color Selection */}
            <div className="mt-6">
              <h4 className="text-gray-700 text-sm font-medium mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-gray-500" />
                Choose Skin Tone
              </h4>
              <div className="flex flex-wrap gap-3 justify-center">
                {avatarColors.map((c) => (
                  <button
                    key={c.color}
                    onClick={() => {
                      setSelectedColor(c.color);
                      setAvatarColor(c.color);
                    }}
                    className={`
                      w-10 h-10 rounded-full transition-all duration-200 border-2
                      ${selectedColor === c.color 
                        ? 'border-blue-600 ring-2 ring-blue-100 scale-110' 
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                    style={{ backgroundColor: c.color }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Form */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 order-1 lg:order-2">
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  Guider's Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter their name..."
                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
                <p className="text-gray-500 text-sm mt-2">
                  This could be your mom, dad, best friend, sibling, or anyone who motivates you!
                </p>
              </div>
              
              {/* Age Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Guider's Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setError('');
                  }}
                  placeholder="How old are they?"
                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                  min="1"
                  max="120"
                />
              </div>
              
              {/* Email Input (Optional) */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Guider's Email <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="their.email@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                />
                <p className="text-gray-500 text-sm mt-2">
                  Add their email to send them progress reports and health summaries.
                </p>
              </div>
              
              {/* Info Box */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <h4 className="text-blue-800 font-medium mb-2">About Guiders</h4>
                <p className="text-blue-700 text-sm">
                  Your Guider will appear as a friendly avatar who celebrates your wins and encourages you when things get tough. They'll express emotions based on your progress!
                </p>
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-center border border-red-100">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            onClick={handleStart}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Start Your Journey
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-12">
          <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
          <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
          <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
          <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
        </div>
      </main>
    </div>
  );
}
