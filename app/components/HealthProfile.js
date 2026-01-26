'use client';

import { useState } from 'react';
import useStore, { healthGoals } from '../store/useStore';
import { ChevronRight, Heart, Activity, Brain, Bone, Dumbbell, Wind, Target, Check } from 'lucide-react';

const iconMap = {
  weight_loss: <Activity className="w-6 h-6 text-blue-600" />,
  muscle_gain: <Dumbbell className="w-6 h-6 text-blue-600" />,
  cardio_health: <Heart className="w-6 h-6 text-blue-600" />,
  diabetes_management: <Activity className="w-6 h-6 text-blue-600" />,
  stress_anxiety: <Brain className="w-6 h-6 text-blue-600" />,
  back_pain: <Bone className="w-6 h-6 text-blue-600" />,
  flexibility: <Wind className="w-6 h-6 text-blue-600" />,
  general_fitness: <Target className="w-6 h-6 text-blue-600" />,
};

export default function HealthProfile() {
  const { setHealthGoal, setStep } = useStore();
  const [selected, setSelected] = useState(null);
  
  const handleContinue = () => {
    if (selected) {
      setHealthGoal(selected);
      setStep('age');
    }
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
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-4">
            What's your health goal?
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select your primary focus area so we can create a personalized recovery plan for you.
          </p>
        </div>
        
        {/* Goals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {healthGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setSelected(goal)}
              className={`
                p-6 rounded-xl transition-all duration-200 text-left border-2
                ${selected?.id === goal.id 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-4
                ${selected?.id === goal.id ? 'bg-blue-100' : 'bg-gray-100'}
              `}>
                {iconMap[goal.id] || <Target className="w-6 h-6 text-blue-600" />}
              </div>
              <h3 className="text-gray-900 font-medium text-base mb-2">{goal.name}</h3>
              <p className="text-gray-500 text-sm">{goal.description}</p>
              
              {selected?.id === goal.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-full text-base font-medium
              transition-all duration-200
              ${selected 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
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
          <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
        </div>
      </main>
    </div>
  );
}
