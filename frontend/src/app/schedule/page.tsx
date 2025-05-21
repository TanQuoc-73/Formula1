// app/schedule/page.tsx
"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Schedule } from "@/types/schedule";
import { getSchedulesAPI } from "@/services/scheduleService";

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getSchedulesAPI();
        // Sắp xếp theo eventDate (gần nhất trước)
        const sortedSchedules = data.sort((a, b) =>
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        );
        setSchedules(sortedSchedules);
      } catch (err: any) {
        setError(err.message || "Không thể tải lịch thi đấu");
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  // Ngày hiện tại để kiểm tra trạng thái
  const currentDate = new Date("2025-05-21T13:07:00+07:00");

  if (loading) {
    return (
      <div className="flex flex-col bg-gray-200 min-h-screen">
        <NavBar />
        <main className="flex-grow py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-600">Đang tải lịch thi đấu...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !schedules.length) {
    return (
      <div className="flex flex-col bg-gray-200 min-h-screen">
        <NavBar />
        <main className="flex-grow py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-red-600">
              {error || "Không có lịch thi đấu nào."}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen mt-20">
      <NavBar />
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Lịch Thi Đấu Formula 1
          </h1>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-red-950 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Sự kiện
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Cuộc đua
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Địa điểm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Ngày
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Giờ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schedules.map((schedule) => {
                    const eventDateTime = new Date(
                      `${schedule.eventDate}T${schedule.eventTime || "00:00:00"}+07:00`
                    );
                    const isUpcoming = eventDateTime > currentDate;
                    return (
                      <tr
                        key={schedule.scheduleId}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {schedule.eventName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {schedule.race.raceName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {schedule.race.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(schedule.eventDate).toLocaleDateString(
                            "vi-VN",
                            { day: "2-digit", month: "2-digit", year: "numeric" }
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {schedule.eventTime ? schedule.eventTime.slice(0, 5) : "--:--"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              isUpcoming
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {isUpcoming ? "Sắp diễn ra" : "Đã kết thúc"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}