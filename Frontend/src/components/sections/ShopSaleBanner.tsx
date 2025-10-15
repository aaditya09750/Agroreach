import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import shopBanner from '../../assets/Shop Bannar.jpg';

const TimerBox: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-2xl font-medium bg-white text-primary w-12 h-12 flex items-center justify-center rounded-md">{value}</div>
    <div className="text-xs uppercase text-white/80 tracking-widest mt-2">{label}</div>
  </div>
);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ShopSaleBanner: React.FC = () => {
  // Set the end date to 1 day and 2 hours from now
  const [endDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 0); // Add 0 days
    date.setHours(date.getHours() + 6); // Add 6 hours
    return date;
  });

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
            <p className="text-5xl font-bold">35 %</p>
            <p className="text-lg font-semibold">OFF</p>
        </div>
      </div>
    </div>
  );
};

export default ShopSaleBanner;
