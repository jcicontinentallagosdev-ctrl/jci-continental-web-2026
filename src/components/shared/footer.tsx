'use client';

import { Location } from 'iconsax-react';
import Link from 'next/link';

import ObserverImage from '@/components/shared/obs-image';
import {
  FacebookIcon,
  GmailIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterXIcon,
  YouTubeIcon,
} from '@/components/shared/footer-social-icons';
import { images } from '@/constants';
import { Separator } from '../ui/separator';

const footerLinks = {
  resources: [
    { name: 'Home', href: '/' },
    { name: 'Newsletter', href: '/newsletter' },
  ],
  about: [
    { name: 'About Us', href: '/about' },
    // { name: 'What We Do', href: '/what-we-do' },
    { name: 'Our People', href: '/our-people' },
  ],
  more: [
    {
      name: 'Become A Member',
      href: '#',
      action: 'membership' as const,
    },
    { name: 'Become A Partner', href: '/become-partner' },
    { name: 'Become A Sponsor', href: '/become-sponsor' },
    { name: 'Join Tech Team', href: '/join-tech-team' },
  ],
};

const socialLinks = [
  {
    name: 'Instagram',
    Icon: InstagramIcon,
    href: 'https://www.instagram.com/jcicontinentallagos/',
  },
  {
    name: 'Facebook',
    Icon: FacebookIcon,
    href: 'https://www.facebook.com/JCIcontinental/',
  },
  {
    name: 'LinkedIn',
    Icon: LinkedInIcon,
    href: 'https://www.linkedin.com/company/jcicontinentallagos/',
  },
  {
    name: 'Twitter',
    Icon: TwitterXIcon,
    href: 'https://x.com/jcicontinental',
  },
  {
    name: 'YouTube',
    Icon: YouTubeIcon,
    href: 'https://www.youtube.com/@JCIContinentalLagos',
  },
  {
    name: 'Gmail',
    Icon: GmailIcon,
    href: 'mailto:jcicontinentallagos@gmail.com',
  },
];

