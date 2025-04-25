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
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-950 to-red-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to Formula 1
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Experience the thrill of the world’s most exciting motorsport. Follow the drivers, teams, and races.
            </p>
            <Link
              href="/about"
              className="inline-block bg-white text-red-950 px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-200 hover:text-white transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Featured Section: Drivers, Teams, Races */}
        <section className="w-full py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Formula 1 Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-red-950 mb-4">Drivers</h3>
                <p className="text-gray-600">
                  Meet the world's best drivers, the heart and soul of every race.
                </p>
                <Link
                  href="/drivers"
                  className="text-red-950 font-semibold hover:underline mt-4 block"
                >
                  Learn More
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-red-950 mb-4">Teams</h3>
                <p className="text-gray-600">
                  Get to know the teams that engineer, race, and push the limits of performance.
                </p>
                <Link
                  href="/teams"
                  className="text-red-950 font-semibold hover:underline mt-4 block"
                >
                  Learn More
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-red-950 mb-4">Races</h3>
                <p className="text-gray-600">
                  Discover upcoming races and results from the thrilling circuits around the world.
                </p>
                <Link
                  href="/races"
                  className="text-red-950 font-semibold hover:underline mt-4 block"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section: Drivers, Teams, Races */}
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

        {/* Upcoming Races Section */}
        {/*Thông tin mẫumẫu*/}
        <section className="bg-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Upcoming Races
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-red-950">Australian Grand Prix</h3>
                <p className="text-gray-600">Melbourne, Australia - 18 Mar 2023</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-red-950">Bahrain Grand Prix</h3>
                <p className="text-gray-600">Sakhir, Bahrain - 25 Mar 2023</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-red-950">Spanish Grand Prix</h3>
                <p className="text-gray-600">Barcelona, Spain - 10 Apr 2023</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <Footer />
      </main>
    </div>
  );
}
