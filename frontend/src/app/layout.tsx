import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"; // Import Toaster từ sonner

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Formula1 HAU - Trang quản lý đua xe F1",
    template: "%s | Formula1 HAU"
  },
  description: "Hệ thống quản lý thông tin đua xe Công thức 1 - Đại học HAU",
  keywords: ["Formula1", "F1", "Đua xe", "HAU", "Quản lý"],
  authors: [{ name: "Nhóm phát triển HAU" }],
  openGraph: {
    title: "Formula1 HAU",
    description: "Hệ thống quản lý thông tin đua xe Công thức 1",
    url: "https://f1-hau.vercel.app",
    siteName: "Formula1 HAU",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      }
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {children}
        <Toaster position="top-right" richColors expand visibleToasts={5} />
      </body>
    </html>
  );
}