"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Kiểm tra vai trò Admin và lấy dữ liệu
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/signin');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'Admin') {
      router.push('/');
      return;
    }

    setUser(parsedUser);

    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, teamsRes, driversRes] = await Promise.all([
          fetch('http://localhost:8080/api/users'),
          fetch('http://localhost:8080/api/teams'),
          fetch('http://localhost:8080/api/drivers'),
        ]);

        if (!usersRes.ok || !teamsRes.ok || !driversRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const usersData = await usersRes.json();
        const teamsData = await teamsRes.json();
        const driversData = await driversRes.json();

        setUsers(usersData);
        setTeams(teamsData);
        setDrivers(driversData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Hàm hiển thị bảng dữ liệu
  const renderTable = (title, data, columns) => (
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
              {data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-2">
                      {col.key === 'role' ? item[col.key]?.name : item[col.key] || '-'}
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
            {/* Danh sách người dùng */}
            {renderTable(
              'Users',
              users,
              [
                { label: 'ID', key: 'userId' },
                { label: 'Username', key: 'userName' },
                { label: 'First Name', key: 'firstName' },
                { label: 'Last Name', key: 'lastName' },
                { label: 'Role', key: 'role' },
                { label: 'Created At', key: 'createdAt' },
              ]
            )}

            {/* Danh sách đội đua */}
            {renderTable(
              'Teams',
              teams,
              [
                { label: 'ID', key: 'teamId' },
                { label: 'Name', key: 'name' },
                { label: 'Nationality', key: 'nationality' },
                { label: 'Founded Year', key: 'foundedYear' },
              ]
            )}

            {/* Danh sách tay đua */}
            {renderTable(
              'Drivers',
              drivers,
              [
                { label: 'ID', key: 'driverId' },
                { label: 'Name', key: 'name' },
                { label: 'Nationality', key: 'nationality' },
                { label: 'Team', key: 'teamName' },
              ]
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}