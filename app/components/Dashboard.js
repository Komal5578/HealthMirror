'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import useStore from '../store/useStore';
import { 
  CheckCircle, 
  XCircle, 
  Coins, 
  Trophy, 
  Calendar, 
  Flame, 
  Target,
  ShoppingBag,
  BarChart3,
  Clock,
  ArrowRight,
  Settings,
  Heart,
  X,
  Play,
  Info,
  Dumbbell,
  Footprints,
  Timer,
  AlertCircle,
  Lightbulb,
  TrendingUp,
  Eye,
  Activity
} from 'lucide-react';

const Avatar3D = dynamic(() => import('./Avatar3D'), { 
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  )
});

const FutureSelfPreview = dynamic(() => import('./FutureSelfPreview'), { 
  ssr: false 
});

const ChatWidget = dynamic(() => import('./ChatWidget'), { 
  ssr: false 
});

export default function Dashboard() {
  const { 
    guiderName, 
    guiderLevel, 
    guiderXP, 
    coins, 
    currentDay, 
    selectedPlan,
    healthGoal,
    dailyTasks,
    completedTasks,
    streakDays,
    totalSteps,
    totalWorkoutMinutes,
    completeTask,
    failTask,
    advanceDay,
    setStep,
    resetAll,
    healthScore,
    bodyState,
    vitalSigns,
    updateHealthMetrics
  } = useStore();
  
  const [activeTab, setActiveTab] = useState('tasks');
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showFuturePreview, setShowFuturePreview] = useState(false);
  
  // Count completed tasks from dailyTasks (more reliable trigger)
  const completedCount = dailyTasks.filter(t => t.completed).length;
  
  // Update health metrics when tasks change
  useEffect(() => {
    if (updateHealthMetrics) {
      updateHealthMetrics();
    }
  }, [completedTasks.length, completedCount, currentDay, updateHealthMetrics]);
  
  const maxXP = guiderLevel * 100;
  const xpProgress = (guiderXP / maxXP) * 100;
  const daysRemaining = selectedPlan ? selectedPlan.days - currentDay + 1 : 0;
  const progress = selectedPlan ? ((currentDay - 1) / selectedPlan.days) * 100 : 0;
  const allTasksCompleted = dailyTasks.length > 0 && dailyTasks.every(t => t.completed);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/logo-m.svg" alt="HealthMirror Logo" width={36} height={36} className="w-12 h-12" />
              <h1 className="text-xl font-medium text-gray-900">HealthMirror</h1>
              <span className="hidden md:inline-block text-sm text-gray-500 ml-4">{guiderName}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-6 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{coins}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">{streakDays} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Level {guiderLevel}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowConfirmReset(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Avatar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="text-center mb-6">
                <h2 className="text-xl font-medium text-gray-900">{guiderName}</h2>
                <p className="text-gray-500 text-sm mt-1">Your Health Companion</p>
              </div>
              
              <Avatar3D height="350px" />
              
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-900 font-medium flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-blue-600" />
                    Level {guiderLevel}
                  </span>
                  <span className="text-gray-500 text-sm">{guiderXP}/{maxXP} XP</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep('shop')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Customize
                </button>
                <button
                  onClick={() => setShowFuturePreview(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  Future Self
                </button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-gray-900 font-medium mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Health Metrics
              </h3>
              
              {/* Vital Signs */}
              <div className="space-y-3 mb-4">
                {[
                  { key: 'energyLevel', label: 'Energy', color: 'yellow' },
                  { key: 'muscleStrength', label: 'Strength', color: 'red' },
                  { key: 'heartHealth', label: 'Heart', color: 'pink' },
                  { key: 'flexibility', label: 'Flexibility', color: 'purple' },
                  { key: 'mentalWellness', label: 'Mental', color: 'blue' },
                ].map(({ key, label, color }) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-16">{label}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 bg-${color}-500`}
                        style={{ 
                          width: `${vitalSigns?.[key] || 50}%`,
                          backgroundColor: color === 'yellow' ? '#eab308' : 
                                          color === 'red' ? '#ef4444' : 
                                          color === 'pink' ? '#ec4899' : 
                                          color === 'purple' ? '#a855f7' : '#3b82f6'
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700 w-8">{vitalSigns?.[key] || 50}%</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-2xl font-semibold text-gray-900">{streakDays}</p>
                  <p className="text-gray-500 text-xs mt-1">Day Streak</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-semibold text-gray-900">{completedTasks.length}</p>
                  <p className="text-gray-500 text-xs mt-1">Tasks Done</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-semibold text-gray-900">{totalWorkoutMinutes}</p>
                  <p className="text-gray-500 text-xs mt-1">Minutes</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <Activity className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-semibold text-gray-900">{totalSteps}</p>
                  <p className="text-gray-500 text-xs mt-1">Steps</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Tasks */}
          <div className="lg:col-span-7 space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{healthGoal?.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{selectedPlan?.name} - {daysRemaining} days remaining</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Day {currentDay}
                </div>
              </div>
              
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Day 1</span>
                <span className="text-blue-600 font-medium">{Math.round(progress)}% Complete</span>
                <span>Day {selectedPlan?.days}</span>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  activeTab === 'tasks' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Today's Tasks
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  activeTab === 'history' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                History
              </button>
            </div>
            
            {/* Tasks List */}
            {activeTab === 'tasks' && (
              <div className="space-y-3">
                {dailyTasks.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
                    <h3 className="text-gray-900 font-medium text-xl mb-2">No tasks yet</h3>
                    <p className="text-gray-500">Your daily tasks will appear here</p>
                  </div>
                ) : (
                  <>
                    {dailyTasks.map((task) => (
                      <div 
                        key={task.id}
                        className={`bg-white rounded-xl p-5 border transition-all cursor-pointer ${
                          task.completed 
                            ? 'border-green-300 bg-green-50' 
                            : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                        onClick={() => !task.completed && setSelectedTask(task)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className={`font-medium ${task.completed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                              {task.name}
                            </h4>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="text-gray-500">
                                {task.duration}
                              </span>
                              <span className="text-blue-600">
                                +{task.coins}
                              </span>
                              <span className="text-gray-600">+{task.xp} XP</span>
                            </div>
                          </div>
                          
                          {!task.completed && (
                            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => completeTask(task.id)}
                                className="p-2.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors border border-green-200"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => failTask(task.id)}
                                className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-200"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                          
                          {task.completed && (
                            <div className="p-2.5 bg-green-100 text-green-600 rounded-lg">
                              <CheckCircle className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {allTasksCompleted && (
                      <button
                        onClick={advanceDay}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition-colors"
                      >
                        Continue to Day {currentDay + 1}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
            
            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Completed Tasks</h4>
                {completedTasks.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No completed tasks yet</p>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {completedTasks.slice(-10).reverse().map((task, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="text-gray-900 font-medium">{task.name}</p>
                          <p className="text-gray-500 text-sm">Day {task.completedDay}</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-blue-600">+{task.coins} coins</span>
                          <span className="text-gray-600">+{task.xp} XP</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Reset Progress?</h3>
            <p className="text-gray-600 mb-6">This will reset all your progress and start over. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAll();
                  setShowConfirmReset(false);
                }}
                className="flex-1 py-3 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Task Info Modal */}
      {selectedTask && (
        <TaskInfoModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)}
          onComplete={() => {
            completeTask(selectedTask.id);
            setSelectedTask(null);
          }}
          onFail={() => {
            failTask(selectedTask.id);
            setSelectedTask(null);
          }}
        />
      )}
      
      {/* Future Self Preview Modal */}
      {showFuturePreview && (
        <FutureSelfPreview onClose={() => setShowFuturePreview(false)} />
      )}
      
      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}

// Task instructions database
const taskInstructions = {
  // Weight Loss Tasks
  'Morning Walk': {
    description: 'A brisk morning walk to kickstart your metabolism and burn calories.',
    steps: [
      'Put on comfortable walking shoes',
      'Warm up with 2 minutes of light stretching',
      'Walk at a brisk pace (you should be able to talk but not sing)',
      'Maintain good posture - head up, shoulders back',
      'Swing your arms naturally for extra calorie burn',
      'Cool down with slow walking for the last 3 minutes'
    ],
    tips: [
      'Walk before breakfast for maximum fat burning',
      'Stay hydrated - drink water before and after',
      'Track your steps with your phone or smartwatch'
    ],
    benefits: ['Burns 150-200 calories', 'Boosts mood and energy', 'Improves cardiovascular health'],
    difficulty: 'Easy',
    muscleGroups: ['Legs', 'Core', 'Cardiovascular system']
  },
  'HIIT Workout': {
    description: 'High-Intensity Interval Training for maximum calorie burn in minimum time.',
    steps: [
      'Warm up for 3 minutes (jumping jacks, high knees)',
      'Exercise 1: Burpees - 30 seconds work, 15 seconds rest',
      'Exercise 2: Mountain climbers - 30 seconds work, 15 seconds rest',
      'Exercise 3: Jump squats - 30 seconds work, 15 seconds rest',
      'Exercise 4: High knees - 30 seconds work, 15 seconds rest',
      'Repeat the circuit 3-4 times',
      'Cool down with stretching for 3 minutes'
    ],
    tips: [
      'Give maximum effort during work periods',
      'Modify exercises if needed (step instead of jump)',
      'Don\'t skip the warm-up to prevent injury'
    ],
    benefits: ['Burns calories even after workout', 'Improves endurance', 'No equipment needed'],
    difficulty: 'Hard',
    muscleGroups: ['Full body', 'Core', 'Cardiovascular system']
  },
  'Low-calorie meal prep': {
    description: 'Prepare healthy, portion-controlled meals for the day.',
    steps: [
      'Plan your meals with lean protein, vegetables, and whole grains',
      'Measure portions using your hand as a guide',
      'Cook proteins with minimal oil (grilling, baking, steaming)',
      'Fill half your plate with non-starchy vegetables',
      'Pre-portion snacks into small containers',
      'Store meals in the fridge for easy access'
    ],
    tips: [
      'Prep on weekends for the entire week',
      'Use herbs and spices for flavor instead of salt',
      'Keep healthy snacks visible and accessible'
    ],
    benefits: ['Controls portions', 'Saves money', 'Reduces decision fatigue'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Nutrition task']
  },
  'Track calorie intake': {
    description: 'Log your food intake to stay aware of your calorie consumption.',
    steps: [
      'Download a calorie tracking app (MyFitnessPal, etc.)',
      'Log everything you eat and drink',
      'Measure portions accurately using kitchen scale if possible',
      'Review your daily totals at the end of the day',
      'Identify areas for improvement'
    ],
    tips: [
      'Log meals as you eat them, not later',
      'Take photos of meals for reference',
      'Focus on consistency, not perfection'
    ],
    benefits: ['Increases awareness', 'Identifies patterns', 'Supports weight loss goals'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Tracking task']
  },
  'Evening jog': {
    description: 'An evening jog to burn calories and release stress from the day.',
    steps: [
      'Wait at least 1-2 hours after eating',
      'Warm up with 3 minutes of brisk walking',
      'Start with a light jog, gradually increase pace',
      'Find a comfortable rhythm you can maintain',
      'Focus on your breathing - in through nose, out through mouth',
      'Cool down with walking and stretching'
    ],
    tips: [
      'Wear reflective gear if jogging in low light',
      'Listen to music or podcasts for motivation',
      'Don\'t push too hard - you should be able to hold a conversation'
    ],
    benefits: ['Burns 250-350 calories', 'Reduces evening stress', 'Improves sleep quality'],
    difficulty: 'Medium',
    muscleGroups: ['Legs', 'Core', 'Cardiovascular system']
  },
  
  // Muscle Gain Tasks
  'Strength Training': {
    description: 'Comprehensive strength workout to build muscle and increase strength.',
    steps: [
      'Warm up for 5 minutes (light cardio + dynamic stretches)',
      'Start with compound exercises (squats, deadlifts, bench press)',
      'Perform 3-4 sets of 8-12 reps per exercise',
      'Rest 60-90 seconds between sets',
      'Progress to isolation exercises (bicep curls, tricep extensions)',
      'End with core work (planks, crunches)',
      'Cool down with static stretching'
    ],
    tips: [
      'Focus on form over weight',
      'Progressive overload - gradually increase weight or reps',
      'Breathe out during exertion, in during rest phase'
    ],
    benefits: ['Builds muscle mass', 'Increases metabolism', 'Strengthens bones'],
    difficulty: 'Hard',
    muscleGroups: ['Full body', 'Depends on exercises chosen']
  },
  'Push-ups & Pull-ups': {
    description: 'Classic upper body exercises for building chest, back, and arm strength.',
    steps: [
      'Push-ups: Start in plank position, hands shoulder-width apart',
      'Lower chest to floor, keeping body straight',
      'Push back up to starting position',
      'Do 3 sets of 10-15 reps (modify on knees if needed)',
      'Pull-ups: Grip bar with palms facing away, hands wider than shoulders',
      'Pull yourself up until chin is above bar',
      'Lower with control - 3 sets of 5-10 reps',
      'Use resistance bands for assistance if needed'
    ],
    tips: [
      'Keep core tight throughout movements',
      'Don\'t let hips sag during push-ups',
      'Use negative pull-ups if you can\'t do full ones yet'
    ],
    benefits: ['Builds chest and back', 'Strengthens arms', 'No equipment needed for push-ups'],
    difficulty: 'Medium',
    muscleGroups: ['Chest', 'Back', 'Shoulders', 'Arms', 'Core']
  },
  'Core workout': {
    description: 'Targeted exercises to strengthen your abdominal and back muscles.',
    steps: [
      'Plank: Hold for 30-60 seconds, keep body straight',
      'Crunches: 3 sets of 15-20 reps, lift shoulders off ground',
      'Bicycle crunches: 3 sets of 20 reps (10 each side)',
      'Russian twists: 3 sets of 20 reps with or without weight',
      'Leg raises: 3 sets of 10-15 reps',
      'Mountain climbers: 30 seconds, 3 sets'
    ],
    tips: [
      'Engage your core by pulling belly button to spine',
      'Don\'t pull on your neck during crunches',
      'Breathe steadily throughout exercises'
    ],
    benefits: ['Improves posture', 'Supports spine health', 'Enhances athletic performance'],
    difficulty: 'Medium',
    muscleGroups: ['Abs', 'Obliques', 'Lower back', 'Hip flexors']
  },
  'Protein-rich breakfast': {
    description: 'Start your day with a high-protein meal to fuel muscle growth.',
    steps: [
      'Include 20-30g of protein in your breakfast',
      'Options: eggs, Greek yogurt, protein shake, cottage cheese',
      'Add complex carbs for energy (oats, whole wheat toast)',
      'Include healthy fats (avocado, nuts)',
      'Prepare the night before for easy morning routine'
    ],
    tips: [
      'Eat within 1 hour of waking for best results',
      'Vary protein sources throughout the week',
      'Add vegetables for extra nutrients'
    ],
    benefits: ['Supports muscle recovery', 'Keeps you full longer', 'Stabilizes blood sugar'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Nutrition task']
  },
  'Stretching routine': {
    description: 'Flexibility exercises to improve range of motion and prevent injury.',
    steps: [
      'Neck stretches: Tilt head side to side, hold 15 seconds each',
      'Shoulder rolls: 10 forward, 10 backward',
      'Chest stretch: Clasp hands behind back, lift arms',
      'Hamstring stretch: Sit and reach for toes, hold 30 seconds',
      'Quad stretch: Stand on one leg, pull foot to glutes',
      'Hip flexor stretch: Lunge position, push hips forward',
      'Hold each stretch for 20-30 seconds'
    ],
    tips: [
      'Never bounce during stretches',
      'Stretch to the point of mild tension, not pain',
      'Breathe deeply and relax into each stretch'
    ],
    benefits: ['Prevents injury', 'Reduces muscle soreness', 'Improves flexibility'],
    difficulty: 'Easy',
    muscleGroups: ['Full body flexibility']
  },
  
  // Cardio Health Tasks
  'Brisk Walking': {
    description: 'A faster-paced walk to get your heart pumping and improve cardiovascular fitness.',
    steps: [
      'Wear supportive walking shoes',
      'Start with normal walking pace for 3 minutes',
      'Increase speed until slightly breathless but can still talk',
      'Maintain brisk pace for most of the session',
      'Swing arms naturally to increase intensity',
      'Slow down for final 3-5 minutes to cool down'
    ],
    tips: [
      'Aim for 100-130 steps per minute for brisk pace',
      'Use interval training: alternate fast and normal pace',
      'Track your progress with a fitness watch'
    ],
    benefits: ['Improves heart health', 'Low impact on joints', 'Can be done anywhere'],
    difficulty: 'Easy',
    muscleGroups: ['Legs', 'Core', 'Cardiovascular system']
  },
  'Cycling': {
    description: 'Low-impact cardio exercise that strengthens legs and improves heart health.',
    steps: [
      'Adjust seat height - leg should be slightly bent at bottom of pedal stroke',
      'Warm up with 5 minutes of easy cycling',
      'Increase intensity to moderate effort',
      'Include some hills or resistance for extra challenge',
      'Maintain good posture - slight forward lean, relaxed shoulders',
      'Cool down with easy spinning for 5 minutes'
    ],
    tips: [
      'Keep cadence between 60-90 RPM',
      'Stay hydrated on longer rides',
      'Wear a helmet for outdoor cycling'
    ],
    benefits: ['Low joint impact', 'Builds leg strength', 'Great for heart health'],
    difficulty: 'Medium',
    muscleGroups: ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes']
  },
  'Swimming': {
    description: 'Full-body workout that\'s gentle on joints while building cardio fitness.',
    steps: [
      'Warm up with 2-4 easy laps of any stroke',
      'Practice proper breathing technique for your stroke',
      'Alternate between different strokes for variety',
      'Include some faster intervals for cardio benefit',
      'Focus on form rather than speed',
      'Cool down with easy laps and stretching in the pool'
    ],
    tips: [
      'If new to swimming, consider taking lessons',
      'Use a kickboard to focus on leg technique',
      'Goggles help with comfort and vision'
    ],
    benefits: ['Zero impact on joints', 'Full body workout', 'Great for all fitness levels'],
    difficulty: 'Medium',
    muscleGroups: ['Full body', 'Core', 'Cardiovascular system']
  },
  'Heart rate monitoring': {
    description: 'Track your heart rate to ensure you\'re exercising in the right zone.',
    steps: [
      'Find your resting heart rate first thing in the morning',
      'Calculate target zones: 50-70% max HR for moderate, 70-85% for vigorous',
      'Max HR = 220 minus your age',
      'Wear a heart rate monitor during exercise',
      'Aim for the zone that matches your goal',
      'Log your readings for progress tracking'
    ],
    tips: [
      'Check heart rate when you wake up for accurate resting rate',
      'Chest straps are more accurate than wrist monitors',
      'Recovery heart rate (how fast it drops) indicates fitness level'
    ],
    benefits: ['Ensures effective workouts', 'Prevents overtraining', 'Tracks fitness improvement'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Monitoring task']
  },
  'Meditation': {
    description: 'Calming practice to reduce stress and improve heart health through relaxation.',
    steps: [
      'Find a quiet, comfortable place to sit',
      'Set a timer for 15 minutes',
      'Close your eyes and focus on your breath',
      'Breathe slowly - 4 counts in, hold 2, exhale 6',
      'When mind wanders, gently return focus to breath',
      'End by slowly opening eyes and stretching'
    ],
    tips: [
      'Use apps like Headspace or Calm for guidance',
      'Start with just 5 minutes if 15 feels too long',
      'Consistency is more important than duration'
    ],
    benefits: ['Reduces blood pressure', 'Lowers stress hormones', 'Improves emotional wellbeing'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Mental wellness task']
  },
  
  // Diabetes Management Tasks
  'Blood sugar check': {
    description: 'Regular monitoring to keep blood glucose levels in check.',
    steps: [
      'Wash and dry hands thoroughly',
      'Insert test strip into glucose meter',
      'Use lancet to prick finger on the side (less painful)',
      'Apply blood drop to test strip',
      'Wait for reading and record the result',
      'Log time, reading, and any relevant notes (meals, exercise, etc.)'
    ],
    tips: [
      'Rotate finger prick locations to avoid soreness',
      'Check at consistent times for accurate trends',
      'Share logs with your healthcare provider'
    ],
    benefits: ['Helps manage diabetes', 'Identifies patterns', 'Prevents complications'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Health monitoring task']
  },
  'Low-GI meal prep': {
    description: 'Prepare meals with low glycemic index foods to manage blood sugar.',
    steps: [
      'Choose low-GI foods: vegetables, legumes, whole grains',
      'Include lean protein with every meal',
      'Use healthy fats like olive oil and nuts',
      'Prepare balanced portions using the plate method',
      'Cook grains al dente for lower GI',
      'Store prepped meals in portion-controlled containers'
    ],
    tips: [
      'Pair carbs with protein or fat to lower glycemic response',
      'Fiber-rich foods help slow glucose absorption',
      'Avoid processed foods and added sugars'
    ],
    benefits: ['Stabilizes blood sugar', 'Provides steady energy', 'Supports weight management'],
    difficulty: 'Medium',
    muscleGroups: ['N/A - Nutrition task']
  },
  'Light walking': {
    description: 'Gentle walking to help manage blood sugar levels.',
    steps: [
      'Walk at a comfortable, easy pace',
      'Aim for 10-15 minutes after meals',
      'Keep intensity low enough to hold a conversation easily',
      'Focus on consistency rather than speed',
      'Monitor how you feel throughout'
    ],
    tips: [
      'Post-meal walks help lower blood sugar spikes',
      'Carry a fast-acting glucose source just in case',
      'Stay hydrated before, during, and after'
    ],
    benefits: ['Helps lower blood sugar', 'Low impact and safe', 'Improves insulin sensitivity'],
    difficulty: 'Easy',
    muscleGroups: ['Legs', 'Cardiovascular system']
  },
  'Yoga session': {
    description: 'Gentle yoga to reduce stress and support overall health.',
    steps: [
      'Start with gentle breathing exercises',
      'Move through basic poses: cat-cow, child\'s pose, downward dog',
      'Hold each pose for 5-10 breaths',
      'Focus on gentle stretches, not intense poses',
      'Include balance poses like tree pose',
      'End with 5 minutes of relaxation in savasana'
    ],
    tips: [
      'Use props (blocks, straps) for support',
      'Listen to your body and modify as needed',
      'Yoga can help lower cortisol and blood sugar'
    ],
    benefits: ['Reduces stress', 'Improves flexibility', 'Supports blood sugar management'],
    difficulty: 'Easy',
    muscleGroups: ['Full body', 'Core', 'Flexibility']
  },
  'Hydration tracking': {
    description: 'Monitor water intake to stay properly hydrated throughout the day.',
    steps: [
      'Set a daily water goal (aim for 8-10 glasses)',
      'Track each glass or bottle you drink',
      'Use a water bottle with measurements',
      'Set reminders to drink water regularly',
      'Increase intake during exercise or hot weather'
    ],
    tips: [
      'Start your day with a glass of water',
      'Flavor with lemon or cucumber if plain is boring',
      'Urine should be light yellow - dark means drink more'
    ],
    benefits: ['Supports kidney function', 'Helps control appetite', 'Improves energy levels'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Hydration task']
  },
  
  // Stress & Anxiety Tasks
  'Guided Meditation': {
    description: 'Follow along with a guided session to reduce stress and anxiety.',
    steps: [
      'Find a quiet space and get comfortable',
      'Open a meditation app or YouTube guided session',
      'Put on headphones for better focus',
      'Follow the instructor\'s voice and breathing cues',
      'Let thoughts pass without judgment',
      'Slowly return to awareness when session ends'
    ],
    tips: [
      'Try different guides to find one you connect with',
      'Body scan meditations are great for beginners',
      'Even 5 minutes helps - start small'
    ],
    benefits: ['Reduces anxiety', 'Improves focus', 'Promotes emotional balance'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Mental wellness task']
  },
  'Deep breathing exercises': {
    description: 'Breathing techniques to activate your body\'s relaxation response.',
    steps: [
      '4-7-8 Breathing: Inhale for 4 counts',
      'Hold breath for 7 counts',
      'Exhale slowly for 8 counts',
      'Repeat 4-6 cycles',
      'Box breathing alternative: 4 counts each for inhale, hold, exhale, hold',
      'Practice in a comfortable seated position'
    ],
    tips: [
      'Breathe from your diaphragm, not your chest',
      'Place a hand on your belly to feel it rise and fall',
      'Use when feeling stressed or before sleep'
    ],
    benefits: ['Activates parasympathetic system', 'Lowers heart rate', 'Reduces anxiety instantly'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Breathing exercise']
  },
  'Journaling': {
    description: 'Write down thoughts and feelings to process emotions and reduce stress.',
    steps: [
      'Find a quiet moment with paper or digital journal',
      'Write freely without judging or editing',
      'Focus on how you\'re feeling right now',
      'Note any worries, then write possible solutions',
      'Include gratitude - list 3 things you\'re thankful for',
      'Review periodically to spot patterns'
    ],
    tips: [
      'Morning pages: write 3 pages right after waking',
      'Don\'t worry about grammar or spelling',
      'Try prompts if you\'re stuck (What am I stressed about?)'
    ],
    benefits: ['Processes emotions', 'Reduces rumination', 'Increases self-awareness'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Mental wellness task']
  },
  'Nature walk': {
    description: 'Walk outdoors in nature to reduce stress and improve mood.',
    steps: [
      'Find a park, trail, or green space near you',
      'Leave your phone on silent or at home',
      'Walk at a relaxed pace - no rush',
      'Engage your senses: notice colors, sounds, smells',
      'Practice "forest bathing" - mindfully absorb nature',
      'Spend at least 20-30 minutes outdoors'
    ],
    tips: [
      'Even urban parks provide benefits',
      'Morning light is especially beneficial',
      'Take a different route to keep it interesting'
    ],
    benefits: ['Reduces cortisol levels', 'Improves mood', 'Boosts immune system'],
    difficulty: 'Easy',
    muscleGroups: ['Legs', 'Cardiovascular system', 'Mental wellness']
  },
  'Sleep hygiene routine': {
    description: 'Pre-sleep routine to improve sleep quality and reduce anxiety.',
    steps: [
      'Set a consistent bedtime and stick to it',
      'Dim lights 1 hour before bed',
      'Put away all screens (phone, TV, computer)',
      'Take a warm shower or bath',
      'Do light stretching or read a book',
      'Keep bedroom cool, dark, and quiet',
      'Practice relaxation or breathing exercises in bed'
    ],
    tips: [
      'Avoid caffeine after 2 PM',
      'No heavy meals within 3 hours of bedtime',
      'Use white noise or sleep sounds if helpful'
    ],
    benefits: ['Improves sleep quality', 'Reduces next-day anxiety', 'Supports recovery'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Sleep wellness task']
  },
  
  // Back Pain Tasks
  'Gentle stretching': {
    description: 'Slow, careful stretches to relieve back tension and improve mobility.',
    steps: [
      'Cat-Cow: On hands and knees, arch and round your back slowly',
      'Child\'s pose: Sit back on heels, arms extended forward, hold 30 sec',
      'Knee-to-chest: Lie on back, hug one knee, then the other',
      'Supine twist: Knees to one side, shoulders flat, hold 20 sec each side',
      'Pelvic tilts: Lie on back, gently flatten lower back, then arch',
      'Move slowly and breathe deeply throughout'
    ],
    tips: [
      'Never force a stretch - pain means stop',
      'Warm up with light walking first',
      'Stretch both sides equally'
    ],
    benefits: ['Relieves tension', 'Improves flexibility', 'Reduces pain over time'],
    difficulty: 'Easy',
    muscleGroups: ['Lower back', 'Hip flexors', 'Hamstrings', 'Core']
  },
  'Core strengthening': {
    description: 'Build core muscles to support and protect your spine.',
    steps: [
      'Bird-dog: Extend opposite arm and leg, hold 5 sec, alternate',
      'Dead bug: Lie on back, extend opposite arm and leg, keep back flat',
      'Modified plank: Hold on forearms and knees for 20-30 seconds',
      'Bridge: Lie on back, lift hips, squeeze glutes, hold 10 sec',
      'Perform 10-12 reps of each, 2-3 sets',
      'Focus on keeping core engaged throughout'
    ],
    tips: [
      'Prioritize form over reps',
      'Stop if you feel back pain',
      'Progress slowly - consistency beats intensity'
    ],
    benefits: ['Supports spine', 'Reduces future back pain', 'Improves posture'],
    difficulty: 'Medium',
    muscleGroups: ['Core', 'Glutes', 'Lower back stabilizers']
  },
  'Posture exercises': {
    description: 'Exercises to correct posture and reduce back strain.',
    steps: [
      'Chin tucks: Pull chin straight back, hold 5 sec, repeat 10 times',
      'Shoulder blade squeeze: Pull shoulders back, squeeze blades together, hold 5 sec',
      'Wall angels: Back against wall, slide arms up and down like snow angel',
      'Doorway chest stretch: Hold doorframe, lean forward gently',
      'Practice sitting tall: Ears over shoulders over hips'
    ],
    tips: [
      'Set hourly reminders to check your posture',
      'Adjust workstation ergonomics',
      'Strengthen upper back to counter slouching'
    ],
    benefits: ['Reduces back strain', 'Prevents future pain', 'Improves appearance and confidence'],
    difficulty: 'Easy',
    muscleGroups: ['Upper back', 'Neck', 'Shoulders', 'Core']
  },
  'Heat therapy': {
    description: 'Apply heat to relax muscles and improve blood flow to sore areas.',
    steps: [
      'Use a heating pad, hot water bottle, or warm towel',
      'Apply to sore area for 15-20 minutes',
      'Keep temperature warm, not hot - avoid burns',
      'Relax completely during treatment',
      'Follow with gentle stretching if desired',
      'Can repeat 2-3 times daily as needed'
    ],
    tips: [
      'Heat is best for chronic pain and muscle tension',
      'Don\'t sleep with heating pad on',
      'Moist heat (warm towel) penetrates deeper'
    ],
    benefits: ['Relaxes muscles', 'Increases blood flow', 'Reduces stiffness'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Therapy task']
  },
  'Swimming or water walking': {
    description: 'Low-impact aquatic exercise that\'s gentle on the spine.',
    steps: [
      'Enter pool slowly using stairs or ladder',
      'For walking: walk forward, backward, and sideways in chest-deep water',
      'For swimming: use backstroke or gentle freestyle',
      'Focus on smooth, controlled movements',
      'Engage core to stabilize spine',
      'Stay in comfortable temperature water (83-88°F ideal)'
    ],
    tips: [
      'Water supports 90% of body weight',
      'Start with just 15-20 minutes',
      'Consider water aerobics classes'
    ],
    benefits: ['Zero-impact on joints', 'Strengthens muscles safely', 'Provides natural resistance'],
    difficulty: 'Easy',
    muscleGroups: ['Full body', 'Core', 'Back muscles']
  },
  
  // Flexibility Tasks
  'Morning Yoga': {
    description: 'Start your day with a yoga flow to increase flexibility and energy.',
    steps: [
      'Sun Salutation A: Mountain pose → forward fold → half lift → plank → chaturanga → upward dog → downward dog',
      'Hold downward dog for 5 breaths',
      'Warrior I and II on each side',
      'Triangle pose on each side',
      'Include balance poses like tree pose',
      'End with seated stretches and twists',
      'Finish in savasana for 2-3 minutes'
    ],
    tips: [
      'Practice on an empty stomach',
      'Use a yoga mat for cushioning and grip',
      'Modify poses as needed - use blocks and straps'
    ],
    benefits: ['Increases flexibility', 'Energizes body', 'Improves focus for the day'],
    difficulty: 'Medium',
    muscleGroups: ['Full body', 'Core', 'Flexibility focus']
  },
  'Dynamic stretching': {
    description: 'Active stretches with movement to warm up muscles and improve mobility.',
    steps: [
      'Leg swings: Forward/back and side to side, 10 each leg',
      'Arm circles: Small to large, forward and backward',
      'Walking lunges with twist: Step forward, rotate toward front leg',
      'High knees: Jog in place bringing knees to hip height',
      'Butt kicks: Jog in place, heels touching glutes',
      'Hip circles: Hands on hips, rotate hips in circles'
    ],
    tips: [
      'Do before workouts, not static stretches',
      'Keep movements controlled, not bouncy',
      'This prepares muscles better than static stretching'
    ],
    benefits: ['Prepares muscles for activity', 'Increases heart rate', 'Improves range of motion'],
    difficulty: 'Easy',
    muscleGroups: ['Full body', 'Joints and connective tissue']
  },
  'Pilates session': {
    description: 'Core-focused exercises to build strength and flexibility.',
    steps: [
      'The Hundred: Pump arms while holding legs in tabletop, breathe 100 pumps',
      'Roll Up: Slowly roll up from lying to seated position',
      'Single Leg Circles: Lie on back, circle one leg, repeat each side',
      'Swimming: Lie on stomach, flutter opposite arm and leg',
      'Spine Stretch Forward: Seated, round forward reaching past toes',
      'Side Leg Series: Lie on side, lift and lower leg in various directions'
    ],
    tips: [
      'Focus on controlled, precise movements',
      'Engage your powerhouse (core) throughout',
      'Quality over quantity'
    ],
    benefits: ['Builds core strength', 'Improves posture', 'Lengthens muscles'],
    difficulty: 'Medium',
    muscleGroups: ['Core', 'Full body', 'Flexibility']
  },
  'Foam rolling': {
    description: 'Self-massage technique to release muscle tension and improve flexibility.',
    steps: [
      'Roll slowly over target muscle group',
      'When you find a tender spot, pause and hold for 30-60 seconds',
      'Roll IT band: Side of thigh from hip to knee',
      'Roll quads: Front of thigh, slowly up and down',
      'Roll calves: Sit on roller, roll from ankle to knee',
      'Roll upper back: Lie on roller, support head, roll upper back'
    ],
    tips: [
      'Avoid rolling directly on joints or bones',
      'Breathe deeply and try to relax into tender spots',
      'Best done after workouts or before bed'
    ],
    benefits: ['Releases muscle knots', 'Improves blood flow', 'Speeds recovery'],
    difficulty: 'Easy',
    muscleGroups: ['Depends on area targeted', 'Fascia and connective tissue']
  },
  'Evening stretch routine': {
    description: 'End-of-day stretching to release tension and prepare for sleep.',
    steps: [
      'Neck stretches: Gently tilt head side to side and forward',
      'Shoulder and chest stretch: Clasp hands behind back, lift',
      'Seated forward fold: Sit with legs extended, reach for toes',
      'Butterfly stretch: Soles of feet together, press knees down gently',
      'Supine spinal twist: Lie on back, drop knees to each side',
      'Happy baby pose: Grab feet, rock gently side to side',
      'Hold each stretch 30-60 seconds'
    ],
    tips: [
      'Dim lights to signal relaxation to your body',
      'Stretch in comfortable, loose clothing',
      'Focus on deep, slow breathing'
    ],
    benefits: ['Releases day\'s tension', 'Prepares body for sleep', 'Improves next-day flexibility'],
    difficulty: 'Easy',
    muscleGroups: ['Full body', 'Focus on tight areas']
  },
  
  // General Fitness Tasks
  'Morning Run': {
    description: 'Start your day with a refreshing run to boost energy and metabolism.',
    steps: [
      'Warm up with 3-5 minutes of brisk walking',
      'Start running at a comfortable pace',
      'Focus on steady breathing and relaxed shoulders',
      'Maintain good posture - slight forward lean',
      'Aim for conversational pace for endurance',
      'Cool down with walking and stretching'
    ],
    tips: [
      'Eat a light snack 30-60 minutes before',
      'Stay hydrated before you head out',
      'Start slow if you\'re new to running'
    ],
    benefits: ['Boosts metabolism all day', 'Improves cardiovascular health', 'Enhances mood'],
    difficulty: 'Medium',
    muscleGroups: ['Legs', 'Core', 'Cardiovascular system']
  },
  'Bodyweight exercises': {
    description: 'Full-body workout using just your body weight.',
    steps: [
      'Warm up: 2 minutes of jumping jacks',
      'Squats: 3 sets of 15 reps',
      'Push-ups: 3 sets of 10-15 reps (modify on knees if needed)',
      'Lunges: 3 sets of 10 each leg',
      'Plank: Hold for 30-60 seconds, 3 sets',
      'Burpees: 3 sets of 8-10 (for cardio)',
      'Cool down with stretching'
    ],
    tips: [
      'Focus on form before adding difficulty',
      'Rest 30-60 seconds between sets',
      'Progress by adding reps or slowing movements'
    ],
    benefits: ['No equipment needed', 'Builds functional strength', 'Can do anywhere'],
    difficulty: 'Medium',
    muscleGroups: ['Full body', 'Core', 'Legs', 'Chest', 'Arms']
  },
  'Healthy meal prep': {
    description: 'Prepare nutritious, balanced meals for your fitness goals.',
    steps: [
      'Plan meals with protein, complex carbs, vegetables, and healthy fats',
      'Shop for fresh ingredients',
      'Batch cook proteins: chicken, fish, lean beef, tofu',
      'Prep vegetables: wash, chop, store',
      'Cook grains: rice, quinoa, sweet potatoes',
      'Portion into containers for easy grab-and-go'
    ],
    tips: [
      'Sunday prep sets you up for the week',
      'Keep it simple - 3-4 meals is enough variety',
      'Use a variety of colorful vegetables'
    ],
    benefits: ['Saves time during the week', 'Ensures healthy eating', 'Reduces food waste'],
    difficulty: 'Easy',
    muscleGroups: ['N/A - Nutrition task']
  },
  'Step count goal (8000)': {
    description: 'Stay active throughout the day by reaching your step goal.',
    steps: [
      'Wear a step tracker or use your phone',
      'Take walking breaks every hour',
      'Choose stairs over elevators',
      'Walk during phone calls',
      'Park farther away from destinations',
      'Take a short walk after meals',
      'Check progress throughout the day'
    ],
    tips: [
      '8,000 steps is about 4 miles/6.4 km',
      'Breaking it up throughout the day makes it easier',
      'Walking meetings boost productivity and steps'
    ],
    benefits: ['Burns 300-400 extra calories', 'Reduces sitting time', 'Improves heart health'],
    difficulty: 'Easy',
    muscleGroups: ['Legs', 'Cardiovascular endurance']
  },
  'Evening workout': {
    description: 'End-of-day workout to burn off stress and stay active.',
    steps: [
      'Choose workout based on energy: weights, cardio, or yoga',
      'Warm up for 5 minutes',
      'For strength: focus on 2-3 muscle groups',
      'For cardio: 20-30 minutes of moderate intensity',
      'For yoga: relaxing flow to wind down',
      'Cool down and stretch for 5-10 minutes'
    ],
    tips: [
      'Finish workout 2-3 hours before bed for best sleep',
      'Lower intensity than morning if energy is low',
      'This is a great stress reliever after work'
    ],
    benefits: ['Relieves work stress', 'Maintains fitness routine', 'Improves sleep quality'],
    difficulty: 'Medium',
    muscleGroups: ['Varies by workout type chosen']
  }
};

// Get task info or provide a generic template
function getTaskInfo(taskName) {
  if (taskInstructions[taskName]) {
    return taskInstructions[taskName];
  }
  
  // Generic fallback for tasks not in the database
  return {
    description: `Complete this task to earn coins and XP while working toward your health goals.`,
    steps: [
      'Read the task name and understand what\'s required',
      'Prepare any necessary equipment or space',
      'Complete the activity at your own pace',
      'Focus on proper form and technique',
      'Mark as complete when finished'
    ],
    tips: [
      'Stay hydrated throughout',
      'Listen to your body and rest if needed',
      'Consistency is more important than perfection'
    ],
    benefits: ['Supports your health goal', 'Earns rewards', 'Builds healthy habits'],
    difficulty: 'Varies',
    muscleGroups: ['Depends on activity']
  };
}

// Task Info Modal Component
function TaskInfoModal({ task, onClose, onComplete, onFail }) {
  const info = getTaskInfo(task.name);
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{task.name}</h2>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                <span>{task.duration}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  info.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  info.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  info.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {info.difficulty}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/80 rounded-xl transition-colors text-gray-500">
              Close
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-700">{info.description}</p>
          </div>
          
          {/* Rewards */}
          <div className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
            <div>
              <span className="font-medium text-gray-900">+{task.coins} Coins</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">+{task.xp} XP</span>
            </div>
          </div>
          
          {/* Steps */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">How to do it</h3>
            <div className="space-y-2">
              {info.steps.map((step, index) => (
                <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tips */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Pro Tips</h3>
            <div className="space-y-2">
              {info.tips.map((tip, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <span className="text-gray-400">•</span>
                  <p className="text-gray-600 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Benefits */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Benefits</h3>
            <div className="flex flex-wrap gap-2">
              {info.benefits.map((benefit, index) => (
                <span key={index} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm">
                  {benefit}
                </span>
              ))}
            </div>
          </div>
          
          {/* Muscle Groups */}
          {info.muscleGroups && info.muscleGroups[0] !== 'N/A - Nutrition task' && info.muscleGroups[0] !== 'N/A - Tracking task' && info.muscleGroups[0] !== 'N/A - Monitoring task' && info.muscleGroups[0] !== 'N/A - Mental wellness task' && info.muscleGroups[0] !== 'N/A - Breathing exercise' && info.muscleGroups[0] !== 'N/A - Sleep wellness task' && info.muscleGroups[0] !== 'N/A - Health monitoring task' && info.muscleGroups[0] !== 'N/A - Therapy task' && info.muscleGroups[0] !== 'N/A - Hydration task' && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Target Areas</h3>
              <div className="flex flex-wrap gap-2">
                {info.muscleGroups.map((muscle, index) => (
                  <span key={index} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={onFail}
            className="flex-1 px-4 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 font-medium transition-colors"
          >
            Skip Task
          </button>
          <button
            onClick={onComplete}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg font-medium transition-all"
          >
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
}
