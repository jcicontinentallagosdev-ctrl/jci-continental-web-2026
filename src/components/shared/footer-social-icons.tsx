import React from 'react';

import { cn } from '@/lib/utils';

type IconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

export function InstagramIcon({ className, title = 'Instagram', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      aria-label={title}
      role="img"
      className={cn('h-5 w-5', className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M80,10c-38.659,0 -70,31.341 -70,70v96c0,38.659 31.341,70 70,70h96c38.659,0 70,-31.341 70,-70v-96c0,-38.659 -31.341,-70 -70,-70zM194,54c6.627,0 12,5.373 12,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627 5.373,-12 12,-12zM128,74c29.823,0 54,24.177 54,54c0,29.823 -24.177,54 -54,54c-29.823,0 -54,-24.177 -54,-54c0,-29.823 24.177,-54 54,-54zM128,84c-24.301,0 -44,19.699 -44,44c0,24.301 19.699,44 44,44c24.301,0 44,-19.699 44,-44c0,-24.301 -19.699,-44 -44,-44z"
      />
    </svg>
  );
}

export function FacebookIcon({ className, title = 'Facebook', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 12 17"
      aria-label={title}
      role="img"
      className={cn('h-5 w-5', className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.75 0.15625H9.08333C6.32191 0.15625 4.08333 2.39483 4.08333 5.15625V6.35417H0.25V9.89583H4.08333V16.0938H7.91667V9.89583H11.75V6.35417H7.91667V4.69792C7.91667 4.14563 8.36438 3.69792 8.91667 3.69792H11.75V0.15625Z"
      />
    </svg>
  );
}

export function LinkedInIcon({ className, title = 'LinkedIn', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 19 18"
      aria-label={title}
      role="img"
      className={cn('h-5 w-5', className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.25098 17.9795H0.417969V6.02637H4.25098V17.9795ZM10.959 6.02637V6.77148C11.5585 6.57572 12.2039 6.46875 12.876 6.46875C16.0516 6.46875 18.626 8.84724 18.626 11.7812V17.9795H14.793V11.7812C14.793 10.8032 13.9345 10.0107 12.876 10.0107C11.8174 10.0107 10.959 10.8032 10.959 11.7812V17.9795H7.12598V6.02637H10.959ZM2.33398 0.270508C3.39253 0.270508 4.25098 1.06399 4.25098 2.04199C4.25079 3.01985 3.39241 3.8125 2.33398 3.8125C1.27571 3.81234 0.418159 3.01975 0.417969 2.04199C0.417969 1.06409 1.27559 0.27067 2.33398 0.270508Z"
      />
    </svg>
  );
}

export function TwitterXIcon({ className, title = 'X (Twitter)', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      aria-label={title}
      role="img"
      className={cn('h-5 w-5', className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M224.5,33h-41.6l-46.8,54.2l-37.2,-54.2h-69l72.2,105.3l-76.2,88.7h41.6l53.7,-62.2l42.6,62.2h69l-77.5,-113.1zM84.2,49h13.3l74.3,108h-13.3z"
      />
    </svg>
  );
}

export function YouTubeIcon({ className, title = 'YouTube', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 22 17"
      aria-label={title}
      role="img"
      className={cn('h-5 w-5', className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M17.7412 0.739746C19.9502 0.739878 21.7412 2.53069 21.7412 4.73975V12.6772C21.7412 14.8863 19.9502 16.6771 17.7412 16.6772H4.92578C2.7168 16.6771 0.925781 14.8863 0.925781 12.6772V4.73975C0.925782 2.53072 2.7168 0.739933 4.92578 0.739746H17.7412ZM9.87793 5.82275C9.21539 5.51669 8.45923 6.00024 8.45898 6.72998V10.687C8.45923 11.4168 9.21539 11.9003 9.87793 11.5942L14.1602 9.6167C14.9343 9.25907 14.9343 8.15793 14.1602 7.80029L9.87793 5.82275Z"
      />
    </svg>
  );
}

export function GmailIcon({ className, title = 'Email', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 17"
      aria-label={title}
      role="img"
      className={cn('h-5 w-5', className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M19.248 12.6772C19.248 14.8864 17.4572 16.6772 15.248 16.6772H4.08203C1.87289 16.6772 0.0820312 14.8864 0.0820312 12.6772V6.13037L6.87598 10.6958C8.56226 11.8289 10.7668 11.8287 12.4531 10.6958L19.248 6.12939V12.6772ZM15.248 0.739746C17.1321 0.739746 18.7106 2.04269 19.1348 3.79639L11.3379 9.03564C10.3261 9.71529 9.00293 9.71546 7.99121 9.03564L0.194336 3.79639C0.61843 2.04258 2.19791 0.739746 4.08203 0.739746H15.248Z"
      />
    </svg>
  );
}

