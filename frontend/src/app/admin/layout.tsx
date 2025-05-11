import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <div className="flex flex-1 mt-16">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 ">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}