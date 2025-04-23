"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Định nghĩa các interface
interface CurrentUser {
  role: string;
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
  key: keyof T;
  sortable?: boolean;
};

type SortConfig<T> = {
  key: keyof T;
  direction: 'asc' | 'desc';
};

export default function Admin() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig<Team | Driver> | null>(null);
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

  // Hàm sắp xếp dữ liệu
  const sortData = <T,>(data: T[], config: SortConfig<T> | null): T[] => {
    if (!config) return data;
    const { key, direction } = config;
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Hàm xử lý sự kiện sắp xếp
  const handleSort = <T,>(key: keyof T) => {
    setSortConfig((prevConfig) => {
      if (prevConfig && prevConfig.key === key) {
        return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  // Hàm hiển thị bảng dữ liệu
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
                {columns.map((col) => (
                  <th
                    key={col.key as string}
                    className="px-4 py-2 text-left text-gray-600 cursor-pointer"
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center">
                      {col.label}
                      {col.sortable && (
                        <span className="ml-1">
                          {sortConfig?.key === col.key ? (
                            sortConfig.direction === 'asc' ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )
                          ) : (
                            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-2 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortData(data, sortConfig).map((item) => (
                <tr key={keyExtractor(item)} className="border-b hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key as string} className="px-4 py-2">
                      {String(item[col.key])}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
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
    { label: 'ID', key: 'teamId', sortable: true },
    { label: 'Name', key: 'teamName', sortable: true },
    { label: 'Base Location', key: 'baseLocation', sortable: true },
    { label: 'Total Point', key: 'totalPoints', sortable: true },
  ];

  // Định nghĩa các cột cho bảng Drivers
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
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Admin Menu</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/admin" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin/teams" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/admin/drivers" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                  Driver
                </Link>
              </li>
              <li>
                <Link href="/admin/races" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                  Race
                </Link>
              </li>
              <li>
                <Link href="/admin/race-results" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                  Race Result
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="space-y-8">
              {renderTable('Teams', teams, teamColumns, (team) => team.teamId)}
              {renderTable('Drivers', drivers, driverColumns, (driver) => driver.driverId)}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}