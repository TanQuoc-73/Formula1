"use client";

import { useNews } from "@/hooks/useNews";
import NewsCard from "@/components/NewsCard";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function NewsPage() {
  const { newsList, loading, error } = useNews();

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <NavBar />
      <main className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Formula 1 News
        </h1>

        {/* Loading State */}
        {loading && <p className="text-center text-blue-500">Loading...</p>}

        {/* Error State */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* News List */}
        {!loading && !error && newsList.length > 0 ? (
          <div className="space-y-4">
            {newsList.map((news) => (
              <NewsCard key={news.newsId} news={news} />
            ))}
          </div>
        ) : (
          !loading && !error && <p className="text-center text-gray-500">No news available.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
