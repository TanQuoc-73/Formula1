"use client";

import { useNews } from "@/hooks/useNews";
import NewsCard from "@/components/NewsCard";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function NewsPage() {
  const { newsList, loading, error } = useNews();

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
          Formula 1 News
        </h1>

        {/* Error State */}
        {error && (
          <p className="text-center text-red-600 bg-red-50 py-3 rounded-lg shadow-sm">
            {error}
          </p>
        )}

        {/* Loading State with Skeleton */}
        {loading && (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-4"
              >
                <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-lg"></div>
                <div className="w-full md:w-2/3 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* News List */}
        {!loading && !error && newsList.length > 0 ? (
          <div className="space-y-6">
            {newsList.map((news) => (
              <NewsCard key={news.newsId} news={news} />
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <p className="text-center text-gray-500 bg-white py-6 rounded-lg shadow-sm">
              Chưa có tin tức nào.
            </p>
          )
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}