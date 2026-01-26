'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Health goals and illnesses
export const healthGoals = [
  { id: 'weight_loss', name: 'Weight Loss', icon: '', description: 'Lose weight healthily' },
  { id: 'muscle_gain', name: 'Muscle Building', icon: '', description: 'Build strength and muscle' },
  { id: 'cardio_health', name: 'Heart Health', icon: '', description: 'Improve cardiovascular fitness' },
  { id: 'diabetes_management', name: 'Diabetes Management', icon: '', description: 'Control blood sugar levels' },
  { id: 'stress_anxiety', name: 'Stress & Anxiety', icon: '', description: 'Mental wellness and relaxation' },
  { id: 'back_pain', name: 'Back Pain Recovery', icon: '', description: 'Strengthen back and core' },
  { id: 'flexibility', name: 'Flexibility', icon: '', description: 'Improve range of motion' },
  { id: 'general_fitness', name: 'General Fitness', icon: '', description: 'Overall health improvement' },
];

// Plans with different intensities
export const plans = [
  { id: 'fast', name: 'Fast Plan', days: 30, intensity: 'High', color: 'from-red-500 to-orange-500', description: 'Intensive 30-day transformation' },
  { id: 'medium', name: 'Medium Plan', days: 60, intensity: 'Moderate', color: 'from-yellow-500 to-green-500', description: 'Balanced 60-day journey' },
  { id: 'slow', name: 'Slow Plan', days: 90, intensity: 'Steady', color: 'from-blue-500 to-purple-500', description: 'Gradual 90-day recovery' },
];

// Task templates based on goals
export const taskTemplates = {
  weight_loss: [
    { name: 'Morning Walk', duration: '30 min', coins: 10, xp: 15 },
    { name: 'Low-calorie meal prep', duration: '20 min', coins: 8, xp: 10 },
    { name: 'HIIT Workout', duration: '20 min', coins: 15, xp: 20 },
    { name: 'Track calorie intake', duration: '5 min', coins: 5, xp: 5 },
    { name: 'Evening jog', duration: '25 min', coins: 12, xp: 15 },
  ],
  muscle_gain: [
    { name: 'Strength Training', duration: '45 min', coins: 20, xp: 25 },
    { name: 'Protein-rich breakfast', duration: '15 min', coins: 8, xp: 10 },
    { name: 'Push-ups & Pull-ups', duration: '20 min', coins: 12, xp: 15 },
    { name: 'Core workout', duration: '15 min', coins: 10, xp: 12 },
    { name: 'Stretching routine', duration: '10 min', coins: 5, xp: 8 },
  ],
  cardio_health: [
    { name: 'Brisk Walking', duration: '40 min', coins: 15, xp: 18 },
    { name: 'Cycling', duration: '30 min', coins: 12, xp: 15 },
    { name: 'Swimming', duration: '30 min', coins: 15, xp: 20 },
    { name: 'Heart rate monitoring', duration: '5 min', coins: 5, xp: 5 },
    { name: 'Meditation', duration: '15 min', coins: 8, xp: 10 },
  ],
  diabetes_management: [
    { name: 'Blood sugar check', duration: '5 min', coins: 5, xp: 5 },
    { name: 'Low-GI meal prep', duration: '25 min', coins: 10, xp: 12 },
    { name: 'Light walking', duration: '30 min', coins: 12, xp: 15 },
    { name: 'Yoga session', duration: '20 min', coins: 10, xp: 12 },
    { name: 'Hydration tracking', duration: '5 min', coins: 5, xp: 5 },
  ],
  stress_anxiety: [
    { name: 'Guided Meditation', duration: '20 min', coins: 10, xp: 12 },
    { name: 'Deep breathing exercises', duration: '10 min', coins: 8, xp: 10 },
    { name: 'Journaling', duration: '15 min', coins: 8, xp: 10 },
    { name: 'Nature walk', duration: '30 min', coins: 12, xp: 15 },
    { name: 'Sleep hygiene routine', duration: '15 min', coins: 10, xp: 12 },
  ],
  back_pain: [
    { name: 'Gentle stretching', duration: '15 min', coins: 8, xp: 10 },
    { name: 'Core strengthening', duration: '20 min', coins: 12, xp: 15 },
    { name: 'Posture exercises', duration: '10 min', coins: 8, xp: 10 },
    { name: 'Heat therapy', duration: '20 min', coins: 5, xp: 8 },
    { name: 'Swimming or water walking', duration: '30 min', coins: 15, xp: 18 },
  ],
  flexibility: [
    { name: 'Morning Yoga', duration: '30 min', coins: 12, xp: 15 },
    { name: 'Dynamic stretching', duration: '15 min', coins: 8, xp: 10 },
    { name: 'Pilates session', duration: '30 min', coins: 15, xp: 18 },
    { name: 'Foam rolling', duration: '15 min', coins: 8, xp: 10 },
    { name: 'Evening stretch routine', duration: '20 min', coins: 10, xp: 12 },
  ],
  general_fitness: [
    { name: 'Morning Run', duration: '30 min', coins: 15, xp: 18 },
    { name: 'Bodyweight exercises', duration: '25 min', coins: 12, xp: 15 },
    { name: 'Healthy meal prep', duration: '20 min', coins: 10, xp: 10 },
    { name: 'Step count goal (8000)', duration: 'All day', coins: 15, xp: 20 },
    { name: 'Evening workout', duration: '30 min', coins: 15, xp: 18 },
  ],
};

