"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-red-950/95 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logof1.png"
                alt="Formula 1 Logo"
                width={40}
                height={40}
                priority
              />
              <span className="ml-2 text-2xl font-bold text-white">FORMULA1</span>
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <ul className="hidden md:flex space-x-6 text-white">
            <li>
              <Link href="/" className="hover:text-red-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/races" className="hover:text-red-200">
                Races
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-red-200">
                News
              </Link>
            </li>
            <li>
              <Link href="/teams-drivers" className="hover:text-red-200">
                Teams/Drivers
              </Link>
            </li>
            <li>
              <Link href="/signin" className="hover:text-red-200">
                Sign In
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-red-200 focus:outline-none"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="md:hidden bg-red-950/95 text-white px-4 pb-4 space-y-4">
            <li>
              <Link href="/" className="block hover:text-red-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/races" className="block hover:text-red-200">
                Races
              </Link>
              <ul className="pl-4 space-y-2">
                <li>
                  <Link href="/races/calendar" className="block hover:text-red-200">
                    Calendar
                  </Link>
                </li>
                <li>
                  <Link href="/races/results" className="block hover:text-red-200">
                    Results
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/news" className="block hover:text-red-200">
                News
              </Link>
            </li>
            <li>
              <Link href="/teams-drivers" className="block hover:text-red-200">
                Teams/Drivers
              </Link>
              <ul className="pl-4 space-y-2">
                <li>
                  <Link href="/teams-drivers/standings" className="block hover:text-red-200">
                    Standings
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/videos" className="block hover:text-red-200">
                Videos/Highlights
              </Link>
            </li>
            <li>
              <Link href="/shop" className="block hover:text-red-200">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/community" className="block hover:text-red-200">
                Community
              </Link>
            </li>
            <li>
              <Link href="/about" className="block hover:text-red-200">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block hover:text-red-200">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/signin" className="block hover:text-red-200">
                Sign In
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}