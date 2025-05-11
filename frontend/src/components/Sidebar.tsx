"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Car, Flag, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Teams", href: "/admin/teams", icon: <Users className="h-5 w-5" /> },
    { label: "Drivers", href: "/admin/drivers", icon: <Car className="h-5 w-5" /> },
    { label: "Races", href: "/admin/races", icon: <Flag className="h-5 w-5" /> },
    { label: "Race Results", href: "/admin/race-results", icon: <Trophy className="h-5 w-5" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 h-[calc(100vh-4rem)] top-16">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Admin Menu</h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  isActive ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}