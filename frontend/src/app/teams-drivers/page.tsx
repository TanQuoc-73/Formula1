"use client";

import React, { useState, useEffect, useMemo } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce"; // Cần cài đặt: npm install use-debounce

interface Team {
  teamId: number;
  teamName: string;
  baseLocation: string;
  numChampTitles: number;
  totalPoints: number;
  drivers: Driver[];
}

interface Driver {
  driverId: number;
  driverName: string;
  nationality: string;
  birthDate: string;
  driverPoints: number;
}

export default function TeamDriver() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearch] = useDebounce(search, 300); // Debounce tìm kiếm 300ms

  // Fetch dữ liệu từ backend
  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8080/api/teams-with-drivers");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setTeams(data);
      } catch (err) {
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Lọc dữ liệu với useMemo để tối ưu hiệu suất
  const filteredTeams = useMemo(() => {
    if (!debouncedSearch) return teams;

    return teams.filter(
      (team) =>
        team.teamName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        team.drivers.some(
          (driver) =>
            driver.driverName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            driver.nationality.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
    );
  }, [teams, debouncedSearch]);

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <NavBar />

      <div className="flex-grow flex items-center justify-center bg-gray-100 py-12 mt-20">
        <div className="w-full max-w-7xl px-6">
          {/* Thanh tìm kiếm */}
          <div className="flex items-center gap-4 mb-6">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
              placeholder="Tìm kiếm đội đua, tay đua hoặc quốc tịch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md"
            />
          </div>

          {/* Hiển thị trạng thái loading, lỗi hoặc dữ liệu */}
          {loading ? (
            <p className="text-center text-gray-600">Đang tải...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredTeams.length === 0 ? (
            <p className="text-center text-gray-500">Không tìm thấy đội đua hoặc tay đua nào.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((team) => (
                <Card key={team.teamId} className="shadow-lg rounded-2xl border">
                  <CardContent className="p-4">
                    <h2 className="text-xl font-bold text-red-600">{team.teamName}</h2>
                    <p className="text-sm text-gray-600">📍 {team.baseLocation}</p>
                    <p className="text-sm">🏆 {team.numChampTitles} danh hiệu</p>
                    <p className="text-sm">🔢 {team.totalPoints} điểm</p>
                    <div className="mt-4 space-y-2">
                      <h3 className="font-semibold">Tay đua:</h3>
                      {team.drivers.length === 0 ? (
                        <p className="text-sm text-gray-500">Không có tay đua.</p>
                      ) : (
                        team.drivers.map((driver) => (
                          <div
                            key={driver.driverId}
                            className="bg-gray-100 p-2 rounded-lg"
                          >
                            <p className="font-medium">{driver.driverName}</p>
                            <p className="text-xs text-gray-600">
                              Quốc tịch: {driver.nationality} | Điểm: {driver.driverPoints}
                            </p>
                            <p className="text-xs text-gray-400">
                              Ngày sinh: {new Date(driver.birthDate).toLocaleDateString()}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}