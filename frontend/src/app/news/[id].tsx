"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { News } from "@/types/news";
import { getNewsByIdAPI } from "@/services/newsService";
import NewsCard from "@/components/NewsCard";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NewsDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      console.log("Invalid ID:", id);
      setLoading(false);
      setError("ID tin tức không hợp lệ");
      return;
    }

    const fetchNews = async () => {
      try {
        const data = await getNewsByIdAPI(Number(id));
        setNews(data);
      } catch (err: any) {
        console.error("Error in NewsDetail:", err.message);
        setError(err.message || "Không thể tải tin tức");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <NavBar />
      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">Đang tải tin tức...</p>
        </div>
      </main>
      <Footer />
    </div>
  );

  if (error || !news) return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <NavBar />
      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-red-600">Lỗi: {error || "Không tìm thấy tin tức"}</p>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <NavBar />
      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <NewsCard news={news} />
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Nội dung chi tiết
              </h2>
              <p className="text-gray-700 leading-relaxed">{news.content}</p>
              {(news.race || news.team) && (
                <div className="mt-4 flex gap-4 text-sm text-gray-600">
                  {news.race && <span>Cuộc đua: {news.race.name}</span>}
                  {news.team && <span>Đội: {news.team.name}</span>}
                </div>
              )}
              <div className="mt-6">
                <Link
                  href="/news"
                  className="inline-block text-red-950 font-semibold hover:text-red-700"
                >
                  ← Quay lại danh sách tin tức  
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}