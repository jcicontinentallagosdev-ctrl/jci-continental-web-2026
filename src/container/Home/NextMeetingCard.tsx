'use client';

import { ArrowRight } from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';

function getLastSundayOfMonth(year: number, month: number): Date {
  const lastDay = new Date(year, month + 1, 0);
  const dayOfWeek = lastDay.getDay();
  const lastSunday = new Date(lastDay);
  lastSunday.setDate(lastDay.getDate() - dayOfWeek);
  lastSunday.setHours(14, 0, 0, 0);
  return lastSunday;
}

function getNextMeetingDate(): Date {
  const now = new Date();
  const current = getLastSundayOfMonth(now.getFullYear(), now.getMonth());
  if (current.getTime() > now.getTime()) return current;
  const nextMonth = now.getMonth() + 1;
  const year = nextMonth > 11 ? now.getFullYear() + 1 : now.getFullYear();
  return getLastSundayOfMonth(year, nextMonth % 12);
}

function formatMeetingDate(date: Date): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11 ? 'st'
    : day % 10 === 2 && day !== 12 ? 'nd'
    : day % 10 === 3 && day !== 13 ? 'rd'
    : 'th';
  return `${months[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;
}

interface NextMeetingCardProps {
  className?: string;
}

export function NextMeetingCard({}: NextMeetingCardProps) {
  const targetDate = useMemo(() => getNextMeetingDate(), []);
  const formattedDate = useMemo(() => formatMeetingDate(targetDate), [targetDate]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="bg-[#FBFEFF] border border-[#B1DFEE] rounded-2xl p-6 cursor-pointer">
      <div className="bg-[#E6F5FA] text-[#026C8E] uppercase font-semibold rounded-[20px] py-2 px-3 w-fit font-inter text-xs">
        Next Meeting
      </div>

      <div className="mt-[15px] border-b border-[#B1DFEE] pb-6">
        <div className="flex flex-col font-inter font-semibold justify-center relative shrink-0 text-[#001319] text-[16px] w-full">
          <p className="leading-[26px]">Annual General Meeting</p>
        </div>

        {/* Countdown Timer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="font-space-grotesk font-bold text-[32px] text-primary leading-[36px]">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="font-inter text-[#546165] text-sm text-center">
              DAYS
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-space-grotesk font-bold text-[32px] text-primary leading-[36px]">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="font-inter text-[#546165] text-sm text-center">
              HOURS
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-space-grotesk font-bold text-[32px] text-primary leading-[36px]">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="font-inter text-[#546165] text-sm text-center">
              MINS
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-col font-inter font-semibold justify-center relative shrink-0 text-[#001319] text-[16px]">
          <p className="text-base text-primary">{formattedDate}</p>
        </div>
        <div className="border-2 flex items-center justify-center size-[47px] border-primary rounded-full p-2 bg-[#B1DFEE]">
          <ArrowRight size={32} className="text-primary" />
        </div>
      </div>
    </div>
  );
}
