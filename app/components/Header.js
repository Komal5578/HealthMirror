'use client';

import { useState } from 'react';
import Image from 'next/image';
import useStore from '../store/useStore';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { LogOut, Settings, User, ChevronDown } from 'lucide-react';

export default function Header({ showNav = true }) {
  const { setStep, resetAll, guiderName } = useStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      resetAll();
      setStep('welcome');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setStep('welcome')}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
          >
            <Image src="/logo-m.svg" alt="HealthMirror Logo" width={36} height={36} className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-base sm:text-lg font-semibold text-gray-900">HealthMirror</span>
          </button>

          {showNav && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="hidden sm:block text-sm text-gray-700">{guiderName || 'User'}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => {
                        setStep('dashboard');
                        setShowDropdown(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setStep('shop');
                        setShowDropdown(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