// Shop items for avatar customization
export const shopItems = [
  { id: 'hat_cap', name: 'Sports Cap', price: 50, type: 'hat', color: '#FF6B6B' },
  { id: 'hat_beanie', name: 'Cozy Beanie', price: 60, type: 'hat', color: '#4ECDC4' },
  { id: 'hat_crown', name: 'Champion Crown', price: 200, type: 'hat', color: '#FFD700' },
  { id: 'glasses_cool', name: 'Cool Shades', price: 40, type: 'accessory', color: '#1A1A2E' },
  { id: 'glasses_heart', name: 'Heart Glasses', price: 45, type: 'accessory', color: '#FF69B4' },
  { id: 'shirt_red', name: 'Red Shirt', price: 30, type: 'shirt', color: '#FF4757' },
  { id: 'shirt_blue', name: 'Blue Shirt', price: 30, type: 'shirt', color: '#3742FA' },
  { id: 'shirt_green', name: 'Green Shirt', price: 30, type: 'shirt', color: '#2ED573' },
  { id: 'shirt_gold', name: 'Golden Jersey', price: 150, type: 'shirt', color: '#FFD700' },
  { id: 'pants_jeans', name: 'Blue Jeans', price: 35, type: 'pants', color: '#4834D4' },
  { id: 'pants_sporty', name: 'Sporty Pants', price: 40, type: 'pants', color: '#1A1A2E' },
  { id: 'shoes_sneakers', name: 'Running Sneakers', price: 55, type: 'shoes', color: '#FF6B6B' },
  { id: 'shoes_boots', name: 'Cool Boots', price: 70, type: 'shoes', color: '#8B4513' },
  { id: 'cape_hero', name: 'Hero Cape', price: 300, type: 'cape', color: '#9B59B6' },
  { id: 'wings_angel', name: 'Angel Wings', price: 500, type: 'wings', color: '#FFFFFF' },
];