export function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden bg-gradient-to-b from-[#031216] via-[#031216] to-[rgb(6,31,34)]">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-[0.1]"
        style={{
          backgroundImage: `url(${images.footerBackgroundImage.src})`,
          width: '100%',
          height: '100%',
        }}
      />
      {/* Subtle veil to unify background tones */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#031216]/90 via-[#031216]/40 to-[#061f22]/70" />

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        {/* Mobile Layout */}
        <div className="flex flex-col gap-15 md:hidden">
          {/* Logo Section */}
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="h-[86.775px] w-[180px]">
              <ObserverImage
                src={images.footerLogo}
                alt="JCI Continental Lagos"
                className="w-full h-full"
                imageClassName="!object-contain"
              />
            </div>
            <div className="flex gap-3 items-center">
              <Location variant="Bold" size={18} color="#f3fcff" />
              <span className="font-['Inter'] font-normal text-[#ece8f1] text-lg leading-[26px]">
                Lagos, Nigeria
              </span>
            </div>
          </div>

          {/* Navigation Links - Mobile Stacked */}
          <div className="flex flex-col gap-6 items-center justify-center">
            {/* Resources */}
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <h3 className="font-['Space_Grotesk'] font-bold text-white text-xl leading-[28px] text-center">
                Resources
              </h3>
              <div className="flex flex-col gap-1 items-center justify-center w-full">
                {footerLinks.resources.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* About JCI */}
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <h3 className="font-['Space_Grotesk'] font-bold text-white text-xl leading-[28px] text-center">
                JCI CL
              </h3>
              <div className="flex flex-col gap-1 items-center justify-center w-full">
                {footerLinks.about.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* More */}
            {/* <div className="flex flex-col gap-4 items-center justify-center w-full">
              <h3 className="font-['Space_Grotesk'] font-bold text-white text-xl leading-[28px] text-center">
                More
              </h3>
              <div className="flex flex-col gap-1 items-center justify-center w-full">
                {footerLinks.more.map(link =>
                  'action' in link ? (
                    <button
                      key={link.name}
                      onClick={() => openMembershipModal(true)}
                      className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors cursor-pointer"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </div>
            </div> */}

            {/* Social Links - Mobile 2x3 Grid */}
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <h3 className="font-['Space_Grotesk'] font-bold text-white text-xl leading-[28px] text-center">
                Social Links
              </h3>
              <div className="flex flex-col gap-[15.333px] items-center justify-center pt-3 w-full">
                {/* First row */}
                <div className="flex gap-[15px] items-center justify-center">
                  {socialLinks.slice(0, 3).map(social => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      className="bg-[#fcf9ec] p-[11.5px] rounded-[11.5px] hover:bg-[#fcf9ec]/80 transition-colors"
                    >
                      <social.Icon className="h-[21.25px] w-[23px] text-primary" />
                    </Link>
                  ))}
                </div>
                {/* Second row */}
                <div className="flex gap-[15px] items-center justify-center">
                  {socialLinks.slice(3, 6).map(social => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      className="bg-[#fcf9ec] p-[11.5px] rounded-[11.5px] hover:bg-[#fcf9ec]/80 transition-colors"
                    >
                      <social.Icon className="h-[21.25px] w-[23px] text-primary" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Mobile Stacked */}
          <div className="flex flex-col gap-6 items-center justify-center py-6 border-t border-white/10">
            <div className="font-['Inter'] font-normal text-[#ece8f1] text-base leading-[24px] text-center">
              &copy; {new Date().getFullYear()}. JCI Continental Lagos. All
              Rights Reserved
            </div>
            <div className="flex gap-3 items-center justify-center">
              <Link
                href="/terms"
                className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
              >
                Term of Use
              </Link>
              <Separator className="h-10 bg-white/10" orientation="vertical" />
              <Link
                href="/privacy"
                className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
              >
                Privacy & Security
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col gap-20">
          {/* Main Footer Content */}
          <div className="flex justify-between w-full">
            {/* Logo Section */}
            <div className="flex flex-col gap-10 h-[207.362px]">
              <div className="h-[86.775px] w-[180px]">
                <ObserverImage
                  src={images.footerLogo}
                  alt="JCI Continental Lagos"
                  className="w-full h-full"
                  imageClassName="!object-contain"
                />
              </div>
              <div className="flex gap-3 items-center">
                <Location variant="Bold" size={13.5} color="#f3fcff" />
                <span className="font-['Inter'] font-normal text-[#ece8f1] text-lg leading-[26px]">
                  Lagos, Nigeria
                </span>
              </div>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-[21px] items-start justify-start w-[157px]">
              <h3 className="font-['Space_Grotesk'] font-bold text-white text-xl leading-[28px]">
                Resources
              </h3>
              <div className="flex flex-col gap-1 items-start justify-start">
                {footerLinks.resources.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* JCI CL */}
            <div className="flex flex-col gap-[21px] items-start justify-start">
              <h3 className="font-['Space_Grotesk'] font-bold text-white text-xl leading-[28px]">
                JCI CL
              </h3>
              <div className="flex flex-col gap-1 items-start justify-start">
                {footerLinks.about.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-[21px] items-start justify-start w-[183px]">
              <h3 className="font-['Space_Grotesk'] font-bold text-white text-xl leading-[28px]">
                Social Links
              </h3>
              <div className="flex flex-wrap gap-[15.333px] items-center justify-start pt-3 w-full">
                {socialLinks.map(social => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className="bg-[#fcf9ec] p-[11.5px] rounded-[11.5px] hover:bg-[#fcf9ec]/80 transition-colors"
                  >
                    <social.Icon className="h-[21.25px] w-[23px] text-primary" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex h-[74px] items-center justify-between py-6 border-t border-white/10">
            <div className="font-['Inter'] font-normal text-[#ece8f1] text-lg leading-[26px] text-center">
              &copy; {new Date().getFullYear()}. JCI Continental Lagos. All
              Rights Reserved
            </div>
            <div className="flex gap-3 h-10 items-center justify-start">
              <Link
                href="/terms"
                className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
              >
                Term of Use
              </Link>
              <Separator
                className="h-10 bg-white/10"
                orientation="vertical"
              />
              <Link
                href="/privacy"
                className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
              >
                Privacy & Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
