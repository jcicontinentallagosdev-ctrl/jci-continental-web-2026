import ObserverImage from '@/components/shared/obs-image';
import { StaticImageData } from 'next/image';
import React from 'react';

interface StatsCardProps {
  icon: StaticImageData;
  number: string;
  text: string;
  className?: string;
}

export function StatsCard({ icon, number, text, className }: StatsCardProps) {
  return (
    <div
      className={`basis-0 bg-[#fcf9ec] box-border content-stretch flex gap-4 grow items-center justify-start w-full lg:min-h-px lg:min-w-px p-[24px] relative rounded-[16px] lg:shrink-0 ${className || ''}`}
    >
      <div className="absolute border border-[#f7ebc3] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-[#f7ebc3] box-border content-stretch flex gap-2 items-center justify-center p-[18px] relative rounded-[30px] shrink-0 size-[60px]">
        <div className="absolute border-[#f7ebc3] border-[0.6px] border-solid inset-0 pointer-events-none rounded-[30px]" />
        <div className="overflow-clip relative shrink-0 size-6">
          <ObserverImage
            src={icon}
            alt="stats-card-icon"
            className="block max-w-none size-full"
          />
        </div>
      </div>
      <div className="w-full lg:flex-row flex-col flex gap-3 lg:items-center justify-start leading-[0] relative">
        <div className="flex flex-col font-bold justify-center relative shrink-0 text-[#001319] text-[24px] text-nowrap">
          <p className="leading-[28px] whitespace-pre">{number}</p>
        </div>
        <div className="flex w-full flex-col font-inter font-normal justify-center not-italic relative shrink-0 text-[#546165] text-[18px]">
          <p className="leading-[26px]">{text}</p>
        </div>
      </div>
    </div>
  );
}
