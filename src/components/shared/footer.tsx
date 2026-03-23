'use client';

import { Location } from 'iconsax-react';
import Link from 'next/link';

import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';
import { Separator } from '../ui/separator';
import { useMembershipModal } from '@/context/membership-modal-context';

const footerLinks = {
  resources: [
    { name: 'Home', href: '/' },
    { name: 'Newsletter', href: '/newsletter' },
  ],
  about: [
    { name: 'Our Story', href: '/about' },
    { name: 'What We Do', href: '/what-we-do' },
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
    icon: images.instagramIcon,
    href: 'https://www.instagram.com/jcicontinentallagos/',
  },
  {
    name: 'Facebook',
    icon: images.facebookIcon,
    href: 'https://www.facebook.com/JCIcontinental/',
  },
  {
    name: 'LinkedIn',
    icon: images.linkedinIcon,
    href: 'https://www.linkedin.com/company/jcicontinentallagos/',
  },
  {
    name: 'Twitter',
    icon: images.twitterIcon,
    href: 'https://x.com/jcicontinental',
  },
  {
    name: 'YouTube',
    icon: images.youtubeIcon,
    href: 'https://www.youtube.com/@JCIContinentalLagos',
  },
  {
    name: 'Gmail',
    icon: images.gmailIcon,
    href: '#',
  },
];

export function Footer() {
  const { setOpen: openMembershipModal } = useMembershipModal();

  return (
    <footer className="bg-[#001319] relative py-24 overflow-hidden">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${images.footerBackgroundImage.src})`,
          width: '100%',
          height: '100%',
        }}
      />

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        {/* Mobile Layout */}
        <div className="flex flex-col gap-15 md:hidden">
          {/* Logo Section */}
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="h-[86.775px] w-[180px]">
              <ObserverImage
                src={images.logo}
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
                About JCI Continental Lagos
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
            <div className="flex flex-col gap-4 items-center justify-center w-full">
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
            </div>

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
                      <div className="w-[23px] h-[21.25px] relative">
                        <ObserverImage
                          src={social.icon}
                          alt={social.name}
                          imageClassName="object-contain"
                          className="w-full h-full"
                        />
                      </div>
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
                      <div className="w-[23px] h-[21.25px] relative">
                        <ObserverImage
                          src={social.icon}
                          alt={social.name}
                          imageClassName="object-contain"
                          className="w-full h-full"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Mobile Stacked */}
          <div className="flex flex-col gap-6 items-center justify-center py-6 border-t border-[#dddad7]">
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
              <Separator className="h-10" orientation="vertical" />
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
          <div className="flex items-start justify-between w-full">
            {/* Logo Section */}
            <div className="flex flex-col gap-10 h-[207.362px]">
              <div className="h-[86.775px] w-[180px]">
                <ObserverImage
                  src={images.logo}
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

            {/* Navigation Links */}
            <div className="flex gap-10 items-start justify-start">
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

              {/* About JCI */}
              <div className="flex flex-col gap-[21px] items-start justify-start">
                <h3 className="font-['Space_Grotesk'] font-bold text-white text-xl leading-[28px]">
                  About JCI Continental Lagos
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

              {/* More */}
              <div className="flex flex-col gap-[21px] items-start justify-center w-[167px]">
                <h3 className="font-['Space_Grotesk'] font-bold text-white text-xl leading-[28px]">
                  More
                </h3>
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  {footerLinks.more.map(link =>
                    'action' in link ? (
                      <button
                        key={link.name}
                        onClick={() => openMembershipModal(true)}
                        className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors cursor-pointer text-left"
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
                      <div className="w-[23px] h-[21.25px] relative">
                        <ObserverImage
                          src={social.icon}
                          alt={social.name}
                          imageClassName="object-contain"
                          className="w-full h-full"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex h-[74px] items-center justify-between py-6 border-t border-[#dddad7]">
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
              <Separator className="h-10" orientation="vertical" />
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