const useStore = create(
  persist(
    (set, get) => ({
      // Onboarding state
      currentStep: 'welcome', // welcome, health-profile, age, plan, guider, dashboard
      
      // User profile
      userAge: null,
      healthGoal: null,
      selectedPlan: null,
      
      // Guider info
      guiderName: '',
      guiderAge: null,
      guiderLevel: 1,
      guiderXP: 0,
      guiderMood: 'happy', // happy, celebrating, neutral, sad, disappointed, crying
      
      // Guider email for reports
      guiderEmail: '',
      
      // Avatar customization
      avatarColor: '#FFB6C1',
      equippedItems: [],
      purchasedItems: [],
      
      // Game state
      coins: 100,
      currentDay: 1,
      startDate: null,
      failedTasksToday: 0,
      
      // Tasks
      dailyTasks: [],
      completedTasks: [],
      missedTasks: [],
      
      // Statistics
      totalSteps: 0,
      totalWorkoutMinutes: 0,
      streakDays: 0,
      
      // Actions
      setStep: (step) => set({ currentStep: step }),
      
      setUserAge: (age) => set({ userAge: age }),
      
      setHealthGoal: (goal) => set({ healthGoal: goal }),
      
      selectPlan: (plan) => set({ 
        selectedPlan: plan,
        startDate: new Date().toISOString(),
      }),
      
      setGuiderInfo: (name, age) => set({ 
        guiderName: name, 
        guiderAge: age 
      }),
      
      setGuiderEmail: (email) => set({ guiderEmail: email }),
      
      setAvatarColor: (color) => set({ avatarColor: color }),
      
      generateDailyTasks: () => {
        const { healthGoal, selectedPlan, currentDay } = get();
        if (!healthGoal || !selectedPlan) return;
        
        const templates = taskTemplates[healthGoal.id] || taskTemplates.general_fitness;
        const intensity = selectedPlan.id === 'fast' ? 4 : selectedPlan.id === 'medium' ? 3 : 2;
        
        // Select random tasks based on intensity
        const shuffled = [...templates].sort(() => 0.5 - Math.random());
        const selectedTasks = shuffled.slice(0, intensity).map((task, idx) => ({
          ...task,
          id: `day${currentDay}_task${idx}`,
          completed: false,
          day: currentDay,
        }));
        
        set({ dailyTasks: selectedTasks });
      },
      
      completeTask: (taskId) => {
        const { dailyTasks, completedTasks, coins, guiderXP, guiderLevel, failedTasksToday } = get();
        const task = dailyTasks.find(t => t.id === taskId);
        
        if (!task || task.completed) return;
        
        const newXP = guiderXP + task.xp;
        const xpForNextLevel = guiderLevel * 100;
        const levelUp = newXP >= xpForNextLevel;
        
        // Check how many tasks completed today
        const completedToday = dailyTasks.filter(t => t.completed).length + 1;
        const totalTasks = dailyTasks.length;
        
        // Set mood based on progress
        let newMood = 'happy';
        if (completedToday === totalTasks) {
          newMood = 'celebrating'; // All tasks done!
        }
        
        set({
          dailyTasks: dailyTasks.map(t => 
            t.id === taskId ? { ...t, completed: true } : t
          ),
          completedTasks: [...completedTasks, { ...task, completedAt: new Date().toISOString() }],
          coins: coins + task.coins,
          guiderXP: levelUp ? newXP - xpForNextLevel : newXP,
          guiderLevel: levelUp ? guiderLevel + 1 : guiderLevel,
          guiderMood: newMood,
        });
        
        // Return to neutral after celebration
        if (newMood === 'celebrating') {
          setTimeout(() => {
            set({ guiderMood: 'happy' });
          }, 3000);
        }
      },
      
      failTask: (taskId) => {
        const { dailyTasks, missedTasks, guiderLevel, guiderXP, failedTasksToday } = get();
        const task = dailyTasks.find(t => t.id === taskId);
        
        if (!task) return;
        
        const newFailedCount = failedTasksToday + 1;
        const newXP = Math.max(0, guiderXP - 20);
        const levelDown = newXP === 0 && guiderLevel > 1;
        
        // Determine mood based on how many tasks failed
        let newMood = 'sad';
        if (newFailedCount >= 2) {
          newMood = 'crying'; // Failed 2+ tasks - crying and disappointed
        } else if (newFailedCount === 1) {
          newMood = 'disappointed'; // First failed task - disappointed
        }
        
        set({
          dailyTasks: dailyTasks.filter(t => t.id !== taskId),
          missedTasks: [...missedTasks, { ...task, missedAt: new Date().toISOString() }],
          guiderXP: levelDown ? 50 : newXP,
          guiderLevel: levelDown ? guiderLevel - 1 : guiderLevel,
          guiderMood: newMood,
          failedTasksToday: newFailedCount,
          streakDays: 0,
        });
      },
      
      advanceDay: () => {
        const { currentDay, dailyTasks, streakDays } = get();
        const allCompleted = dailyTasks.every(t => t.completed);
        
        set({
          currentDay: currentDay + 1,
          streakDays: allCompleted ? streakDays + 1 : 0,
          dailyTasks: [],
          failedTasksToday: 0, // Reset failed tasks for new day
          guiderMood: 'happy', // Start fresh
        });
        
        get().generateDailyTasks();
      },
      
      purchaseItem: (item) => {
        const { coins, purchasedItems } = get();
        
        if (coins < item.price) return false;
        if (purchasedItems.find(i => i.id === item.id)) return false;
        
        set({
          coins: coins - item.price,
          purchasedItems: [...purchasedItems, item],
        });
        
        return true;
      },
      
      equipItem: (item) => {
        const { equippedItems } = get();
        
        // Remove items of same type
        const filtered = equippedItems.filter(i => i.type !== item.type);
        
        set({
          equippedItems: [...filtered, item],
        });
      },
      
      unequipItem: (itemId) => {
        const { equippedItems } = get();
        set({
          equippedItems: equippedItems.filter(i => i.id !== itemId),
        });
      },
      
      addSteps: (steps) => set(state => ({ 
        totalSteps: state.totalSteps + steps 
      })),
      
      addWorkoutMinutes: (minutes) => set(state => ({ 
        totalWorkoutMinutes: state.totalWorkoutMinutes + minutes 
      })),
      
      resetAll: () => set({
        currentStep: 'welcome',
        userAge: null,
        healthGoal: null,
        selectedPlan: null,
        guiderName: '',
        guiderAge: null,
        guiderLevel: 1,
        guiderXP: 0,
        guiderMood: 'happy',
        avatarColor: '#FFB6C1',
        equippedItems: [],
        purchasedItems: [],
        coins: 100,
        currentDay: 1,
        startDate: null,
        dailyTasks: [],
        completedTasks: [],
        missedTasks: [],
        totalSteps: 0,
        totalWorkoutMinutes: 0,
        streakDays: 0,
      }),
    }),
    {
      name: 'healthcare-twin-storage',
    }
  )
);

export default useStore;
