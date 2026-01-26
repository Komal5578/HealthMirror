'use client';

import { useEffect, useState } from 'react';
import useStore from './store/useStore';

import WelcomeScreen from './components/WelcomeScreen';
import HealthProfile from './components/HealthProfile';
import AgeInput from './components/AgeInput';
import PlanSelection from './components/PlanSelection';
import GuiderSetup from './components/GuiderSetup';
import Dashboard from './components/Dashboard';
import Shop from './components/Shop';
export default function Home() {
  const { currentStep } = useStore();
  const [mounted, setMounted] = useState(false);

  // Hydration fix for zustand persist
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'health-profile':
        return <HealthProfile />;
      case 'age':
        return <AgeInput />;
      case 'plan':
        return <PlanSelection />;
      case 'guider':
        return <GuiderSetup />;
      case 'dashboard':
        return <Dashboard />;
      case 'shop':
        return <Shop />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <main>
      {renderStep()}

    
    </main>
  );
}
