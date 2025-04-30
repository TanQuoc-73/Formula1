"use client";

import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar"; // Thêm NavBar
import Footer from "@/components/Footer"; // Thêm Footer
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

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

  useEffect(() => {
    fetch("/api/teams-with-drivers")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  const filteredTeams = teams.filter(
    (team) =>
      team.teamName.toLowerCase().includes(search.toLowerCase()) ||
      team.drivers.some((driver) =>
        driver.driverName.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      {/* Thêm NavBar */}
      <NavBar />

      {/* Nội dung chính với layout tương tự AuthPage */}
      <div className="flex-grow flex items-center justify-center bg-gray-100 py-12 mt-20">
        <div className="w-full max-w-7xl px-6">
          <div className="flex items-center gap-4 mb-6">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
              placeholder="Tìm kiếm đội đua hoặc tay đua..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <Card
                key={team.teamId}
                className="shadow-lg rounded-2xl border"
              >
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold text-red-600">
                    {team.teamName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    📍 {team.baseLocation}
                  </p>
                  <p className="text-sm">🏆 {team.numChampTitles} danh hiệu</p>
                  <p className="text-sm">🔢 {team.totalPoints} điểm</p>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-semibold">Tay đua:</h3>
                    {team.drivers.map((driver) => (
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
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Thêm Footer */}
      <Footer />
    </div>
  );
}