"use client";

import { useAdminData } from "@/hooks/useAdminData";
import { useState } from "react";
import { Team, Driver, Column, SortConfig } from "@/types";
// Shadcn UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowUpDown } from "lucide-react";

export default function AdminDashboard() {
  const { teams, drivers, loading, error } = useAdminData();
  const [sortConfig, setSortConfig] = useState<SortConfig<Driver> | null>(null);

  const handleSort = <T,>(key: keyof T) => {
    setSortConfig((prev) =>
      prev && prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  const sortData = <T extends Driver>(data: T[], key: keyof T, direction: "asc" | "desc") => {
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const driverColumns: Column<Driver>[] = [
    { label: "ID", key: "driverId", sortable: true },
    { label: "Name", key: "driverName", sortable: true },
    { label: "Nationality", key: "nationality", sortable: true },
    { label: "Team", key: "teamName", sortable: true },
  ];

  const sortedDrivers = sortConfig
    ? sortData(drivers, sortConfig.key as keyof Driver, sortConfig.direction)
    : drivers;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tổng quan Drivers</CardTitle>
        </CardHeader>
        <CardContent>
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
                        {column.sortable && <ArrowUpDown className="h-4 w-4" />}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}