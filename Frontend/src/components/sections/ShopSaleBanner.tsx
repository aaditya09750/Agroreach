import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import shopBanner from '../../assets/Shop Bannar.jpg';

const TimerBox: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-2xl font-medium bg-white text-primary w-12 h-12 flex items-center justify-center rounded-md">{value}</div>
    <div className="text-xs uppercase text-white/80 tracking-widest mt-2">{label}</div>
  </div>
);

// Floating Particle Component
const FloatingParticle: React.FC<{ 
  emoji: string; 
  left?: string; 
  top?: string; 
  right?: string; 
  bottom?: string;
  size?: string;
  blur?: string;
}> = ({ emoji, left, top, right, bottom, size = 'text-4xl', blur = 'blur-sm' }) => (
  <div 
    className={`absolute ${size} pointer-events-none opacity-25 ${blur}`}
    style={{ 
      left, 
      top, 
      right, 
      bottom
    }}
  >
    {emoji}
  </div>
);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TIMER_STORAGE_KEY = 'sale_timer_end_date';
const TIMER_DURATION_HOURS = 6;

// Initialize or get the timer end date from localStorage
const getTimerEndDate = (): Date => {
  try {
    const stored = localStorage.getItem(TIMER_STORAGE_KEY);
    if (stored) {
      const endDate = new Date(stored);
      // Check if the stored date is in the future
      if (endDate.getTime() > new Date().getTime()) {
        return endDate;
      }
    }
  } catch (error) {
    console.error('Error loading timer end date:', error);
  }
  
  // Create a new end date if none exists or if it's expired
  const newEndDate = new Date();
  newEndDate.setHours(newEndDate.getHours() + TIMER_DURATION_HOURS);
  
  try {
    localStorage.setItem(TIMER_STORAGE_KEY, newEndDate.toISOString());
  } catch (error) {
    console.error('Error saving timer end date:', error);
  }
  
  return newEndDate;
};

const ShopSaleBanner: React.FC = () => {
  const [endDate] = useState<Date>(() => getTimerEndDate());

  const calculateTimeLeft = (): TimeLeft => {
    const difference = endDate.getTime() - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    // Timer expired - create a new one
    const newEndDate = new Date();
    newEndDate.setHours(newEndDate.getHours() + TIMER_DURATION_HOURS);
    try {
      localStorage.setItem(TIMER_STORAGE_KEY, newEndDate.toISOString());
    } catch (error) {
      console.error('Error resetting timer:', error);
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="rounded-lg overflow-hidden relative h-[358px] bg-cover bg-center" style={{backgroundImage: `url(${shopBanner})`}}>
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Floating Decorative Particles - Evenly distributed across the banner */}
      {/* Top Row */}
      <FloatingParticle emoji="🍃" top="10%" left="6%" size="text-4xl" blur="blur-md" />
      <FloatingParticle emoji="🍊" top="15%" left="18%" size="text-4xl" blur="blur-sm" />
      <FloatingParticle emoji="🍃" top="8%" left="50%" size="text-3xl" blur="blur-md" />
      <FloatingParticle emoji="🍎" top="12%" right="22%" size="text-4xl" blur="blur-sm" />
      <FloatingParticle emoji="🍃" top="10%" right="8%" size="text-3xl" blur="blur-md" />
      
      {/* Middle Row */}
      <FloatingParticle emoji="🥕" top="40%" left="4%" size="text-4xl" blur="blur-sm" />
      <FloatingParticle emoji="🍃" top="45%" left="28%" size="text-3xl" blur="blur-md" />
      <FloatingParticle emoji="🍃" top="42%" right="32%" size="text-3xl" blur="blur-md" />
      <FloatingParticle emoji="🍋" top="48%" right="10%" size="text-4xl" blur="blur-sm" />
      
      {/* Bottom Row */}
      <FloatingParticle emoji="🍃" bottom="10%" left="10%" size="text-3xl" blur="blur-md" />
      <FloatingParticle emoji="🍅" bottom="15%" left="24%" size="text-4xl" blur="blur-sm" />
      <FloatingParticle emoji="🍃" bottom="12%" left="52%" size="text-3xl" blur="blur-md" />
      <FloatingParticle emoji="🥬" bottom="18%" right="18%" size="text-4xl" blur="blur-sm" />
      <FloatingParticle emoji="🍃" bottom="8%" right="6%" size="text-3xl" blur="blur-md" />
      
      <div className="relative z-10 p-16 flex items-center justify-between h-full">
        <div className="text-white">
          <p className="text-sm uppercase font-medium tracking-widest">Best Deals</p>
          <h3 className="text-5xl font-semibold mt-2">Sale of the Month</h3>
          <div className="flex items-center gap-4 mt-6">
            <TimerBox value={formatNumber(timeLeft.days)} label="Days" />
            <span className="text-3xl text-white/50">:</span>
            <TimerBox value={formatNumber(timeLeft.hours)} label="Hours" />
            <span className="text-3xl text-white/50">:</span>
            <TimerBox value={formatNumber(timeLeft.minutes)} label="Mins" />
            <span className="text-3xl text-white/50">:</span>
            <TimerBox value={formatNumber(timeLeft.seconds)} label="Secs" />
          </div>
          <button className="mt-8 bg-primary text-white font-semibold py-3 px-8 rounded-full flex items-center gap-2 hover:bg-opacity-90 transition-colors">
            Shop Now <ArrowRight size={18} />
          </button>
        </div>
        <div className="w-40 h-40 bg-warning rounded-full flex flex-col items-center justify-center text-white">
            <p className="text-5xl font-bold">38 %</p>
            <p className="text-lg font-semibold">OFF</p>
        </div>
      </div>
    </div>
  );
};

export default ShopSaleBanner;
