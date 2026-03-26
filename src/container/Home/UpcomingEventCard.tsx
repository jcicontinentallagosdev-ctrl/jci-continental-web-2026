'use client';

import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

const SLIDE_INTERVAL_MS = 5000;

const upcomingEvents = [
  {
    id: 1,
    title: 'JCI Nigeria Southern Conference',
    description:
      'Join us for the JCI Nigeria Southern Conference — a gathering of young leaders driving impact across the southern region.',
    date: 'April 9–12, 2026',
    startDate: '2026-04-09',
    endDate: '2026-04-12',
  },
  {
    id: 2,
    title: 'JCI World Congress',
    description:
      'Connect with young active citizens from around the globe at the JCI World Congress.',
    date: 'November 11–15, 2026',
    startDate: '2026-11-11',
    endDate: '2026-11-15',
  },
  {
    id: 3,
    title: 'Africa & the Middle East Conference',
    description:
      'Experience leadership forums, cultural exchange, and collaborations driving sustainable development and unity.',
    date: 'May 20–23, 2026',
    startDate: '2026-05-20',
    endDate: '2026-05-23',
  },
];

interface UpcomingEventCardProps {
  className?: string;
}

export function UpcomingEventCard({ className }: UpcomingEventCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % upcomingEvents.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const goToEvent = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const toCalendarDate = useCallback((dateString: string) => {
    return dateString.replaceAll('-', '');
  }, []);

  const addDays = useCallback((dateString: string, days: number) => {
    const date = new Date(`${dateString}T00:00:00`);
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const event = upcomingEvents[activeIndex];

  const openCalendar = useCallback(() => {
    const start = toCalendarDate(event.startDate);
    const end = toCalendarDate(addDays(event.endDate, 1));
    const calendarUrl = new URL('https://calendar.google.com/calendar/render');

    calendarUrl.searchParams.set('action', 'TEMPLATE');
    calendarUrl.searchParams.set('text', event.title);
    calendarUrl.searchParams.set('details', event.description);
    calendarUrl.searchParams.set('dates', `${start}/${end}`);

    window.open(calendarUrl.toString(), '_blank', 'noopener,noreferrer');
  }, [addDays, event, toCalendarDate]);

  return (
    <div className={`bg-secondary flex flex-col rounded-2xl p-6 cursor-pointer overflow-hidden ${className ?? ''}`}>
      <div className="bg-[#FEFFFF] text-[#026C8E] uppercase font-semibold rounded-[20px] py-2 px-3 w-fit font-inter text-xs">
        Upcoming Event
      </div>

      <div className="mt-[15px] border-b border-[#B1DFEE] pb-6 flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <div className="flex flex-col font-inter font-semibold justify-center relative shrink-0 text-[#001319] text-[16px] w-full">
              <p className="leading-[26px]">{event.title}</p>
            </div>
            <div className="mt-2">
              <p className="font-inter text-[#546165] text-sm">
                {event.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={event.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col font-inter font-semibold justify-center relative shrink-0 text-[#001319] text-[16px]"
          >
            <p className="text-base text-primary">{event.date}</p>
          </motion.div>
        </AnimatePresence>
        <button
          type="button"
          onClick={openCalendar}
          aria-label={`Add ${event.title} to Google Calendar`}
          className="border-2 flex items-center justify-center size-[47px] border-primary rounded-full p-2 bg-[#B1DFEE]"
        >
          <ArrowRight size={32} className="text-primary" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {upcomingEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => goToEvent(index)}
            aria-label={`Go to event ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-6 h-2 bg-primary'
                : 'size-2 bg-[#B1DFEE] hover:bg-primary/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
