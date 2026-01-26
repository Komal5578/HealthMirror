'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import useStore, { shopItems } from '../store/useStore';
import { 
  ChevronLeft, 
  Coins, 
  ShoppingBag, 
  Check, 
  Lock,
  Sparkles,
  Heart,
  Crown,
  Glasses,
  Shirt,
  Footprints,
  Wind,
  Gem
} from 'lucide-react';

// Dynamic import for Three.js component
const Avatar3D = dynamic(() => import('./Avatar3D'), { 
  ssr: false,
  loading: () => (
    <div className="h-80 flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </div>
  )
});

// Icon mapping for item types
const getItemIcon = (type) => {
  switch (type) {
    case 'hat':
      return <Crown className="w-8 h-8" />;
    case 'accessory':
      return <Glasses className="w-8 h-8" />;
    case 'shirt':
      return <Shirt className="w-8 h-8" />;
    case 'pants':
      return <Gem className="w-8 h-8" />;
    case 'shoes':
      return <Footprints className="w-8 h-8" />;
    case 'cape':
      return <Wind className="w-8 h-8" />;
    case 'wings':
      return <Sparkles className="w-8 h-8" />;
    default:
      return <Sparkles className="w-8 h-8" />;
  }
};

export default function Shop() {
  const { 
    coins, 
    purchasedItems, 
    equippedItems,
    purchaseItem, 
    equipItem,
    unequipItem,
    setStep,
    guiderName
  } = useStore();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [message, setMessage] = useState('');
  
  const categories = ['all', 'hat', 'accessory', 'shirt', 'pants', 'shoes', 'cape', 'wings'];
  
  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.type === selectedCategory);
  
  const handlePurchase = (item) => {
    if (purchasedItems.find(i => i.id === item.id)) {
      // Already owned, toggle equip
      const isEquippedItem = equippedItems.find(i => i.id === item.id);
      if (isEquippedItem) {
        unequipItem(item.id);
        setMessage(`Removed ${item.name}`);
      } else {
        equipItem(item);
        setMessage(`Equipped ${item.name}!`);
      }
    } else {
      // Purchase
      if (coins >= item.price) {
        const success = purchaseItem(item);
        if (success) {
          equipItem(item);
          setMessage(`Purchased and equipped ${item.name}!`);
        }
      } else {
        setMessage(`Not enough coins! Need ${item.price - coins} more.`);
      }
    }
    
    setTimeout(() => setMessage(''), 2000);
  };
  
  const isOwned = (item) => purchasedItems.find(i => i.id === item.id);
  const isEquipped = (item) => equippedItems.find(i => i.id === item.id);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep('dashboard')}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
            
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-medium text-gray-800">Healthcare Twin</span>
            </div>
            
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full">
              <Coins className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-700 font-medium">{coins}</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-normal text-gray-900 mb-2 flex items-center justify-center gap-3">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            Avatar Shop
          </h1>
          <p className="text-gray-600">Customize {guiderName || 'your Guider'}'s look with cool accessories!</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Preview */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-24">
              <h3 className="text-gray-900 font-medium text-center mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                {guiderName || 'Guider'}'s Preview
              </h3>
              
              <Avatar3D height="320px" />
              
              {/* Equipped Items */}
              <div className="mt-4">
                <p className="text-gray-600 text-sm mb-2">Equipped Items:</p>
                {equippedItems.length === 0 ? (
                  <p className="text-gray-400 text-sm italic">No items equipped</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {equippedItems.map((item) => (
                      <span 
                        key={item.id}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Message */}
              {message && (
                <div className={`mt-4 p-3 rounded-xl text-center border ${
                  message.includes('Not enough') 
                    ? 'bg-red-50 text-red-700 border-red-200' 
                    : 'bg-green-50 text-green-700 border-green-200'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>
          
          {/* Shop Items */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const owned = isOwned(item);
                const equipped = isEquipped(item);
                const canAfford = coins >= item.price;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePurchase(item)}
                    disabled={!owned && !canAfford}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all text-left
                      ${equipped 
                        ? 'bg-blue-50 border-blue-400' 
                        : owned 
                          ? 'bg-green-50 border-green-300 hover:border-green-400' 
                          : canAfford
                            ? 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md'
                            : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                      }
                    `}
                  >
                    {/* Item Preview with Color */}
                    <div 
                      className="w-full aspect-square rounded-xl mb-3 flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: item.color + '20' }}
                    >
                      <div 
                        className="absolute inset-2 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: item.color, color: '#fff' }}
                      >
                        {getItemIcon(item.type)}
                      </div>
                    </div>
                    
                    {/* Item Info */}
                    <h4 className="text-gray-900 font-medium text-sm mb-1 truncate">{item.name}</h4>
                    <p className="text-gray-500 text-xs mb-2 capitalize">{item.type}</p>
                    
                    {/* Price or Status */}
                    <div className="flex items-center justify-between">
                      {owned ? (
                        <span className={`text-sm font-medium ${equipped ? 'text-blue-600' : 'text-green-600'}`}>
                          {equipped ? 'Equipped' : 'Owned'}
                        </span>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Coins className="w-4 h-4 text-yellow-600" />
                          <span className={`font-medium text-sm ${canAfford ? 'text-gray-900' : 'text-gray-400'}`}>
                            {item.price}
                          </span>
                        </div>
                      )}
                      
                      {/* Status Icon */}
                      {equipped && (
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {owned && !equipped && (
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {!owned && !canAfford && (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
                No items in this category yet.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
