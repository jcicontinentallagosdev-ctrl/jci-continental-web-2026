'use client';

import React, { useMemo, useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { images } from '@/constants/images';
import { cn } from '@/lib/utils';

import ObserverImage from './obs-image';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = useMemo(() => {
    return [
      { label: 'Home', href: '/', isActive: pathname === '/' },
      { label: 'About Us', href: '/about', isActive: pathname === '/about' },
      {
        label: 'What We Do',
        href: '/what-we-do',
        isActive: pathname === '/what-we-do',
      },
      {
        label: 'Our People',
        href: '/our-people',
        isActive: pathname === '/our-people',
      },
    ];
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // shadow-[0px_2px_15px_0px_#0000001A]

  return (
    <div
      className={cn(
        'bg-[#FEFFFF] overflow-hidden transition-all duration-300',
        'fixed top-0 left-0 right-0 z-50',
        {
          'lg:h-[100px] h-[521px]': isMobileMenuOpen,
          'lg:h-[100px] h-[77px]': !isMobileMenuOpen,
          'shadow-[0px_2px_15px_0px_rgba(0,0,0,0.1)]': isScrolled,
        }
      )}
    >
      <nav className={cn(`navbar lg:h-[100px] h-[77px]`, className)}>
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <ObserverImage
              src={images.logo}
              alt="logo"
              className="w-24 h-[46.28px] object-cover"
            />
          </div>

          {/* Navigation Menu */}
          <div className="navbar-menu lg:flex hidden">
            {navItems.map(item => (
              <Link href={item.href} key={item.label}>
                <div className={cn('navbar-item group cursor-pointer')}>
                  <div className="navbar-item-text">{item.label}</div>
                  <div
                    className={cn('navbar-item-indicator', {
                      block: item.isActive,
                      'animate-in group-hover:block hidden': !item.isActive,
                    })}
                  >
                    <div className="navbar-item-indicator-line">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 4"
                        fill="none"
                      >
                        <path d="M0 2L100 2" stroke="#e4c03d" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            variant="default"
            className="navbar-cta-button lg:flex hidden"
            onClick={() =>
              window.open('https://forms.gle/stSuRhn9sGTUm15G8', '_blank')
            }
          >
            Become A Member
          </Button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="lg:hidden cursor-pointer rounded-[8px] grid place-items-center w-10 h-[33px] bg-white"
          >
            <svg
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5H6M1 5.5H11M6 9.5H11"
                stroke="#026C8E"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className="lg:hidden bg-[#feffff] z-50">
        {/* Mobile Menu Content */}
        <div className="flex gap-2 items-center justify-center px-6 py-10">
          <div className="flex flex-col gap-10 items-center justify-center w-[327px]">
            {/* Navigation Items */}
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              {navItems.map(item => (
                <Link className="w-full" href={item.href} key={item.label}>
                  <div
                    className={cn(
                      'flex flex-col h-14 items-center justify-center p-[8px] rounded-[12px] w-full cursor-pointer',
                      {
                        'bg-[#e6f5fa]': !item.isActive,
                        'bg-transparent': item.isActive,
                      }
                    )}
                  >
                    <div className="font-inter font-normal text-[#546165] text-[18px] leading-[26px] whitespace-pre">
                      {item.label}
                    </div>
                    {item.isActive && (
                      <div
                        className={cn('navbar-item-indicator', {
                          block: item.isActive,
                          'animate-in group-hover:block hidden': !item.isActive,
                        })}
                      >
                        <div className="navbar-item-indicator-line">
                          <div className="h-[1px] w-[80%] mx-auto mt-2 bg-[#e4c03d]"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile CTA Button */}
            <Button
              variant="default"
              className="w-full flex navbar-cta-button"
              onClick={() =>
                window.open('https://forms.gle/stSuRhn9sGTUm15G8', '_blank')
              }
            >
              Become A Member
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
