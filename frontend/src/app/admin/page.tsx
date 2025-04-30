// admin/page.tsx
"use client";

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';
import { useAdminData } from '@/hooks/useAdminData';
import { useState } from 'react';
import { Team, Driver, Column, SortConfig } from '@/types';

export default function AdminDashboard() {
  const { teams, drivers, loading, error } = useAdminData();
  const [sortConfig, setSortConfig] = useState<SortConfig<Team | Driver> | null>(null);

  const handleSort = <T,>(key: keyof T) => {
    setSortConfig((prev) =>
      prev && prev.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }
    );
  };

  const teamColumns: Column<Team>[] = [
    { label: 'ID', key: 'teamId', sortable: true },
    { label: 'Name', key: 'teamName', sortable: true },
    { label: 'Base Location', key: 'baseLocation', sortable: true },
    { label: 'Total Point', key: 'totalPoints', sortable: true },
  ];

  const driverColumns: Column<Driver>[] = [
    { label: 'ID', key: 'driverId', sortable: true },
    { label: 'Name', key: 'driverName', sortable: true },
    { label: 'Nationality', key: 'nationality', sortable: true },
    { label: 'Team', key: 'teamName', sortable: true },
  ];

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen mt-4">
      <NavBar />
      <div className="flex flex-1 mt-16">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="space-y-8">
              <Table title="Teams" data={teams} columns={teamColumns} sortConfig={sortConfig} onSort={handleSort} getKey={(t) => t.teamId} />
              <Table title="Drivers" data={drivers} columns={driverColumns} sortConfig={sortConfig} onSort={handleSort} getKey={(d) => d.driverId} />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
