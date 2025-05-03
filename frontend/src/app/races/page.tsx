"use client";

import React, { useState, useMemo } from "react";
import { useRaces } from "@/hooks/useRaces";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterRaces } from "@/services/raceService";

export default function RacesPage() {
  const { races, loading, error } = useRaces();
  const [searchTerm, setSearchTerm] = useState("");
  const [seasonFilter, setSeasonFilter] = useState<string>("");

  // Lấy các season khác nhau từ dữ liệu
  const seasons = useMemo(() => {
    const set = new Set<string>();
    races.forEach((race) => {
      if (race.season) set.add(race.season);
    });
    return Array.from(set);
  }, [races]);

  // Sử dụng service filterRaces để lọc danh sách cuộc đua
  const filteredRaces = useMemo(() => {
    return filterRaces(races, searchTerm, seasonFilter);
  }, [races, searchTerm, seasonFilter]);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <NavBar />
      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <h1 className="text-3xl font-bold text-center mb-8">Race Schedule</h1>

        {/* Phần bộ lọc */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <Input
            type="text"
            placeholder="Tìm kiếm tên cuộc đua..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2"
          />
          <Select value={seasonFilter} onValueChange={(value) => setSeasonFilter(value)}>
            <SelectTrigger className="w-full sm:w-1/4">
              <SelectValue placeholder="Lọc theo season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {seasons.map((season) => (
                <SelectItem key={season} value={season}>
                  {season}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => { setSearchTerm(""); setSeasonFilter("all"); }}>
            Clear
          </Button>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-36 w-full rounded-xl" />
            ))}
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRaces.map((race) => (
              <Card key={race.raceId} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{race.raceName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    📅 {new Date(race.raceDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm">🏁 Track: {race.track?.trackName}</p>
                  <p className="text-sm">📍 Location: {race.track?.location}</p>
                  <p className="text-sm">🗓️ Season: {race.season}</p>
                </CardContent>
              </Card>
            ))}
            {filteredRaces.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">
                No races found.
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
