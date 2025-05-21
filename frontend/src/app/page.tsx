"use client"

import { useState } from "react";
import { useNews } from "@/hooks/useNews"; // Giả sử hook nằm trong @/hooks/useNews
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";
import NewsCard from "@/components/NewsCard"; // Giả sử NewsCard nằm trong @/components/NewsCard

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("drivers");
  const { newsList, loading, error } = useNews(); // Sử dụng hook useNews

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

        {/* News Section */}
        <section className="bg-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Tin Tức Mới Nhất
            </h2>
            {loading && (
              <p className="text-center text-gray-600">Đang tải tin tức...</p>
            )}
            {error && (
              <p className="text-center text-red-600">Lỗi: {error}</p>
            )}
            {!loading && !error && newsList.length === 0 && (
              <p className="text-center text-gray-600">Không có tin tức nào.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsList.map((news) => (
                <Link key={news.newsId} href={`/news/${news.newsId}`}>
                  <NewsCard news={news} />
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/news"
                className="inline-block bg-red-950 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition-all duration-300"
              >
                Xem Tất Cả Tin Tức
              </Link>
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
        <section className="bg-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Các Cuộc Đua Sắp Tới
            </h2>
            {/* Nội dung Upcoming Races sẽ được thêm sau */}
          </div>
        </section>

        {/* Footer Section */}
        <Footer />
      </main>
    </div>
  );
}