"use client";

import { fetchNews } from '@/services/newsService';
import NewsCard from '@/components/NewsCard';
import { News } from '@/types/news';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default async function NewsPage() {
  // let newsList: News[] = [];

  // try {
  //   newsList = await fetchNews();
  // } catch (error) {
  //   console.error('Failed to fetch news:', error);
  // }

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
          <NavBar />
      {/* <h1>Latest Formula 1 News</h1>
      {newsList.length > 0 ? (
        newsList.map((news) => <NewsCard key={news.newsId} news={news} />)
      ) : (
        <p>No news available.</p>
      )}
      <style jsx>{`
        .news-container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          color: #333;
          margin-bottom: 20px;
        }
      `}</style> */}
      <Footer />
    </div>
  );
}