"use client";

import { useAdminData } from "@/hooks/useAdminData";
import { useState } from "react";
import { Team, Driver, Column, SortConfig } from "@/types";
// import Chatbot from "@/components/Chatbot"; 
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users, Car, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { teams, drivers, loading, error } = useAdminData();
  const [sortConfig, setSortConfig] = useState<SortConfig<Driver> | null>(null);

  const stats = {
    totalTeams: teams?.length || 0,
    totalDrivers: drivers?.length || 0,
    totalRaces: "chưa có dữ liệu", 
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

      {/* Tổng quan số liệu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tổng số Đội</CardTitle>
            <Users className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalTeams}</p>
            <Link href="/admin/teams">
              <Button variant="link" className="mt-2 p-0">
                Xem chi tiết
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tổng số Tay Đua</CardTitle>
            <Car className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalDrivers}</p>
            <Link href="/admin/drivers">
              <Button variant="link" className="mt-2 p-0">
                Xem chi tiết
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tổng số Cuộc Đua</CardTitle>
            <Flag className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalRaces}</p>
            <Link href="/admin/races">
              <Button variant="link" className="mt-2 p-0">
                Xem chi tiết
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Chatbot mới
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chatbot />
      </div> */}
    </div>
  );
}