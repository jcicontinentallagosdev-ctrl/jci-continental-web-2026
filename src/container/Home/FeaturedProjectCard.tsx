import { ArrowRight } from 'lucide-react';
import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';
import React from 'react';

interface FeaturedProjectCardProps {
  className?: string;
}

const imgImage4Colorized =
  'http://localhost:3845/assets/f8f68b795f64b611216dbff467332b672aa30922.png';
const img =
  'http://localhost:3845/assets/d8a51d64728d9e0e5cb1ce4a9b84a746e9f68637.svg';
const imgVector193 =
  'http://localhost:3845/assets/76eb7ac980f84278e7967106b6e979339b597141.svg';
const img3 =
  'http://localhost:3845/assets/c1eb7fc5c85fabe9b81e1ad9c91ceb856c69b0b2.svg';

export function FeaturedProjectCard({ className }: FeaturedProjectCardProps) {
  return (
    <div className="w-full rounded-[32px] h-full relative p-4 flex items-center justify-end min-h-[349px] overflow-hidden">
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
        className="relative text-left max-w-[469px] z-10 bg-[rgba(50,50,52,0.2)] border border-[rgba(251,254,255,0.4)] backdrop-blur-[2.5px] rounded-[16px] shrink-0 w-[469px] p-6 cursor-pointer"
      >
        <div className="bg-[rgba(254,255,255,0.2)] text-[#F3FCFF] uppercase font-semibold rounded-[20px] py-2 px-3 w-fit font-inter text-xs">
          Featured Project
        </div>

        <div className="mt-[15px] border-b border-[rgba(251,254,255,0.4)] pb-6">
          <div className="flex flex-col font-inter font-semibold justify-center relative shrink-0 text-[#FEFFFF] text-[16px] w-full">
            <p className="leading-[26px]">Borderless By Design</p>
          </div>
          <div className="mt-2">
            <p className="font-inter text-[#FEFFFF] text-sm">
              Breaking barriers and building bridges across communities through
              innovative design thinking and collaborative leadership
              initiatives.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col font-inter font-semibold justify-center relative shrink-0 text-[#FEFFFF] text-[16px]">
            <p className="text-base text-[#FEFFFF]">View Project</p>
          </div>
          <div className="border-2 flex items-center justify-center size-[47px] border-[#0398C8] rounded-full p-2 bg-[#B1DFEE]">
            <ArrowRight size={32} className="text-[#0398C8]" />
          </div>
        </div>
      </button>
    </div>
  );
}
