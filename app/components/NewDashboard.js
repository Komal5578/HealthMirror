import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, AlertCircle, Target, Zap, Heart, Brain, CheckCircle, AlertTriangle, Calendar, Clock, Flame, Trophy, ArrowLeft } from 'lucide-react';

const PersonalizedHealthDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading user data from store
  useEffect(() => {
    // In real implementation, this would read from your useStore
    const mockUserData = {
      name: "Alex",
      level: 5,
      xp: 420,
      coins: 1250,
      streakDays: 12,
      currentDay: 15,
      totalDays: 30,
      healthGoal: "Weight Loss",
      completedTasks: [
        { name: "Morning Walk", day: 1, time: "06:30", duration: "30 min", coins: 50, xp: 30, category: "cardio" },
        { name: "HIIT Workout", day: 2, time: "07:00", duration: "20 min", coins: 75, xp: 50, category: "strength" },
        { name: "Meditation", day: 2, time: "21:00", duration: "15 min", coins: 30, xp: 20, category: "wellness" },
        { name: "Morning Walk", day: 3, time: "06:45", duration: "30 min", coins: 50, xp: 30, category: "cardio" },
        { name: "Core workout", day: 4, time: "18:00", duration: "25 min", coins: 60, xp: 40, category: "strength" },
        { name: "Evening jog", day: 5, time: "19:00", duration: "30 min", coins: 70, xp: 45, category: "cardio" },
        { name: "Yoga session", day: 6, time: "08:00", duration: "30 min", coins: 55, xp: 35, category: "flexibility" },
        { name: "HIIT Workout", day: 7, time: "07:15", duration: "20 min", coins: 75, xp: 50, category: "strength" },
        { name: "Meditation", day: 8, time: "20:30", duration: "15 min", coins: 30, xp: 20, category: "wellness" },
        { name: "Morning Walk", day: 9, time: "06:30", duration: "30 min", coins: 50, xp: 30, category: "cardio" },
        { name: "Strength Training", day: 10, time: "17:00", duration: "40 min", coins: 90, xp: 60, category: "strength" },
        { name: "Evening jog", day: 11, time: "19:15", duration: "35 min", coins: 70, xp: 45, category: "cardio" },
        { name: "Core workout", day: 12, time: "18:30", duration: "25 min", coins: 60, xp: 40, category: "strength" },
        { name: "Yoga session", day: 13, time: "08:30", duration: "30 min", coins: 55, xp: 35, category: "flexibility" },
        { name: "HIIT Workout", day: 14, time: "07:00", duration: "20 min", coins: 75, xp: 50, category: "strength" },
      ],
      totalSteps: 87500,
      totalWorkoutMinutes: 395,
      avgSleepHours: 6.8,
      waterIntakeLiters: 42
    };
    
    setTimeout(() => {
      setUserData(mockUserData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your health insights...</p>
        </div>
      </div>
    );
  }

  // Calculate analytics based on actual user data
  const calculatePerformanceData = () => {
    const weeklyData = [];
    for (let week = 1; week <= 3; week++) {
      const weekStart = (week - 1) * 7 + 1;
      const weekEnd = week * 7;
      const weekTasks = userData.completedTasks.filter(t => t.day >= weekStart && t.day <= weekEnd);
      const actual = weekTasks.length > 0 ? (weekTasks.length / 7) * 100 : 0;
      const predicted = Math.min(actual + Math.random() * 10, 100);
      weeklyData.push({
        week: `Week ${week}`,
        actual: Math.round(actual),
        predicted: Math.round(predicted),
        baseline: 70
      });
    }
    return weeklyData;
  };

  const calculateHealthScore = () => {
    const last7Days = userData.completedTasks.slice(-7);
    return last7Days.map((task, idx) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx % 7],
      score: 60 + (idx + 1) * 4 + Math.random() * 5,
      upper: 60 + (idx + 1) * 4 + 10,
      lower: 60 + (idx + 1) * 4 - 8
    }));
  };

  const calculateWellnessMetrics = () => {
    const categories = userData.completedTasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});
    
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
      const dayTasks = userData.completedTasks.filter(t => t.day === userData.currentDay - 6 + i);
      last7Days.push({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        flexibility: 65 + Math.random() * 20,
        energy: dayTasks.length > 0 ? 70 + dayTasks.length * 5 : 60,
        stress: dayTasks.length > 0 ? 45 - dayTasks.length * 3 : 50,
        recovery: 65 + i * 2 + Math.random() * 10
      });
    }
    return last7Days;
  };

  const calculateTimePatterns = () => {
    const timeSlots = { '6AM': 0, '9AM': 0, '12PM': 0, '3PM': 0, '6PM': 0, '9PM': 0 };
    
    userData.completedTasks.forEach(task => {
      const hour = parseInt(task.time.split(':')[0]);
      if (hour >= 6 && hour < 9) timeSlots['6AM']++;
      else if (hour >= 9 && hour < 12) timeSlots['9AM']++;
      else if (hour >= 12 && hour < 15) timeSlots['12PM']++;
      else if (hour >= 15 && hour < 18) timeSlots['3PM']++;
      else if (hour >= 18 && hour < 21) timeSlots['6PM']++;
      else timeSlots['9PM']++;
    });

    const maxCount = Math.max(...Object.values(timeSlots));
    return Object.entries(timeSlots).map(([time, count]) => ({
      time,
      performance: Math.round((count / maxCount) * 100)
    }));
  };

  const calculateKeyIndicators = () => {
    const completionRate = (userData.completedTasks.length / userData.currentDay) * 100;
    const trend = completionRate > 85 ? 'Improving' : completionRate > 70 ? 'Stable' : 'Needs Focus';
    const goalProgress = Math.round((userData.currentDay / userData.totalDays) * 100);
    
    return [
      {
        title: 'Performance Trend',
        value: trend,
        change: `${Math.round(completionRate)}% task completion`,
        icon: trend === 'Improving' ? TrendingUp : Activity,
        color: trend === 'Improving' ? 'bg-green-500' : 'bg-blue-500',
        confidence: 94
      },
      {
        title: 'Goal Achievement',
        value: `${goalProgress}%`,
        change: `Day ${userData.currentDay} of ${userData.totalDays}`,
        icon: Target,
        color: 'bg-blue-500',
        confidence: 91
      },
      {
        title: 'Weekly Forecast',
        value: `${userData.completedTasks.filter(t => t.day > userData.currentDay - 7).length} tasks`,
        change: 'Last 7 days',
        icon: Activity,
        color: 'bg-purple-500',
        confidence: 89
      },
      {
        title: 'Streak Momentum',
        value: userData.streakDays > 7 ? 'Strong' : 'Building',
        change: `${userData.streakDays} day streak`,
        icon: Flame,
        color: 'bg-orange-500',
        confidence: 96
      }
    ];
  };

  const calculateRadarData = () => {
    const categories = userData.completedTasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    return [
      { metric: 'Cardio', value: Math.min((categories.cardio || 0) * 15, 100), fullMark: 100 },
      { metric: 'Strength', value: Math.min((categories.strength || 0) * 15, 100), fullMark: 100 },
      { metric: 'Flexibility', value: Math.min((categories.flexibility || 0) * 20, 100), fullMark: 100 },
      { metric: 'Wellness', value: Math.min((categories.wellness || 0) * 25, 100), fullMark: 100 },
      { metric: 'Consistency', value: Math.min(userData.streakDays * 8, 100), fullMark: 100 }
    ];
  };

  const generatePersonalizedGuidance = () => {
    const tasksByTime = userData.completedTasks.reduce((acc, task) => {
      const hour = parseInt(task.time.split(':')[0]);
      const period = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
      acc[period] = (acc[period] || 0) + 1;
      return acc;
    }, {});

    const bestTime = Object.entries(tasksByTime).sort((a, b) => b[1] - a[1])[0];
    const categories = userData.completedTasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    const guidance = [];

    // Time-based recommendation
    if (bestTime) {
      guidance.push({
        category: 'Optimal Performance Window',
        recommendation: `You've completed ${bestTime[1]} tasks in the ${bestTime[0]}. This is your peak productivity time. Schedule your most challenging workouts during this window for maximum results.`,
        confidence: 92,
        priority: 'high',
        action: `Plan tomorrow's ${bestTime[0]} workout now`
      });
    }

    // Sleep recommendation
    if (userData.avgSleepHours < 7) {
      guidance.push({
        category: 'Recovery Enhancement',
        recommendation: `Your average sleep is ${userData.avgSleepHours} hours. Research shows 7-9 hours optimizes recovery and performance by up to 30%. You're missing critical recovery time.`,
        confidence: 95,
        priority: 'high',
        action: 'Set a bedtime alarm for 10:30 PM tonight'
      });
    }

    // Category balance
    const weakestCategory = Object.entries(categories).sort((a, b) => a[1] - b[1])[0];
    if (weakestCategory) {
      const categoryNames = {
        cardio: 'cardiovascular endurance',
        strength: 'muscle building',
        flexibility: 'mobility and injury prevention',
        wellness: 'stress management and mental health'
      };
      guidance.push({
        category: 'Training Balance',
        recommendation: `You've focused less on ${weakestCategory[0]} activities. For optimal health, include more ${categoryNames[weakestCategory[0]]} exercises. This addresses a key gap in your routine.`,
        confidence: 88,
        priority: 'medium',
        action: `Add one ${weakestCategory[0]} task this week`
      });
    }

    // Streak motivation
    if (userData.streakDays >= 7) {
      guidance.push({
        category: 'Momentum Building',
        recommendation: `Impressive ${userData.streakDays}-day streak! You're in the top 15% of users. Maintaining this consistency will lead to lasting habit formation within 66 days.`,
        confidence: 97,
        priority: 'low',
        action: 'Keep it going - don\'t break the chain!'
      });
    }

    return guidance;
  };

  const calculateCategoryDistribution = () => {
    const categories = userData.completedTasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));
  };

  const performanceData = calculatePerformanceData();
  const healthScoreData = calculateHealthScore();
  const wellnessMetrics = calculateWellnessMetrics();
  const timePatternData = calculateTimePatterns();
  const keyIndicators = calculateKeyIndicators();
  const radarData = calculateRadarData();
  const aiGuidance = generatePersonalizedGuidance();
  const categoryDistribution = calculateCategoryDistribution();

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-red-400 bg-red-50';
      case 'medium': return 'border-yellow-400 bg-yellow-50';
      case 'low': return 'border-blue-400 bg-blue-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return AlertTriangle;
      case 'medium': return AlertCircle;
      case 'low': return CheckCircle;
      default: return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Health Analytics
              </h1>
              <p className="text-gray-600 text-lg">
                Your personalized insights powered by real data
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-4 mb-2">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Level</div>
                  <div className="text-2xl font-bold text-indigo-600">{userData.level}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Streak</div>
                  <div className="text-2xl font-bold text-orange-500 flex items-center">
                    <Flame className="w-5 h-5 mr-1" />
                    {userData.streakDays}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Tasks Completed</div>
              <div className="text-2xl font-bold text-gray-900">{userData.completedTasks.length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Minutes</div>
              <div className="text-2xl font-bold text-gray-900">{userData.totalWorkoutMinutes}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Total Steps</div>
              <div className="text-2xl font-bold text-gray-900">{userData.totalSteps.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-1">Coins Earned</div>
              <div className="text-2xl font-bold text-gray-900">{userData.coins}</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6 bg-white rounded-lg p-1 shadow-sm">
          {['overview', 'trends', 'guidance', 'insights'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {keyIndicators.map((indicator, idx) => {
                const Icon = indicator.icon;
                return (
                  <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${indicator.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">AI Confidence</div>
                        <div className="text-sm font-bold text-indigo-600">{indicator.confidence}%</div>
                      </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium mb-2">{indicator.title}</h3>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{indicator.value}</div>
                    <div className="text-sm text-gray-600">{indicator.change}</div>
                  </div>
                );
              })}
            </div>

            {/* Activity Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Activity Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Health Profile</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                    <Radar name="Your Score" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Completed Tasks</h3>
              <div className="space-y-2">
                {userData.completedTasks.slice(-5).reverse().map((task, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">{task.name}</div>
                        <div className="text-sm text-gray-500">Day {task.day} • {task.time} • {task.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-blue-600 font-medium">+{task.coins} coins</span>
                      <span className="text-gray-600">+{task.xp} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" tick={{ fill: '#6b7280' }} />
                  <YAxis tick={{ fill: '#6b7280' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={3} name="Your Performance" />
                  <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
                  <Line type="monotone" dataKey="baseline" stroke="#9ca3af" strokeWidth={2} name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Daily Health Score</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={healthScoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fill: '#6b7280' }} />
                  <YAxis tick={{ fill: '#6b7280' }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="upper" stackId="1" stroke="#c7d2fe" fill="#c7d2fe" name="Upper Bound" />
                  <Area type="monotone" dataKey="score" stackId="2" stroke="#6366f1" fill="#6366f1" name="Health Score" />
                  <Area type="monotone" dataKey="lower" stackId="3" stroke="#e0e7ff" fill="#e0e7ff" name="Lower Bound" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Wellness Metrics Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={wellnessMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fill: '#6b7280' }} />
                  <YAxis tick={{ fill: '#6b7280' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="energy" stroke="#f59e0b" strokeWidth={2} name="Energy" />
                  <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Stress" />
                  <Line type="monotone" dataKey="recovery" stroke="#6366f1" strokeWidth={2} name="Recovery" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Peak Performance Times</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timePatternData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" tick={{ fill: '#6b7280' }} />
                  <YAxis tick={{ fill: '#6b7280' }} />
                  <Tooltip />
                  <Bar dataKey="performance" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-indigo-600 mr-2" />
                  <span className="text-sm font-medium text-indigo-900">
                    Based on your completed tasks, you perform best during these hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Guidance Tab */}
        {activeTab === 'guidance' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white mb-6">
              <div className="flex items-center mb-2">
                <Brain className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Your Personalized AI Guidance</h2>
              </div>
              <p className="text-indigo-100">
                Based on your {userData.completedTasks.length} completed tasks and {userData.streakDays}-day streak
              </p>
            </div>

            {aiGuidance.map((guide, idx) => {
              const PriorityIcon = getPriorityIcon(guide.priority);
              return (
                <div key={idx} className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${getPriorityColor(guide.priority)}`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${guide.priority === 'high' ? 'bg-red-100' : guide.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'} mr-3`}>
                          <PriorityIcon className={`w-5 h-5 ${guide.priority === 'high' ? 'text-red-600' : guide.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{guide.category}</h3>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${guide.priority === 'high' ? 'bg-red-100 text-red-700' : guide.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                            {guide.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">AI Confidence</div>
                        <div className="text-2xl font-bold text-indigo-600">{guide.confidence}%</div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 text-base leading-relaxed">{guide.recommendation}</p>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Action Step</div>
                          <div className="text-sm font-medium text-gray-900">{guide.action}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Deep Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Task Completion Rate</span>
                      <span className="text-sm font-bold text-indigo-600">
                        {Math.round((userData.completedTasks.length / userData.currentDay) * 100)}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${(userData.completedTasks.length / userData.currentDay) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Journey Progress</span>
                      <span className="text-sm font-bold text-indigo-600">
                        {Math.round((userData.currentDay / userData.totalDays) * 100)}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${(userData.currentDay / userData.totalDays) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Achievement Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="text-sm text-gray-600 mb-1">Avg. Tasks/Day</div>
                    <div className="text-3xl font-bold text-green-600">
                      {(userData.completedTasks.length / userData.currentDay).toFixed(1)}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <div className="text-sm text-gray-600 mb-1">Total XP Earned</div>
                    <div className="text-3xl font-bold text-blue-600">{userData.xp}</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                    <div className="text-sm text-gray-600 mb-1">Streak Days</div>
                    <div className="text-3xl font-bold text-orange-600">{userData.streakDays}</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                    <div className="text-sm text-gray-600 mb-1">Level</div>
                    <div className="text-3xl font-bold text-purple-600">{userData.level}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Health Milestones Achieved</h3>
              <div className="space-y-3">
                {[
                  { title: 'Week Warrior', desc: 'Completed 7 consecutive days', achieved: userData.streakDays >= 7, icon: Flame },
                  { title: 'Task Master', desc: 'Completed 15+ tasks', achieved: userData.completedTasks.length >= 15, icon: Trophy },
                  { title: 'Level Up', desc: 'Reached Level 5', achieved: userData.level >= 5, icon: Target },
                  { title: 'Consistency King', desc: '10+ day streak', achieved: userData.streakDays >= 10, icon: Calendar }
                ].map((milestone, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-lg border ${milestone.achieved ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${milestone.achieved ? 'bg-green-100' : 'bg-gray-200'}`}>
                        <milestone.icon className={`w-5 h-5 ${milestone.achieved ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <div className={`font-medium ${milestone.achieved ? 'text-gray-900' : 'text-gray-500'}`}>{milestone.title}</div>
                        <div className="text-sm text-gray-500">{milestone.desc}</div>
                      </div>
                    </div>
                    {milestone.achieved ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <div className="text-sm text-gray-400">Locked</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Task Completion Timeline</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-4">
                  {userData.completedTasks.slice(-10).reverse().map((task, idx) => (
                    <div key={idx} className="relative pl-10 pb-4">
                      <div className="absolute left-2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white"></div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">{task.name}</div>
                            <div className="text-sm text-gray-500">Day {task.day} • {task.time}</div>
                          </div>
                          <div className="text-xs text-gray-500">{task.duration}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Analytics updated in real-time based on your activity</p>
          <p className="mt-2">Data from {userData.completedTasks.length} completed tasks over {userData.currentDay} days</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedHealthDashboard;