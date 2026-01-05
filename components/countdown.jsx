'use client';

import { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Set the target launch date (30 days from now as an example)
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 30);

      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference / (1000 * 60 * 60)) % 24
          ),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const CountdownBox = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-amber-700 text-white rounded-lg p-4 sm:p-6 lg:p-8 min-w-20 sm:min-w-24 lg:min-w-28 shadow-lg hover:shadow-xl transition-shadow">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <p className="text-gray-700 text-sm sm:text-base lg:text-lg font-semibold mt-3 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );

  return (
    <div className="flex gap-4 sm:gap-6 lg:gap-8 justify-center items-end flex-wrap">
      <CountdownBox value={timeLeft.days} label="Days" />
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-700 mb-4">:</div>
      <CountdownBox value={timeLeft.hours} label="Hours" />
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-700 mb-4">:</div>
      <CountdownBox value={timeLeft.minutes} label="Minutes" />
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-700 mb-4">:</div>
      <CountdownBox value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
