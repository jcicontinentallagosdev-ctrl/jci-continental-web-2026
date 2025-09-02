import { ArrowRight } from 'lucide-react';
import React from 'react';

interface NextMeetingCardProps {
  className?: string;
}

export function NextMeetingCard({ className }: NextMeetingCardProps) {
  return (
    <div className="bg-[#FBFEFF] border border-[#B1DFEE] rounded-2xl p-6 cursor-pointer">
      <div className="bg-[#E6F5FA] text-[#026C8E] uppercase font-semibold rounded-[20px] py-2 px-3 w-fit font-inter text-xs">
        Next Meeting
      </div>

      <div className="mt-[15px] border-b border-[#B1DFEE] pb-6">
        <div className="flex flex-col font-inter font-semibold justify-center relative shrink-0 text-[#001319] text-[16px] w-full">
          <p className="leading-[26px]">Leadership Circle</p>
        </div>

        {/* Countdown Timer */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="font-space-grotesk font-bold text-[32px] text-primary leading-[36px]">
              07
            </div>
            <div className="font-inter text-[#546165] text-sm text-center">
              DAYS
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-space-grotesk font-bold text-[32px] text-primary leading-[36px]">
              03
            </div>
            <div className="font-inter text-[#546165] text-sm text-center">
              HOURS
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-space-grotesk font-bold text-[32px] text-primary leading-[36px]">
              46
            </div>
            <div className="font-inter text-[#546165] text-sm text-center">
              MINS
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-col font-inter font-semibold justify-center relative shrink-0 text-[#001319] text-[16px]">
          <p className="text-base text-primary">17-July-2025</p>
        </div>
        <div className="border-2 flex items-center justify-center size-[47px] border-primary rounded-full p-2 bg-[#B1DFEE]">
          <ArrowRight size={32} className="text-primary" />
        </div>
      </div>
    </div>
  );
}
