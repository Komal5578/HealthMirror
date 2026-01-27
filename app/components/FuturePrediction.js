'use client';

import { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Brain, 
  Dumbbell, 
  TrendingUp,
  Calendar,
  Target,
  Loader2,
  RefreshCw,
  Star,
  Zap,
  Shield,
  Sun,
  User,
  ImageIcon
} from 'lucide-react';

export default function FuturePrediction({ onBack }) {
  const { 
    healthGoal, 
    completedTasks, 
    streakDays, 
    currentDay,
    selectedPlan,
    userAge,
    vitalSigns,
    userGender
  } = useStore();
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [generatingImages, setGeneratingImages] = useState(false);
  const [yearImages, setYearImages] = useState({});

  const generatePrediction = async () => {
    setLoading(true);
    setError(null);
    setAnimationStep(0);
    setYearImages({});
    
    try {
      const response = await fetch('/api/future-prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          healthGoal: healthGoal?.name || 'General Fitness',
          completedTasksCount: completedTasks.length,
          streakDays,
          currentDay,
          planName: selectedPlan?.name || 'Custom Plan',
          planDays: selectedPlan?.days || 30,
          userAge: userAge || 25,
          userGender: userGender || 'neutral',
          vitalSigns: vitalSigns || {},
          recentTasks: completedTasks.slice(-10).map(t => t.name)
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate prediction');
      }
      
      const data = await response.json();
      setPrediction(data.prediction);
      
      // Start animation sequence
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setAnimationStep(step);
        if (step >= 5) clearInterval(interval);
      }, 800);
      
      // Generate images for each year
      generateYearImages(data.prediction);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateYearImages = async (predictionData) => {
    setGeneratingImages(true);
    
    try {
      const response = await fetch('/api/generate-future-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          healthGoal: healthGoal?.name || 'General Fitness',
          userAge: userAge || 25,
          userGender: userGender || 'neutral',
          years: predictionData.years,
          vitalSigns: vitalSigns || {}
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setYearImages(data.images || {});
      }
    } catch (err) {
      console.error('Error generating images:', err);
    } finally {
      setGeneratingImages(false);
    }
  };

  useEffect(() => {
    generatePrediction();
  }, []);

  const getYearLabel = (year) => {
    const labels = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
    return labels[year] || `Year ${year + 1}`;
  };

  const getYearIcon = (index) => {
    const icons = [
      <Zap key="zap" className="w-6 h-6" />,
      <TrendingUp key="trend" className="w-6 h-6" />,
      <Dumbbell key="dumbbell" className="w-6 h-6" />,
      <Shield key="shield" className="w-6 h-6" />,
      <Star key="star" className="w-6 h-6" />
    ];
    return icons[index];
  };

  const getYearColor = (index) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-amber-500',
      'from-yellow-400 to-orange-400'
    ];
    return colors[index];
  };

  const getProgressVisualization = (index) => {
    // Generate a visual representation of body transformation
    const progressLevels = [20, 40, 60, 80, 100];
    const progress = progressLevels[index];
    
    return (
      <div className="relative w-32 h-40 mx-auto">
        {/* Body silhouette with progress */}
        <svg viewBox="0 0 100 140" className="w-full h-full">
          {/* Background body outline */}
          <ellipse cx="50" cy="25" rx="20" ry="22" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <path d="M30 47 L25 95 L35 95 L40 70 L50 75 L60 70 L65 95 L75 95 L70 47 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <path d="M25 95 L20 135 L35 135 L40 95 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <path d="M60 95 L65 135 L80 135 L75 95 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          
          {/* Filled progress overlay */}
          <defs>
            <linearGradient id={`bodyGradient${index}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={index === 0 ? '#3B82F6' : index === 1 ? '#10B981' : index === 2 ? '#8B5CF6' : index === 3 ? '#F59E0B' : '#EAB308'} />
              <stop offset="100%" stopColor={index === 0 ? '#06B6D4' : index === 1 ? '#34D399' : index === 2 ? '#EC4899' : index === 3 ? '#F97316' : '#F97316'} />
            </linearGradient>
            <clipPath id={`progressClip${index}`}>
              <rect x="0" y={140 - (progress * 1.4)} width="100" height={progress * 1.4} />
            </clipPath>
          </defs>
          
          <g clipPath={`url(#progressClip${index})`}>
            <ellipse cx="50" cy="25" rx="20" ry="22" fill={`url(#bodyGradient${index})`} opacity="0.8"/>
            <path d="M30 47 L25 95 L35 95 L40 70 L50 75 L60 70 L65 95 L75 95 L70 47 Z" fill={`url(#bodyGradient${index})`} opacity="0.8"/>
            <path d="M25 95 L20 135 L35 135 L40 95 Z" fill={`url(#bodyGradient${index})`} opacity="0.8"/>
            <path d="M60 95 L65 135 L80 135 L75 95 Z" fill={`url(#bodyGradient${index})`} opacity="0.8"/>
          </g>
          
          {/* Glow effect */}
          <ellipse cx="50" cy="25" rx="22" ry="24" fill="none" stroke={`url(#bodyGradient${index})`} strokeWidth="2" opacity="0.5" className="animate-pulse"/>
        </svg>
        
        {/* Progress percentage */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white font-bold text-sm">{progress}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Video/Animation */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900"></div>
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/30 backdrop-blur-sm border-b border-white/10 sticky top-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
            <div className="flex items-center gap-2 text-amber-400">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">AI Future Vision</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-6 shadow-lg shadow-amber-500/30 animate-pulse">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Your 5-Year Transformation
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Watch your future self emerge based on your <span className="text-amber-400 font-semibold">{healthGoal?.name || 'health journey'}</span>
          </p>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{currentDay}</p>
            <p className="text-white/60 text-sm">Current Day</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{completedTasks.length}</p>
            <p className="text-white/60 text-sm">Tasks Done</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{streakDays}</p>
            <p className="text-white/60 text-sm">Day Streak</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
            <User className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{userAge || 25}</p>
            <p className="text-white/60 text-sm">Your Age</p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/20 rounded-full mb-6">
              <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Creating Your Future Vision...</h3>
            <p className="text-white/60">AI is analyzing your journey and generating predictions</p>
            <div className="mt-6 flex justify-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={generatePrediction}
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Prediction Timeline with Images */}
        {prediction && !loading && (
          <div className="space-y-8">
            {prediction.years?.map((yearData, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 ${
                  animationStep > index 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-95'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-white/30 transition-all hover:bg-white/15 overflow-hidden">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Visual Representation */}
                    <div className="lg:w-1/3 flex flex-col items-center justify-center">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${getYearColor(index)} flex items-center justify-center text-white shadow-lg mb-4`}>
                        {getYearIcon(index)}
                      </div>
                      
                      {/* Body Progress Visualization */}
                      {getProgressVisualization(index)}
                      
                      {/* AI Generated Image Placeholder */}
                      {yearImages[index] ? (
                        <div className="mt-4 w-full aspect-square rounded-xl overflow-hidden border-2 border-white/20">
                          <img 
                            src={yearImages[index]} 
                            alt={`Year ${index + 1} visualization`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : generatingImages ? (
                        <div className="mt-4 w-full aspect-square rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <div className="text-center">
                            <ImageIcon className="w-8 h-8 text-white/40 mx-auto mb-2 animate-pulse" />
                            <p className="text-white/40 text-xs">Generating...</p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    
                    {/* Text Content */}
                    <div className="lg:w-2/3">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-2xl font-bold text-white">{getYearLabel(index)}</h3>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-sm">
                          Age {(userAge || 25) + index + 1}
                        </span>
                      </div>
                      
                      <p className="text-white/90 text-lg leading-relaxed mb-4">{yearData.description}</p>
                      
                      {yearData.achievements && yearData.achievements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-white/70 text-sm font-medium mb-2">Achievements Unlocked:</h4>
                          <div className="flex flex-wrap gap-2">
                            {yearData.achievements.map((achievement, i) => (
                              <span
                                key={i}
                                className={`px-4 py-2 bg-gradient-to-r ${getYearColor(index)} bg-opacity-20 rounded-full text-sm text-white font-medium border border-white/20`}
                              >
                                🏆 {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {yearData.healthMetrics && (
                        <div className="grid grid-cols-3 gap-3">
                          {Object.entries(yearData.healthMetrics).map(([key, value]) => (
                            <div key={key} className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
                              <p className="text-white text-xl font-bold">{value}</p>
                              <p className="text-white/50 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Final Summary */}
            {prediction.summary && animationStep >= 5 && (
              <div 
                className="mt-10 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-3xl p-8 border border-amber-500/30 transform transition-all duration-1000"
                style={{ transitionDelay: '1000ms' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sun className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Your Complete Transformation</h3>
                    <p className="text-white/60">5 years of dedication summarized</p>
                  </div>
                </div>
                
                <p className="text-white/90 text-xl leading-relaxed mb-6">{prediction.summary}</p>
                
                {prediction.motivationalMessage && (
                  <div className="p-6 bg-white/10 rounded-2xl border border-white/20">
                    <p className="text-amber-300 font-medium text-lg italic text-center">
                      ✨ "{prediction.motivationalMessage}" ✨
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Regenerate Button */}
            <div className="text-center pt-8">
              <button
                onClick={generatePrediction}
                disabled={loading}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-2xl text-white font-bold text-lg transition-all shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
                Generate New Vision
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
