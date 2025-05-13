"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Car, Flag, Trophy, Menu,Clipboard, Hand} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Tong quan", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Cac doi", href: "/admin/teams", icon: <Users className="h-5 w-5" /> },
    { label: "Tay dua", href: "/admin/drivers", icon: <Car className="h-5 w-5" /> },
    { label: "Duong dua", href: "/admin/races", icon: <Flag className="h-5 w-5" /> },
    { label: "Ket qua dua", href: "/admin/race-results", icon: <Trophy className="h-5 w-5" /> },


  ];

  const menuItems2 = [
    { label: "Menu1", href: "/admin/1", icon: <Menu className="h-5 w-5" /> },
    { label: "Menu2", href: "/admin/2", icon: <Clipboard className="h-5 w-5" /> },
    { label: "Menu3", href: "/admin/3", icon: <Hand className="h-5 w-5" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 h-[calc(100vh-4rem)] top-16">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mt-5"> Quan ly formula 1 </h2>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  isActive ? "bg-gray-200 text-gray-900" : "text-gray-700"
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
       <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mt-10">Cac lua chon khac</h2>
      </div>
      <nav className="space-y-2">
        {menuItems2.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  isActive ? "bg-gray-200 text-gray-900" : "text-gray-700"
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