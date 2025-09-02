import { ArrowRight } from 'lucide-react';
import React from 'react';

interface UpcomingEventCardProps {
  className?: string;
}

export function UpcomingEventCard({ className }: UpcomingEventCardProps) {
  return (
    <div className="bg-secondary flex flex-col rounded-2xl p-6 cursor-pointer">
      <div className="bg-[#FEFFFF] text-[#026C8E] uppercase font-semibold rounded-[20px] py-2 px-3 w-fit font-inter text-xs">
        Upcoming Event
      </div>

      <div className="mt-[15px] border-b border-[#B1DFEE] pb-6 flex-1">
        <div className="flex flex-col font-inter font-semibold justify-center relative shrink-0 text-[#001319] text-[16px] w-full">
          <p className="leading-[26px]">Upcoming Event</p>
        </div>
        <div className="mt-2">
          <p className="font-inter text-[#546165] text-sm">
            Join us for our monthly showcase and networking session.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-col font-inter font-semibold justify-center relative shrink-0 text-[#001319] text-[16px]">
          <p className="text-base text-primary">Today - June 26</p>
        </div>
        <div className="border-2 flex items-center justify-center size-[47px] border-primary rounded-full p-2 bg-[#B1DFEE]">
          <ArrowRight size={32} className="text-primary" />
        </div>
      </div>
    </div>
  );
}
