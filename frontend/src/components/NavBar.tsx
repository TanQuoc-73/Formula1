import React from 'react';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-red-950/95 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white">
                FORMULA1
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6 text-white">
        <li>
          <Link href="/" className="hover:text-red-200">Home</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-red-200">About</Link>
        </li>
        <li>
          <Link href="/signin" className="hover:text-red-200">Sign In</Link>
        </li>
      </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-red-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}