"use client"

import { useState, useEffect } from "react";
import { useNews } from "@/hooks/useNews";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import { Schedule } from "@/types/schedule";
import { getSchedulesAPI } from "@/services/scheduleService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("drivers");
  const { newsList, loading: newsLoading, error: newsError } = useNews();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [schedulesLoading, setSchedulesLoading] = useState(true);
  const [schedulesError, setSchedulesError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Fetch schedules
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getSchedulesAPI();
        const sortedSchedules = data.sort((a, b) =>
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        );
        setSchedules(sortedSchedules);
      } catch (err: any) {
        setSchedulesError(err.message || "Không thể tải lịch thi đấu");
      } finally {
        setSchedulesLoading(false);
      }
    };
    fetchSchedules();
  }, []);

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
        {schedulesLoading ? (
          <p className="text-gray-600">Đang tải...</p>
        ) : schedulesError ? (
          <p className="text-red-600">{schedulesError}</p>
        ) : (
          <>
            <ul className="space-y-3">
              {schedules
                .filter((schedule) => {
                  const eventDateTime = new Date(
                    `${schedule.eventDate}T${schedule.eventTime || "00:00:00"}+07:00`
                  );
                  return eventDateTime > new Date("2025-05-21T13:25:00+07:00");
                })
                .slice(0, 3)
                .map((schedule) => (
                  <li key={schedule.scheduleId} className="text-gray-600">
                    {schedule.race.raceName} -{" "}
                    {new Date(schedule.eventDate).toLocaleDateString("vi-VN")} -{" "}
                    {schedule.race.location}
                  </li>
                ))}
            </ul>
            <Link href="/schedule" className="text-red-950 font-semibold hover:text-red-700 mt-4 inline-block">
              Xem lịch đua →
            </Link>
          </>
        )}
      </div>
    ),
  };

  // Sắp xếp newsList theo publishedDate (mới nhất lên đầu)
  const sortedNewsList = [...newsList].sort((a, b) => {
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });

  // Lấy 5 tin tức mới nhất cho danh sách mini
  const miniNewsList = sortedNewsList.slice(0, 5);

  // Lọc 3 lịch thi đấu sắp tới cho Upcoming Races Section
  const upcomingSchedules = schedules
    .filter((schedule) => {
      const eventDateTime = new Date(
        `${schedule.eventDate}T${schedule.eventTime || "00:00:00"}+07:00`
      );
      return eventDateTime > new Date("2025-05-21T13:25:00+07:00");
    })
    .slice(0, 3);

  // Hàm mở modal
  const openModal = (news: any) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setSelectedNews(null);
    setIsModalOpen(false);
  };

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
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Formula 1 2025 – Đón xem các cuộc đua đỉnh cao!
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-4">
                Trải nghiệm cảm giác hồi hộp của môn thể thao tốc độ hấp dẫn nhất thế giới.
              </p>
              <p className="text-md text-gray-300 mb-8">
                Cuộc đua tiếp theo: {upcomingSchedules[0]?.race.raceName || "Chưa có lịch"} –{" "}
                {upcomingSchedules[0]?.eventDate
                  ? new Date(upcomingSchedules[0].eventDate).toLocaleDateString("vi-VN")
                  : ""}
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
                    Đếm ngược đến {upcomingSchedules[0]?.race.raceName || "cuộc đua tiếp theo"}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {upcomingSchedules[0]
                      ? `Chỉ còn 4 ngày nữa! Cuộc đua tại ${upcomingSchedules[0].race.location} sẽ diễn ra vào ngày ${new Date(
                          upcomingSchedules[0].eventDate
                        ).toLocaleDateString("vi-VN")}. Đừng bỏ lỡ!`
                      : "Chưa có lịch thi đấu sắp tới."}
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
                  {newsLoading && (
                    <p className="text-gray-600">Đang tải tin tức...</p>
                  )}
                  {newsError && (
                    <p className="text-red-600">Lỗi: {newsError}</p>
                  )}
                  {!newsLoading && !newsError && miniNewsList.length === 0 && (
                    <p className="text-gray-600">Không có tin tức nào.</p>
                  )}
                  {!newsLoading && !newsError && miniNewsList.length > 0 && (
                    <div className="space-y-4">
                      {miniNewsList.map((news) => (
                        <div
                          key={news.newsId}
                          onClick={() => openModal(news)}
                          className="flex items-start space-x-3 border-b border-gray-200 pb-3 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                        >
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
            {newsLoading && (
              <p className="text-center text-gray-600">Đang tải tin tức...</p>
            )}
            {newsError && (
              <p className="text-center text-red-600">Lỗi: {newsError}</p>
            )}
            {!newsLoading && !newsError && sortedNewsList.length === 0 && (
              <p className="text-center text-gray-600">Không có tin tức nào.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedNewsList.slice(0, 6).map((news) => (
                <div
                  key={news.newsId}
                  onClick={() => openModal(news)}
                  className="cursor-pointer"
                >
                  <NewsCard news={news} />
                </div>
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

            {/* Modal cho tin tức chi tiết */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="sm:max-w-md max-w-[90vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    {selectedNews?.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    {selectedNews?.publishedDate
                      ? new Date(selectedNews.publishedDate).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                  {selectedNews?.imageUrl && (
                    <img
                      src={selectedNews.imageUrl}
                      alt={selectedNews.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                  <p className="text-gray-700">
                    {selectedNews?.content || "Không có nội dung chi tiết."}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
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
            {schedulesLoading && (
              <p className="text-center text-gray-600">Đang tải lịch thi đấu...</p>
            )}
            {schedulesError && (
              <p className="text-center text-red-600">Lỗi: {schedulesError}</p>
            )}
            {!schedulesLoading && !schedulesError && upcomingSchedules.length === 0 && (
              <p className="text-center text-gray-600">Không có lịch thi đấu sắp tới.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingSchedules.map((schedule) => (
                <div
                  key={schedule.scheduleId}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {schedule.race.raceName}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {new Date(schedule.eventDate).toLocaleDateString("vi-VN")} -{" "}
                    {schedule.race.location}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {schedule.eventTime ? schedule.eventTime.slice(0, 5) : "--:--"}
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