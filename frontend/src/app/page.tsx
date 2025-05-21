"use client"

import { useState } from "react";
import { useNews } from "@/hooks/useNews";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("drivers");
  const { newsList, loading, error } = useNews();

  // Dữ liệu giả lập cho Upcoming Races (có thể thay thế bằng API)
  const upcomingRaces = [
    { name: "Monaco Grand Prix", date: "2025-05-25T14:00:00", location: "Monte Carlo" },
    { name: "Italian Grand Prix", date: "2025-06-01T14:00:00", location: "Monza" },
    { name: "Canadian Grand Prix", date: "2025-06-08T14:00:00", location: "Montreal" },
  ];

  // Dữ liệu giả lập cho Drivers/Teams (có thể thay thế bằng API)
  const topDrivers = [
    { name: "Max Verstappen", team: "Red Bull Racing", points: 125 },
    { name: "Lewis Hamilton", team: "Mercedes", points: 110 },
    { name: "Charles Leclerc", team: "Ferrari", points: 95 },
  ];
  const topTeams = [
    { name: "Red Bull Racing", points: 210 },
    { name: "Ferrari", points: 180 },
    { name: "Mercedes", points: 165 },
  ];

  const menuContents = {
    drivers: (
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Top Drivers</h3>
        <ul className="space-y-3">
          {topDrivers.map((driver, index) => (
            <li key={index} className="text-gray-600">
              {driver.name} ({driver.team}) - {driver.points} điểm
            </li>
          ))}
        </ul>
        <Link href="/drivers" className="text-red-950 font-semibold hover:text-red-700 mt-4 inline-block">
          Xem tất cả tay đua →
        </Link>
      </div>
    ),
    teams: (
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Top Teams</h3>
        <ul className="space-y-3">
          {topTeams.map((team, index) => (
            <li key={index} className="text-gray-600">
              {team.name} - {team.points} điểm
            </li>
          ))}
        </ul>
        <Link href="/teams" className="text-red-950 font-semibold hover:text-red-700 mt-4 inline-block">
          Xem tất cả đội đua →
        </Link>
      </div>
    ),
    races: (
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Races</h3>
        <ul className="space-y-3">
          {upcomingRaces.map((race, index) => (
            <li key={index} className="text-gray-600">
              {race.name} - {new Date(race.date).toLocaleDateString("vi-VN")} - {race.location}
            </li>
          ))}
        </ul>
        <Link href="/schedule" className="text-red-950 font-semibold hover:text-red-700 mt-4 inline-block">
          Xem lịch đua →
        </Link>
      </div>
    ),
  };

  // Sắp xếp newsList theo publishedDate (mới nhất lên đầu)
  const sortedNewsList = [...newsList].sort((a, b) => {
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });

  // Lấy 5 tin tức mới nhất cho danh sách mini
  const miniNewsList = sortedNewsList.slice(0, 5);

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow mt-5">
        {/* Hero Section with Video Background */}
        <section className="relative h-[60vh] w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/video/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay để text dễ đọc */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Formula 1 2025 – Đón xem các cuộc đua đỉnh cao!
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-4">
                Trải nghiệm cảm giác hồi hộp của môn thể thao tốc độ hấp dẫn nhất thế giới.
              </p>
              <p className="text-md text-gray-300 mb-8">
                Cuộc đua tiếp theo: Monaco Grand Prix – 25/05/2025
              </p>
              <Link
                href="/schedule"
                className="inline-block bg-white text-red-950 px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-200 hover:text-white transition-all duration-300"
              >
                Xem lịch đua
              </Link>
            </div>
          </div>
        </section>

        {/* Two-Column Section: Left (Highlight), Right (Mini News) */}
        <section className="bg-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Highlight Content */}
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Đếm ngược đến Monaco Grand Prix
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Chỉ còn 4 ngày nữa! Cuộc đua tại Monte Carlo sẽ diễn ra vào ngày 25/05/2025. Đừng bỏ lỡ!
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tay đua dẫn đầu
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Max Verstappen (Red Bull Racing) - 125 điểm
                  </p>
                  <Link
                    href="/standings"
                    className="inline-block text-red-950 font-semibold hover:text-red-700"
                  >
                    Xem bảng xếp hạng →
                  </Link>
                </div>
              </div>

              {/* Right Column: Mini News List */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Tin tức mới nhất
                  </h2>
                  {loading && (
                    <p className="text-gray-600">Đang tải tin tức...</p>
                  )}
                  {error && (
                    <p className="text-red-600">Lỗi: {error}</p>
                  )}
                  {!loading && !error && miniNewsList.length === 0 && (
                    <p className="text-gray-600">Không có tin tức nào.</p>
                  )}
                  {!loading && !error && miniNewsList.length > 0 && (
                    <div className="space-y-4">
                      {miniNewsList.map((news) => (
                        <Link key={news.newsId} href={`/news/${news.newsId}`}>
                          <div className="flex items-start space-x-3 border-b border-gray-200 pb-3 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                            {news.imageUrl && (
                              <img
                                src={news.imageUrl}
                                alt={news.title}
                                className="w-12 h-12 object-cover rounded-md"
                              />
                            )}
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                                {news.title}
                              </h3>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(news.publishedDate).toLocaleDateString("vi-VN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div className="text-center mt-4">
                        <Link
                          href="/news"
                          className="text-red-950 text-sm font-semibold hover:text-red-700"
                        >
                          Xem tất cả tin tức →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
            {!loading && !error && sortedNewsList.length === 0 && (
              <p className="text-center text-gray-600">Không có tin tức nào.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedNewsList.slice(0, 6).map((news) => (
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
                  {selectedMenu === item && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-red-950"></span>
                  )}
                </button>
              ))}
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingRaces.map((race, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{race.name}</h3>
                  <p className="text-gray-600 mt-2">
                    {new Date(race.date).toLocaleDateString("vi-VN")} - {race.location}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/schedule"
                className="inline-block bg-red-950 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition-all duration-300"
              >
                Xem Lịch Đua Đầy Đủ
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Đăng ký nhận thông báo
            </h2>
            <p className="text-gray-600 mb-6">
              Nhận tin tức mới nhất về Formula 1, lịch đua, và kết quả trực tiếp!
            </p>
            <form className="flex justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-950"
              />
              <button
                type="submit"
                className="bg-red-950 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-all duration-300"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </section>

        {/* Footer Section */}
        <Footer />
      </main>
    </div>
  );
}