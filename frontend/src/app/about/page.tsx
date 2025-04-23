"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col bg-gray-200 min-h-screen mt-5">
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-950 to-red-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Formula 1
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Formula 1 is the pinnacle of motorsport, combining cutting-edge technology, unparalleled speed, and global passion. Learn about our history, mission, and what drives us forward.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-red-950 px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-200 hover:text-white transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  The Birth of Formula 1
                </h3>
                <p className="text-gray-600">
                  Founded in 1950, Formula 1 began as a championship to showcase the world’s best drivers and cutting-edge car technology. The inaugural race at Silverstone marked the start of a global phenomenon.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Evolution Over Decades
                </h3>
                <p className="text-gray-600">
                  From the turbo-charged 1980s to the hybrid era of today, Formula 1 has continually pushed the boundaries of engineering, safety, and entertainment, captivating millions worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Our Mission & Vision
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description:
                    "Drive technological advancements that redefine motorsport and inspire industries worldwide.",
                  icon: "M9 12h6m-3-3v6m9-3c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z",
                },
                {
                  title: "Sustainability",
                  description:
                    "Lead the charge towards a net-zero future with eco-friendly technologies and sustainable practices.",
                  icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  title: "Global Passion",
                  description:
                    "Unite fans across the globe through thrilling races and unforgettable moments.",
                  icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gray-100 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
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
                      d={item.icon}
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="bg-red-950 text-white py-16 mb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join the Formula 1 Journey
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
              Be part of the fastest sport on earth. Follow races, support your favorite teams, and experience the thrill of Formula 1.
            </p>
            <Link
              href="/signin"
              className="inline-block bg-white text-red-950 px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-200 hover:text-white transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}