"use client";

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { useAdminData } from '@/hooks/useAdminData';
import { useState } from 'react';
import { Team, Driver, Column, SortConfig } from '@/types';

// Shadcn UI components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowUpDown } from 'lucide-react';

export default function AdminDashboard() {
  const { teams, drivers, loading, error } = useAdminData();
  const [sortConfig, setSortConfig] = useState<SortConfig<Team | Driver> | null>(null);

  const handleSort = <T,>(key: keyof T) => {
    setSortConfig((prev) =>
      prev && prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const sortData = <T extends Team | Driver>(data: T[], key: keyof T, direction: 'asc' | 'desc') => {
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
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

  const sortedTeams = sortConfig ? sortData(teams, sortConfig.key as keyof Team, sortConfig.direction) : teams;
  const sortedDrivers = sortConfig ? sortData(drivers, sortConfig.key as keyof Driver, sortConfig.direction) : drivers;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <div className="flex flex-1 mt-16">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <Tabs defaultValue="teams" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 md:w-1/3">
                  <TabsTrigger value="teams">Teams</TabsTrigger>
                  <TabsTrigger value="drivers">Drivers</TabsTrigger>
                </TabsList>

                <TabsContent value="teams">
                  <Card>
                    <CardHeader>
                      <CardTitle>Teams</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {teamColumns.map((column) => (
                              <TableHead key={column.key as string}>
                                <button
                                  className="flex items-center space-x-1"
                                  onClick={() => column.sortable && handleSort<Team>(column.key)}
                                >
                                  <span>{column.label}</span>
                                  {column.sortable && (
                                    <ArrowUpDown className="h-4 w-4" />
                                  )}
                                </button>
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedTeams.map((team) => (
                            <TableRow key={team.teamId}>
                              <TableCell>{team.teamId}</TableCell>
                              <TableCell>{team.teamName}</TableCell>
                              <TableCell>{team.baseLocation}</TableCell>
                              <TableCell>{team.totalPoints}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="drivers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Drivers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {driverColumns.map((column) => (
                              <TableHead key={column.key as string}>
                                <button
                                  className="flex items-center space-x-1"
                                  onClick={() => column.sortable && handleSort<Driver>(column.key)}
                                >
                                  <span>{column.label}</span>
                                  {column.sortable && (
                                    <ArrowUpDown className="h-4 w-4" />
                                  )}
                                </button>
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedDrivers.map((driver) => (
                            <TableRow key={driver.driverId}>
                              <TableCell>{driver.driverId}</TableCell>
                              <TableCell>{driver.driverName}</TableCell>
                              <TableCell>{driver.nationality}</TableCell>
                              <TableCell>{driver.teamName}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}