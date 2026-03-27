import { ArrowRight } from 'lucide-react';
import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';
import React from 'react';
import { useRouter } from 'next/navigation';

interface FeaturedProjectCardProps {
  className?: string;
}

export function FeaturedProjectCard({}: FeaturedProjectCardProps) {
  const router = useRouter();
  return (
    <div className="w-full overflow-hidden rounded-[32px] h-full relative p-4 flex lg:items-center items-end justify-end min-h-[349px]">
      <div className="h-[832px] absolute top-[-130px] inset-0">
        <ObserverImage
          src={images.heroFeatureImage}
          alt="hero-feature-image"
          imageClassName="rounded-[32px]"
          className="w-full h-full"
        />
      </div>

      <button
        type="button"
        className="relative text-left max-w-full lg:max-w-[469px] z-10 bg-[rgba(0,0,0,0.31)] border border-[rgba(251,254,255,0.4)] backdrop-blur-[1.5px] rounded-[16px] shrink-0 lg:w-[469px] p-6 cursor-pointer"
      >
        <div className="bg-[rgba(254,255,255,0.2)] text-[#F3FCFF] uppercase font-semibold rounded-[20px] py-2 px-3 w-fit font-inter text-xs">
          Our Leader
        </div>

        <div className="mt-[15px] border-b border-[rgba(251,254,255,0.4)] pb-6">
          <div className="flex flex-col font-inter font-semibold justify-center relative shrink-0 text-[#FEFFFF] text-[16px] w-full">
            <p className="leading-[26px]">Integrity • Service • Impact • Collaboration </p>
          </div>
          <div className="mt-2">
            <p className="font-inter text-[#FEFFFF] text-sm">
            We believe leadership is developed through action, service, and a commitment to creating lasting impact in our communities
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col font-inter font-semibold justify-center relative shrink-0 text-[#FEFFFF] text-[16px]">
            <p className="text-base text-[#FEFFFF]">Meet Our Leader</p>
          </div>
          <div className="border-2 flex items-center justify-center size-[47px] border-[#0398C8] rounded-full p-2 bg-[#B1DFEE]">
            <ArrowRight onClick={() => router.push('/our-people')} size={32} className="text-[#0398C8]" />
          </div>
        </div>
      </button>
    </div>
  );
}
