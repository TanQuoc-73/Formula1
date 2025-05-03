"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Component điều hướng desktop
const DesktopNav = ({ user, handleLogout, isDropdownOpen, setIsDropdownOpen }) => {
  return (
    <ul className="hidden md:flex space-x-6 text-white items-center">
      <li>
        <Link href="/" className="hover:text-red-200">
          Home
        </Link>
      </li>
      <li>
        <Link href="/news" className="hover:text-red-200">
          News
        </Link>
      </li>
      <li>
        <Link href="/races" className="hover:text-red-200">
          Race
        </Link>
      </li>
      <li>
        <Link href="/about" className="hover:text-red-200">
          About
        </Link>
      </li>
      <li>
        <Link href="/teams-drivers" className="hover:text-red-200">
          Teams/Drivers
        </Link>
      </li>
      {user ? (
        <li className="relative">
          <button
            className="flex items-center space-x-2 text-white hover:text-red-200"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>
              {user.firstName} {user.lastName}
            </span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2">
              <li>
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
              </li>
              {user.role === "Admin" && (
                <li>
                  <Link
                    href="/admin"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}
              {user.role === "QuanLy" && (
                <li>
                  <Link
                    href="/manager"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Manager Dashboard
                  </Link>
                </li>
              )}
              <li>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </li>
      ) : (
        <li>
          <Link href="/signin" className="hover:text-red-200">
            Sign In
          </Link>
        </li>
      )}
    </ul>
  );
};

// Component điều hướng mobile
const MobileNav = ({ user, handleLogout }) => {
  return (
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
            <Link
              href="/teams-drivers/standings"
              className="block hover:text-red-200"
            >
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
      {user ? (
        <>
          <li className="font-semibold">
            {user.firstName || user.userName}
          </li>
          <li>
            <Link href="/profile" className="block hover:text-red-200">
              Profile
            </Link>
          </li>
          {user.role === "Admin" && (
            <li>
              <Link href="/admin" className="block hover:text-red-200">
                Admin Dashboard
              </Link>
            </li>
          )}
          {user.role === "QuanLy" && (
            <li>
              <Link href="/manager" className="block hover:text-red-200">
                Manager Dashboard
              </Link>
            </li>
          )}
          <li>
            <button
              className="block w-full text-left hover:text-red-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link href="/signin" className="block hover:text-red-200">
            Sign In
          </Link>
        </li>
      )}
    </ul>
  );
};

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Lấy thông tin user từ localStorage khi component khởi tạo
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    router.push("/");
  };

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
                width={80}
                height={80}
                priority
              />
              <span className="ml-2 text-2xl font-bold text-white">
                FORMULA1
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <DesktopNav
            user={user}
            handleLogout={handleLogout}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-red-200 focus:outline-none"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <MobileNav user={user} handleLogout={handleLogout} />}
      </div>
    </nav>
  );
}