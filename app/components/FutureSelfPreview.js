'use client';

import { useState } from 'react';
import { Clock, TrendingUp, TrendingDown, X, Heart, Dumbbell, Activity, Brain, AlertTriangle, Zap, Calendar, Target } from 'lucide-react';
import useStore from '../store/useStore';

export default function FutureSelfPreview({ onClose }) {
  const [selectedYear, setSelectedYear] = useState(5);
  const [viewMode, setViewMode] = useState('positive');
  
  const { 
    healthGoal, 
    healthScore = 50, 
    vitalSigns = {},
    userAge = 30,
    streakDays = 0,
    getHealthProjection
  } = useStore();
  
  const yearOptions = [1, 5, 10];
  
  const getProjection = (years, isPositive) => {
    if (getHealthProjection) {
      try {
        const projection = getHealthProjection(years);
        
        if (!isPositive) {
          return {
            ...projection,
            healthScore: Math.max(10, healthScore - (years * 8)),
            projectedVitals: {
              heartHealth: Math.max(10, (vitalSigns.heartHealth || 50) - years * 6),
              muscleStrength: Math.max(10, (vitalSigns.muscleStrength || 50) - years * 5),
              flexibility: Math.max(10, (vitalSigns.flexibility || 50) - years * 7),
              mentalWellness: Math.max(10, (vitalSigns.mentalWellness || 50) - years * 5),
              energyLevel: Math.max(10, (vitalSigns.energyLevel || 50) - years * 7),
            },
            bodyState: years >= 5 ? 'weak' : years >= 3 ? 'declining' : 'at_risk',
            riskLevel: years >= 5 ? 'critical' : years >= 3 ? 'high' : 'moderate',
            trend: 'declining',
            riskFactors: [
              { factor: 'Sedentary lifestyle', impact: 'severe', deduction: 15 },
              { factor: 'Poor diet habits', impact: 'high', deduction: 10 },
              { factor: 'No exercise routine', impact: 'moderate', deduction: 8 },
            ]
          };
        }
        return projection;
      } catch (e) {
        console.log('Projection error:', e);
      }
    }
    
    return {
      healthScore: isPositive ? Math.min(100, healthScore + years * 8) : Math.max(10, healthScore - years * 8),
      bodyState: isPositive ? 'fit' : 'weak',
      projectedVitals: { heartHealth: 50, muscleStrength: 50, flexibility: 50, mentalWellness: 50, energyLevel: 50 },
      riskLevel: 'moderate',
      trend: isPositive ? 'improving' : 'declining',
      futureAge: userAge + years,
      riskFactors: []
    };
  };
  
  const projection = getProjection(selectedYear, viewMode === 'positive');
  
  const getHealthColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getRiskColor = (level) => {
    const colors = {
      minimal: 'bg-green-100 text-green-700',
      low: 'bg-blue-100 text-blue-700',
      moderate: 'bg-yellow-100 text-yellow-700',
      high: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-100 text-red-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };
  
  const getTrendIcon = (trend) => {
    if (trend?.includes('improving')) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend?.includes('declining')) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Activity className="w-4 h-4 text-yellow-600" />;
  };
  
  const formatBodyState = (state) => (state || 'normal').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Future Self Projection</h2>
            <p className="text-gray-500 text-sm mt-1">Advanced health trajectory analysis</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-gray-600">Projection Timeline:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {yearOptions.map((year) => (
                <button key={year} onClick={() => setSelectedYear(year)}
                  className={`px-5 py-2 rounded-lg font-medium transition-all ${selectedYear === year ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>
                  {year} Year{year > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <button onClick={() => setViewMode('positive')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${viewMode === 'positive' ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'}`}>
              <TrendingUp className="w-4 h-4" /> Continue Healthy Habits
            </button>
            <button onClick={() => setViewMode('negative')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${viewMode === 'negative' ? 'bg-red-100 text-red-700 border-2 border-red-300' : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'}`}>
              <TrendingDown className="w-4 h-4" /> If You Stop Now
            </button>
          </div>
          
          <div className={`rounded-xl p-4 mb-6 ${viewMode === 'positive' ? 'bg-blue-50' : 'bg-orange-50'}`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">
                  <strong>Age {userAge}</strong> today <span className="mx-2">→</span>
                  <strong>Age {projection.futureAge || userAge + selectedYear}</strong> in {selectedYear} year{selectedYear > 1 ? 's' : ''}
                </span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(projection.riskLevel)}`}>
                {(projection.riskLevel || 'moderate').toUpperCase()} RISK
              </div>
            </div>
            {projection.summary && <p className="text-gray-600 text-sm mt-3">{projection.summary}</p>}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-center text-gray-600 font-medium mb-4">Current You (Age {userAge})</h3>
              <div className="text-center">
                <div className={`text-5xl font-bold ${getHealthColor(healthScore)}`}>{healthScore}</div>
                <div className="text-gray-500 mt-1">Health Score</div>
              </div>
              <div className="mt-4 text-center">
                <div className="inline-block px-4 py-2 bg-gray-200 rounded-full text-gray-700 font-medium">Starting Point</div>
              </div>
              {streakDays > 0 && (
                <div className="mt-4 text-center text-sm text-gray-600">
                  <Zap className="w-4 h-4 inline mr-1 text-yellow-500" />{streakDays} day streak bonus
                </div>
              )}
            </div>
            
            <div className={`rounded-2xl p-6 border-2 ${viewMode === 'positive' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h3 className="text-center text-gray-600 font-medium mb-4">You at Age {projection.futureAge || userAge + selectedYear}</h3>
              <div className="text-center">
                <div className={`text-5xl font-bold ${getHealthColor(projection.healthScore)}`}>{Math.round(projection.healthScore || 50)}</div>
                <div className="text-gray-500 mt-1">Projected Score</div>
              </div>
              <div className="mt-4 text-center">
                <div className={`inline-block px-4 py-2 rounded-full font-medium ${viewMode === 'positive' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                  {formatBodyState(projection.bodyState)}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                {getTrendIcon(projection.trend)}
                <span className="text-gray-600 capitalize">{(projection.trend || 'stable').replace('_', ' ')}</span>
              </div>
            </div>
          </div>
          
          {viewMode === 'positive' && projection.ageFactor && (
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" /> Projection Factors
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3"><div className="text-gray-500">Age Factor</div><div className="font-bold text-lg">{projection.ageFactor}x</div></div>
                <div className="bg-white rounded-lg p-3"><div className="text-gray-500">Streak Bonus</div><div className="font-bold text-lg text-green-600">+{projection.streakBonus || 0}%</div></div>
                <div className="bg-white rounded-lg p-3"><div className="text-gray-500">Compound Effect</div><div className="font-bold text-lg text-purple-600">+{projection.compoundEffect || 0}%</div></div>
                <div className="bg-white rounded-lg p-3"><div className="text-gray-500">Adherence</div><div className="font-bold text-lg">{projection.completionRate || 50}%</div></div>
              </div>
              {projection.estimatedLifespan && (
                <div className="mt-4 text-center p-3 bg-white rounded-lg">
                  <span className="text-gray-600">Estimated healthy lifespan: </span>
                  <span className="font-bold text-blue-600">{projection.estimatedLifespan} years</span>
                </div>
              )}
            </div>
          )}
          
          {projection.riskFactors?.length > 0 && (
            <div className={`rounded-xl p-4 mb-6 ${viewMode === 'positive' ? 'bg-yellow-50' : 'bg-red-50'}`}>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 ${viewMode === 'positive' ? 'text-yellow-600' : 'text-red-600'}`} />
                {viewMode === 'positive' ? 'Areas to Watch' : 'Health Risks'}
              </h4>
              <div className="space-y-2">
                {projection.riskFactors.map((risk, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <span className="text-gray-700">{risk.factor}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${risk.impact === 'severe' ? 'bg-red-100 text-red-700' : risk.impact === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>{risk.impact}</span>
                      <span className="text-red-600 font-medium">-{risk.deduction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Projected Vital Signs</h3>
            <div className="space-y-4">
              {[
                { key: 'heartHealth', label: 'Heart Health', icon: Heart, color: '#ec4899' },
                { key: 'muscleStrength', label: 'Muscle Strength', icon: Dumbbell, color: '#ef4444' },
                { key: 'energyLevel', label: 'Energy Level', icon: Zap, color: '#eab308' },
                { key: 'mentalWellness', label: 'Mental Wellness', icon: Brain, color: '#3b82f6' },
                { key: 'flexibility', label: 'Flexibility', icon: Activity, color: '#10b981' },
              ].map(({ key, label, icon: Icon, color }) => {
                const current = vitalSigns?.[key] || 50;
                const projected = projection.projectedVitals?.[key] || 50;
                const diff = projected - current;
                return (
                  <div key={key} className="flex items-center gap-4">
                    <Icon className="w-5 h-5" style={{ color }} />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">{label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">{Math.round(current)}</span>
                          <span className="text-gray-400">→</span>
                          <span className={`text-sm font-bold ${diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>{Math.round(projected)}</span>
                          <span className={`text-xs ${diff >= 0 ? 'text-green-500' : 'text-red-500'}`}>({diff >= 0 ? '+' : ''}{Math.round(diff)})</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${Math.round(projected)}%`, backgroundColor: diff >= 0 ? '#10b981' : '#ef4444' }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className={`mt-6 p-4 rounded-xl text-center ${viewMode === 'positive' ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className={viewMode === 'positive' ? 'text-green-800' : 'text-red-800'}>
              {viewMode === 'positive' 
                ? 'Keep up your healthy habits! Every task you complete today shapes a healthier tomorrow.'
                : 'This projection shows what could happen if you stop your healthy habits. Stay consistent to avoid these risks!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
