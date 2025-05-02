import React from 'react';
import { Button } from '@/components/ui/button';

export default function SocialButtons() {
  return (
    <div className="flex justify-center gap-4">
      <Button variant="outline" size="icon" className="rounded-full">
        <svg className="h-6 w-6" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
          />
        </svg>
      </Button>
      <Button variant="outline" size="icon" className="rounded-full">
        <svg className="h-6 w-6" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325v21.351C0 23.407 0.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463 0.099 2.795 0.143v3.24l-1.918 0.001c-1.504 0-1.795 0.715-1.795 1.763v2.313h3.587l-0.467 3.622h-3.12V24h6.116c0.732 0 1.323-0.593 1.323-1.325V1.325C24 0.593 23.407 0 22.675 0z"
          />
        </svg>
      </Button>
    </div>
  );
}