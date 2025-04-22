"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

// Định nghĩa các interface
interface CurrentUser {
  role: string;
  // Có thể thêm các thuộc tính khác nếu cần
}

interface Team {
  teamId: number;
  teamName: string;
  baseLocation: string;
  totalPoints: number;
}

interface Driver {
  driverId: number;
  driverName: string;
  nationality: string;
  teamName: string;
}

type Column<T> = {
  label: string;
  render: (item: T) => React.ReactNode;
};

export default function Admin() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  // Kiểm tra vai trò Admin và lấy dữ liệu
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/signin');
      return;
    }

    const parsedUser: CurrentUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'Admin') {
      router.push('/');
      return;
    }

    setUser(parsedUser);

    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
      try {
        setLoading(true);
        const [teamsRes, driversRes] = await Promise.all([
          fetch('http://localhost:8080/api/teams'),
          fetch('http://localhost:8080/api/drivers'),
        ]);

        if (!teamsRes.ok || !driversRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const teamsData: Team[] = await teamsRes.json();
        const driversData: Driver[] = await driversRes.json();

        setTeams(teamsData);
        setDrivers(driversData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Hàm hiển thị bảng dữ liệu generic
  const renderTable = <T,>(
    title: string,
    data: T[],
    columns: Column<T>[],
    keyExtractor: (item: T) => string | number
  ) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      {data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                {columns.map((col, index) => (
                  <th key={index} className="px-4 py-2 text-left text-gray-600">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={keyExtractor(item)} className="border-b hover:bg-gray-50">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-2">
                      {col.render(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  // Định nghĩa các cột cho bảng Teams
  const teamColumns: Column<Team>[] = [
    { label: 'ID', render: (team) => team.teamId },
    { label: 'Name', render: (team) => team.teamName },
    { label: 'Base Location', render: (team) => team.baseLocation },
    { label: 'Total Point', render: (team) => team.totalPoints },
  ];

  // Định nghĩa các cột cho bảng Drivers
  const driverColumns: Column<Driver>[] = [
    { label: 'ID', render: (driver) => driver.driverId },
    { label: 'Name', render: (driver) => driver.driverName },
    { label: 'Nationality', render: (driver) => driver.nationality },
    { label: 'Team', render: (driver) => driver.teamName },
  ];

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <NavBar />
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-8">
            {/* Danh sách đội đua */}
            {renderTable('Teams', teams, teamColumns, (team) => team.teamId)}
            {/* Danh sách tay đua */}
            {renderTable('Drivers', drivers, driverColumns, (driver) => driver.driverId)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}