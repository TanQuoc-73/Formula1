"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
// import HistorySection from "@/components/HistorySection";
import Map from "@/components/Map";
import useLocation from "@/hooks/useLocation";
import { fetchLocationData } from "@/services/locationService";


export default function About() {
  const location = useLocation();
  
  return (
    <div className="flex flex-col bg-gray-200 min-h-screen mt-5">
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        {/* <HistorySection /> */}
        {location && <p className="text-center">Current Location: {location.lat}, {location.lon}</p>}
        <Map/>
      </main>
      <Footer />
    </div>
  );
}
