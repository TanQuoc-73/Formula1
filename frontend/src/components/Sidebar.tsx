"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  Flag, 
  Trophy, 
  Settings,
  Calendar,
  BarChart2,
  Shield,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "../../public/images/logof1.png"; 

export default function Sidebar() {
  const pathname = usePathname();


  //Menu1
  const primaryMenu = [
    { 
      label: "Tổng quan", 
      href: "/admin", 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      label: "Đội đua", 
      href: "/admin/teams", 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      label: "Tay đua", 
      href: "/admin/drivers", 
      icon: <Car className="h-5 w-5" /> 
    },
    { 
      label: "Chặng đua", 
      href: "/admin/races", 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      label: "Kết quả", 
      href: "/admin/results", 
      icon: <Flag className="h-5 w-5" /> 
    },
    { 
      label: "BXH", 
      href: "/admin/standings", 
      icon: <BarChart2 className="h-5 w-5" /> 
    },
  ];


  // Phan menu 2
  const secondaryMenu = [
    { 
      label: "Tin moi", 
      href: "/admin/news", 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      label: "Quy định", 
      href: "/admin/regulations", 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      label: "An toàn", 
      href: "/admin/safety", 
      icon: <Shield className="h-5 w-5" /> 
    },
    { 
      label: "Cài đặt", 
      href: "/admin/settings", 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 h-[calc(100vh-4rem)] top-16 sticky">
      <div className="mb-6 flex items-center space-x-2">
        {/* <Logo className="h-8 w-8" /> */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Formula 1 Admin
        </h2> 
      </div>
      
      <nav className="space-y-1 mb-8">
        {primaryMenu.map((item) => (
          <Link key={item.href} href={item.href} passHref>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                pathname === item.href && "bg-gray-100 dark:bg-gray-800 font-medium text-gray-900 dark:text-white"
              )}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>
      

      {/*Phan quan ly khac*/}
      <div className="mb-2 px-2">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Quản lý khác
        </h3>
      </div>
      
      <nav className="space-y-1">
        {secondaryMenu.map((item) => (
          <Link key={item.href} href={item.href} passHref>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                pathname === item.href && "bg-gray-100 dark:bg-gray-800 font-medium text-gray-900 dark:text-white"
              )}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}