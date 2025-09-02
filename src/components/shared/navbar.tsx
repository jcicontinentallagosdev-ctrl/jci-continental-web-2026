import React from 'react';

import { Button } from '@/components/ui/button';
import { images } from '@/constants/images';
import { cn } from '@/lib/utils';

import ObserverImage from './obs-image';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const navItems = [
    { label: 'Home', href: '/', isActive: true },
    { label: 'About Us', href: '/about' },
    { label: 'What We Do', href: '/what-we-do' },
    { label: 'Our People', href: '/our-people' },
  ];

  return (
    <nav className={`navbar ${className}`}>
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
        <div className="navbar-menu">
          {navItems.map(item => (
            <div
              key={item.label}
              className={cn('navbar-item group cursor-pointer')}
            >
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
          ))}
        </div>

        {/* CTA Button */}
        <Button variant="default" className="navbar-cta-button">
          Become A Member
        </Button>
      </div>
    </nav>
  );
}
