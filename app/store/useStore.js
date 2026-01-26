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
      
      // Health metrics for virtual patient
      healthScore: 50, // 0-100 overall health score
      bodyState: 'normal', // thin, normal, fit, muscular, overweight, weak
      vitalSigns: {
        heartHealth: 50,
        muscleStrength: 50,
        flexibility: 50,
        mentalWellness: 50,
        energyLevel: 50,
      },
      progressHistory: [], // Array of daily snapshots for trends
      lastPrediction: null, // AI prediction cache
      
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
        const { dailyTasks, completedTasks, coins, guiderXP, guiderLevel, failedTasksToday, healthGoal, vitalSigns } = get();
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
        
        // Calculate new vital signs - DIRECT UPDATE for immediate feedback
        const currentCompleted = (completedTasks?.length || 0) + 1;
        const boost = Math.min(currentCompleted * 5, 45); // Each task adds 5 points, max 45 (so max is 95)
        
        const newVitals = { ...vitalSigns };
        if (healthGoal?.id === 'muscle_gain') {
          newVitals.muscleStrength = Math.min(100, 50 + boost);
        } else if (healthGoal?.id === 'cardio_health') {
          newVitals.heartHealth = Math.min(100, 50 + boost);
        } else if (healthGoal?.id === 'weight_loss') {
          newVitals.energyLevel = Math.min(100, 50 + boost);
        } else if (healthGoal?.id === 'flexibility') {
          newVitals.flexibility = Math.min(100, 50 + boost);
        } else if (healthGoal?.id === 'stress_anxiety') {
          newVitals.mentalWellness = Math.min(100, 50 + boost);
        } else {
          // General - boost all
          Object.keys(newVitals).forEach(key => {
            newVitals[key] = Math.min(100, 50 + boost * 0.5);
          });
        }
        
        // Determine body state based on vitals
        let newBodyState = 'normal';
        const primaryVital = healthGoal?.id === 'muscle_gain' ? newVitals.muscleStrength :
                            healthGoal?.id === 'cardio_health' ? newVitals.heartHealth :
                            healthGoal?.id === 'weight_loss' ? newVitals.energyLevel : 50 + boost * 0.5;
        
        if (healthGoal?.id === 'muscle_gain') {
          if (primaryVital >= 80) newBodyState = 'very_muscular';
          else if (primaryVital >= 70) newBodyState = 'muscular';
          else if (primaryVital >= 60) newBodyState = 'fit';
          else if (primaryVital >= 52) newBodyState = 'normal';
          else newBodyState = 'thin';
        } else if (healthGoal?.id === 'weight_loss') {
          if (primaryVital >= 70) newBodyState = 'fit';
          else if (primaryVital >= 50) newBodyState = 'normal';
          else newBodyState = 'overweight';
        } else {
          if (primaryVital >= 70) newBodyState = 'fit';
          else newBodyState = 'normal';
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
          vitalSigns: newVitals,
          bodyState: newBodyState,
          healthScore: Math.min(100, 30 + boost),
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
      
      // Calculate and update health metrics based on task completion
      updateHealthMetrics: () => {
        const { 
          healthGoal, completedTasks, missedTasks, streakDays, 
          currentDay, healthScore, vitalSigns, progressHistory 
        } = get();
        
        // Ensure we have valid vitals to work with
        const safeVitals = {
          heartHealth: vitalSigns?.heartHealth || 50,
          muscleStrength: vitalSigns?.muscleStrength || 50,
          flexibility: vitalSigns?.flexibility || 50,
          mentalWellness: vitalSigns?.mentalWellness || 50,
          energyLevel: vitalSigns?.energyLevel || 50,
        };
        
        // Calculate completion rate
        const completedCount = completedTasks?.length || 0;
        const missedCount = missedTasks?.length || 0;
        const totalTasks = completedCount + missedCount;
        const completionRate = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 50;
        
        // Calculate new health score (weighted average)
        const streakBonus = Math.min(streakDays * 2, 20); // Max 20 points from streak
        const completionScore = completionRate * 0.6; // 60% weight on completion
        const consistencyScore = Math.min(currentDay, 30) * 0.5; // Bonus for consistency
        
        let newHealthScore = Math.min(100, Math.max(0, 
          completionScore + streakBonus + consistencyScore
        ));
        
        // Decay if not completing tasks
        if (completionRate < 50) {
          newHealthScore = Math.max(10, (healthScore || 50) - 5);
        }
        
        // Calculate improvement based on completed tasks count - more responsive
        // Each completed task gives a boost, with diminishing returns
        const taskBoost = Math.min(completedCount * 1.5, 30); // Max 30 point boost from tasks
        const newVitals = { ...safeVitals };
        
        // Primary improvement based on goal - increases with each task
        const primaryImprovement = completionRate > 30 ? Math.ceil(completedCount * 0.8) : -2;
        
        if (healthGoal?.id === 'muscle_gain') {
          newVitals.muscleStrength = Math.min(100, Math.max(10, 50 + taskBoost));
        } else if (healthGoal?.id === 'cardio_health') {
          newVitals.heartHealth = Math.min(100, Math.max(10, 50 + taskBoost));
        } else if (healthGoal?.id === 'weight_loss') {
          newVitals.energyLevel = Math.min(100, Math.max(10, 50 + taskBoost));
        } else if (healthGoal?.id === 'flexibility') {
          newVitals.flexibility = Math.min(100, Math.max(10, 50 + taskBoost));
        } else if (healthGoal?.id === 'stress_anxiety') {
          newVitals.mentalWellness = Math.min(100, Math.max(10, 50 + taskBoost));
        } else {
          // General improvement across all - proportional to completed tasks
          const generalBoost = Math.min(completedCount * 0.8, 15);
          Object.keys(newVitals).forEach(key => {
            newVitals[key] = Math.min(100, Math.max(10, 50 + generalBoost));
          });
        }
        
        // Determine body state based on health goal and vital score
        let newBodyState = 'normal';
        if (healthGoal?.id === 'muscle_gain') {
          if (newVitals.muscleStrength >= 80) newBodyState = 'very_muscular';
          else if (newVitals.muscleStrength >= 70) newBodyState = 'muscular';
          else if (newVitals.muscleStrength >= 55) newBodyState = 'fit';
          else if (newVitals.muscleStrength < 40) newBodyState = 'thin';
          else newBodyState = 'normal';
        } else if (healthGoal?.id === 'weight_loss') {
          if (newHealthScore >= 70) newBodyState = 'fit';
          else if (newHealthScore >= 50) newBodyState = 'normal';
          else newBodyState = 'overweight';
        } else if (healthGoal?.id === 'cardio_health') {
          if (newVitals.heartHealth >= 70) newBodyState = 'fit';
          else if (newVitals.heartHealth < 40) newBodyState = 'weak';
          else newBodyState = 'normal';
        } else {
          if (newHealthScore >= 75) newBodyState = 'fit';
          else if (newHealthScore < 35) newBodyState = 'weak';
          else newBodyState = 'normal';
        }
        
        // Add to progress history (daily snapshot)
        const snapshot = {
          date: new Date().toISOString(),
          day: currentDay,
          healthScore: newHealthScore,
          completionRate,
          streakDays,
          vitalSigns: { ...newVitals },
          bodyState: newBodyState,
        };
        
        const updatedHistory = [...(progressHistory || []), snapshot].slice(-90); // Keep last 90 days
        
        set({
          healthScore: Math.round(newHealthScore),
          vitalSigns: newVitals,
          bodyState: newBodyState,
          progressHistory: updatedHistory,
        });
      },
      
      // Get projected health for future - SOPHISTICATED MODEL
      // Factors: age, completion rate, streak consistency, compound effects, risk factors
      getHealthProjection: (years) => {
        const { 
          healthScore, completedTasks, missedTasks, healthGoal, 
          vitalSigns, bodyState, userAge, streakDays, currentDay 
        } = get();
        
        // Ensure we have valid numbers
        const safeHealthScore = typeof healthScore === 'number' && !isNaN(healthScore) ? healthScore : 50;
        const age = userAge || 30;
        const safeVitals = {
          heartHealth: vitalSigns?.heartHealth || 50,
          muscleStrength: vitalSigns?.muscleStrength || 50,
          flexibility: vitalSigns?.flexibility || 50,
          mentalWellness: vitalSigns?.mentalWellness || 50,
          energyLevel: vitalSigns?.energyLevel || 50,
        };
        
        // === COMPLETION RATE ANALYSIS ===
        const totalTasks = (completedTasks?.length || 0) + (missedTasks?.length || 0);
        const completionRate = totalTasks > 0 ? ((completedTasks?.length || 0) / totalTasks) * 100 : 50;
        
        // === AGE-BASED FACTORS ===
        // Younger = faster recovery/improvement, Older = slower but steadier
        const futureAge = age + years;
        const ageFactor = age < 25 ? 1.3 :      // Young: 30% boost
                          age < 35 ? 1.1 :      // Prime: 10% boost
                          age < 45 ? 1.0 :      // Middle: normal
                          age < 55 ? 0.85 :     // Mature: 15% penalty
                          age < 65 ? 0.7 :      // Senior: 30% penalty
                          0.5;                  // Elder: 50% penalty
        
        // Natural degradation with age (unavoidable baseline)
        const ageDegradation = years * (futureAge > 50 ? 1.5 : futureAge > 40 ? 0.8 : 0.3);
        
        // === CONSISTENCY & COMPOUND EFFECTS ===
        // Streaks provide compound benefits (like compound interest)
        const streakMultiplier = streakDays > 30 ? 1.5 :
                                  streakDays > 14 ? 1.3 :
                                  streakDays > 7 ? 1.15 :
                                  streakDays > 3 ? 1.05 : 1.0;
        
        // Compound effect: consistent effort over years multiplies results
        const compoundFactor = Math.pow(1 + (completionRate / 500), years); // ~1.14x per year at 70% completion
        
        // === BASE YEARLY CHANGE ===
        let baseYearlyChange;
        if (completionRate >= 80) {
          baseYearlyChange = 10;  // Excellent
        } else if (completionRate >= 70) {
          baseYearlyChange = 7;   // Good
        } else if (completionRate >= 60) {
          baseYearlyChange = 4;   // Moderate
        } else if (completionRate >= 50) {
          baseYearlyChange = 1;   // Minimal improvement
        } else if (completionRate >= 40) {
          baseYearlyChange = -3;  // Slight decline
        } else if (completionRate >= 25) {
          baseYearlyChange = -8;  // Significant decline
        } else {
          baseYearlyChange = -15; // Severe decline
        }
        
        // === CALCULATE PROJECTED HEALTH SCORE ===
        const yearlyChange = (baseYearlyChange * ageFactor * streakMultiplier);
        const compoundedChange = yearlyChange * compoundFactor;
        let projectedHealthScore = safeHealthScore + (compoundedChange * years) - ageDegradation;
        projectedHealthScore = Math.min(100, Math.max(0, projectedHealthScore));
        
        // === RISK FACTORS ===
        const missedTaskRatio = totalTasks > 0 ? (missedTasks?.length || 0) / totalTasks : 0;
        const riskFactors = [];
        
        if (missedTaskRatio > 0.5) {
          riskFactors.push({ factor: 'High task abandonment', impact: 'severe', deduction: 10 });
          projectedHealthScore -= 10;
        } else if (missedTaskRatio > 0.3) {
          riskFactors.push({ factor: 'Inconsistent habits', impact: 'moderate', deduction: 5 });
          projectedHealthScore -= 5;
        }
        
        if (futureAge > 60 && completionRate < 60) {
          riskFactors.push({ factor: 'Age + low activity', impact: 'high', deduction: 8 });
          projectedHealthScore -= 8;
        }
        
        if (streakDays === 0 && currentDay > 7) {
          riskFactors.push({ factor: 'No consistency streak', impact: 'moderate', deduction: 5 });
          projectedHealthScore -= 5;
        }
        
        // Health goal specific risks
        if (healthGoal?.id === 'cardio_health' && safeVitals.heartHealth < 40) {
          riskFactors.push({ factor: 'Low baseline heart health', impact: 'high', deduction: 7 });
          projectedHealthScore -= 7;
        }
        
        if (healthGoal?.id === 'diabetes_management' && completionRate < 50) {
          riskFactors.push({ factor: 'Poor diabetes management adherence', impact: 'severe', deduction: 12 });
          projectedHealthScore -= 12;
        }
        
        projectedHealthScore = Math.min(100, Math.max(0, projectedHealthScore));
        
        // === PROJECT VITAL SIGNS ===
        const projectedVitals = {};
        Object.keys(safeVitals).forEach(key => {
          let vitalChange;
          
          // Different vitals change at different rates
          const vitalAgeFactor = key === 'flexibility' ? ageFactor * 0.8 : // Flexibility declines faster with age
                                  key === 'muscleStrength' ? ageFactor * 0.9 : // Muscle harder to maintain
                                  key === 'mentalWellness' ? ageFactor * 1.1 : // Mental can improve with age
                                  ageFactor;
          
          if (completionRate > 70) {
            vitalChange = (6 * vitalAgeFactor * streakMultiplier * years);
          } else if (completionRate > 50) {
            vitalChange = (2 * vitalAgeFactor * years);
          } else {
            vitalChange = (-6 * years) - (ageDegradation * 0.5);
          }
          
          // Apply compound effect
          vitalChange *= compoundFactor;
          
          projectedVitals[key] = Math.round(Math.min(100, Math.max(0, safeVitals[key] + vitalChange)));
        });
        
        // === DETERMINE BODY STATE ===
        let projectedBodyState = bodyState || 'normal';
        const primaryVital = healthGoal?.id === 'muscle_gain' ? projectedVitals.muscleStrength :
                            healthGoal?.id === 'cardio_health' ? projectedVitals.heartHealth :
                            healthGoal?.id === 'weight_loss' ? projectedVitals.energyLevel :
                            projectedHealthScore;
        
        if (healthGoal?.id === 'muscle_gain') {
          if (primaryVital >= 85) projectedBodyState = 'bodybuilder';
          else if (primaryVital >= 75) projectedBodyState = 'very_muscular';
          else if (primaryVital >= 65) projectedBodyState = 'muscular';
          else if (primaryVital >= 55) projectedBodyState = 'fit';
          else if (primaryVital >= 45) projectedBodyState = 'normal';
          else if (primaryVital >= 30) projectedBodyState = 'thin';
          else projectedBodyState = 'very_weak';
        } else if (healthGoal?.id === 'weight_loss') {
          if (primaryVital >= 80) projectedBodyState = 'athletic';
          else if (primaryVital >= 65) projectedBodyState = 'fit';
          else if (primaryVital >= 50) projectedBodyState = 'normal';
          else if (primaryVital >= 35) projectedBodyState = 'overweight';
          else projectedBodyState = 'obese';
        } else if (healthGoal?.id === 'cardio_health') {
          if (primaryVital >= 80) projectedBodyState = 'excellent_cardio';
          else if (primaryVital >= 60) projectedBodyState = 'good_cardio';
          else if (primaryVital >= 45) projectedBodyState = 'fair_cardio';
          else if (primaryVital >= 30) projectedBodyState = 'poor_cardio';
          else projectedBodyState = 'critical_cardio';
        } else {
          if (projectedHealthScore >= 80) projectedBodyState = 'excellent';
          else if (projectedHealthScore >= 60) projectedBodyState = 'fit';
          else if (projectedHealthScore >= 40) projectedBodyState = 'normal';
          else if (projectedHealthScore >= 25) projectedBodyState = 'weak';
          else projectedBodyState = 'very_weak';
        }
        
        // === DETERMINE OVERALL TREND & RISK ===
        const trend = compoundedChange > 5 ? 'rapidly_improving' :
                      compoundedChange > 2 ? 'improving' :
                      compoundedChange > -1 ? 'stable' :
                      compoundedChange > -5 ? 'declining' : 'rapidly_declining';
        
        const riskLevel = projectedHealthScore < 20 ? 'critical' :
                          projectedHealthScore < 35 ? 'high' :
                          projectedHealthScore < 50 ? 'moderate' :
                          projectedHealthScore < 70 ? 'low' : 'minimal';
        
        // === LIFE EXPECTANCY IMPACT (simplified estimate) ===
        const baseLifeExpectancy = 80;
        const healthImpact = (projectedHealthScore - 50) / 5; // +/- years based on health
        const ageAdjustment = futureAge > 60 ? -2 : futureAge > 50 ? -1 : 0;
        const estimatedLifespan = Math.round(baseLifeExpectancy + healthImpact + ageAdjustment);
        
        return {
          years,
          currentAge: age,
          futureAge,
          healthScore: Math.round(projectedHealthScore),
          projectedScore: Math.round(projectedHealthScore),
          bodyState: projectedBodyState,
          projectedBodyState,
          projectedVitals,
          trend,
          riskLevel,
          riskFactors,
          completionRate: Math.round(completionRate),
          streakBonus: Math.round((streakMultiplier - 1) * 100),
          compoundEffect: Math.round((compoundFactor - 1) * 100),
          ageFactor: Math.round(ageFactor * 100) / 100,
          estimatedLifespan,
          summary: `At age ${futureAge}, with ${Math.round(completionRate)}% adherence, your health is projected to be ${riskLevel} risk with a ${trend.replace('_', ' ')} trajectory.`
        };
      },
      
      setLastPrediction: (prediction) => set({ lastPrediction: prediction }),
      
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
        healthScore: 50,
        bodyState: 'normal',
        vitalSigns: {
          heartHealth: 50,
          muscleStrength: 50,
          flexibility: 50,
          mentalWellness: 50,
          energyLevel: 50,
        },
        progressHistory: [],
        lastPrediction: null,
      }),
    }),
    {
      name: 'healthcare-twin-storage',
    }
  )
);

export default useStore;
