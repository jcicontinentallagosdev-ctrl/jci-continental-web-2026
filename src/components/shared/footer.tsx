import ObserverImage from '@/components/shared/obs-image';
import { images } from '@/constants';
import { Location } from 'iconsax-react';
import { Separator } from '../ui/separator';

const footerLinks = {
  resources: [
    { name: 'Home', href: '/' },
    { name: 'Media', href: '/media' },
    { name: 'E-Books', href: '/e-books' },
    { name: 'Brand Kits', href: '/brand-kits' },
  ],
  about: [
    { name: 'Our Story', href: '/about' },
    { name: 'Career Opportunities', href: '/careers' },
    { name: 'Contact JCI Continental Lagos', href: '/contact' },
  ],
  more: [
    { name: 'Become A Member', href: '/become-member' },
    { name: 'Become A Partner', href: '/become-partner' },
    { name: 'Become A Sponsor', href: '/become-sponsor' },
    { name: 'Join Tech Team', href: '/join-tech-team' },
  ],
};

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: images.whatsappIcon,
    href: '#',
  },
  {
    name: 'Facebook',
    icon: images.facebookIcon,
    href: '#',
  },
  {
    name: 'LinkedIn',
    icon: images.linkedinIcon,
    href: '#',
  },
  {
    name: 'Twitter',
    icon: images.twitterIcon,
    href: '#',
  },
  {
    name: 'YouTube',
    icon: images.youtubeIcon,
    href: '#',
  },
  {
    name: 'Gmail',
    icon: images.gmailIcon,
    href: '#',
  },
];

export function Footer() {
  return (
    <footer className="bg-[#001319] relative py-24 overflow-hidden">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${images.footerBackgroundImage.src})`,
          width: '100%',
          height: '100%',
          // transform: 'translateY(-617px)',
        }}
      />

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="flex flex-col gap-20">
          {/* Main Footer Content */}
          <div className="flex items-start justify-between w-full">
            {/* Logo Section */}
            <div className="flex flex-col gap-10 h-[207.362px]">
              <div className="h-[86.775px] w-[180px]">
                <ObserverImage
                  src={images.logo}
                  alt="JCI Continental Lagos"
                  className="w-full h-full object-contain"
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
                    <a
                      key={link.name}
                      href={link.href}
                      className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
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
                    <a
                      key={link.name}
                      href={link.href}
                      className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* More */}
              <div className="flex flex-col gap-[21px] items-start justify-center w-[167px]">
                <h3 className="font-['Space_Grotesk'] font-bold text-white text-xl leading-[28px]">
                  More
                </h3>
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  {footerLinks.more.map(link => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
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
                    <a
                      key={social.name}
                      href={social.href}
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
                    </a>
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
              <a
                href="/terms"
                className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
              >
                Term of Use
              </a>
              <Separator className="h-10" orientation="vertical" />
              <a
                href="/privacy"
                className="py-2 font-['Inter'] font-normal text-[#f3fcff] text-base leading-[24px] hover:text-white transition-colors"
              >
                Privacy & Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
