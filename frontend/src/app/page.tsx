"use client"

import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  // State to track the selected menu item
  const [selectedMenu, setSelectedMenu] = useState("drivers");

  // Content for each menu item
  const menuContents = {
    drivers: (
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Driver</h3>
        <p className="text-gray-600">
          Discover our talented drivers who bring passion and precision to every race.
        </p>
      </div>
    ),
    teams: (
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Team</h3>
        <p className="text-gray-600">
          Meet the dedicated teams behind the scenes, working tirelessly to achieve excellence.
        </p>
      </div>
    ),
    races: (
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Race</h3>
        <p className="text-gray-600">
          Explore our upcoming races and relive the thrilling moments from past events.
        </p>
      </div>
    ),
  };

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow mt-5">
        <section className="bg-gradient-to-r from-red-950 to-red-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to Your Company
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Discover innovative solutions that empower your future. Join us to
              transform ideas into reality.
            </p>
            <Link
              href="/about"
              className="inline-block bg-white text-red-950 px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-200 hover:text-white transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Menu Section */}
        <section className="bg-red-800 w-screen py-6 flex justify-center items-center">
          <div className="bg-white w-8/12 rounded-lg shadow-lg">
            {/* Menu Items */}
            <div className="flex justify-around border-b border-gray-200">
              {["drivers", "teams", "races"].map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedMenu(item)}
                  className={`rounded-lg relative flex-1 py-4 text-center text-lg font-semibold capitalize transition-all duration-300 ${
                    selectedMenu === item
                      ? "text-red-950 bg-red-100"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item}
                  {/* Bottom border highlight effect */}
                  {selectedMenu === item && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-red-950"></span>
                  )}
                </button>
              ))}
            </div>
            {/* Dynamic Content */}
            <div className="bg-white rounded-b-lg">
              {menuContents[selectedMenu]}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovative Solutions",
                  description:
                    "Leverage cutting-edge technology to solve complex problems.",
                  icon: "M9 12h6m-3-3v6m9-3c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z",
                },
                {
                  title: "Expert Team",
                  description:
                    "Work with a dedicated team of professionals to achieve your goals.",
                  icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                },
                {
                  title: "Global Reach",
                  description:
                    "Connect with a worldwide network to expand your opportunities.",
                  icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <svg
                    className="h-12 w-12 text-red-950 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={feature.icon}
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="bg-red-950 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
              Join our community today and take the first step towards innovation.
            </p>
            <Link
              href="/signin"
              className="inline-block bg-white text-red-950 px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-200 hover:text-white transition-all duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}