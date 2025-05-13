import { Newspaper } from 'lucide-react';
import { News } from '../types/news';

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="news-card">
      <div className="news-header">
        <Newspaper size={24} color="blue" />
        <h2>{news.title}</h2>
      </div>
      <p>{news.content.substring(0, 100)}...</p>
      <p>Published: {new Date(news.publishedDate).toLocaleDateString()}</p>
      <p>Author: {news.author?.firstName} {news.author?.lastName}</p>
      {news.imageUrl && <img src={news.imageUrl} alt={news.title} className="news-image" />}
      <div className="news-details">
        {news.race && <span>Race: {news.race.raceName}</span>}
        {news.team && <span>Team: {news.team.teamName}</span>}
      </div>
      <style jsx>{`
        .news-card {
          border: 1px solid #ddd;
          padding: 16px;
          margin: 10px 0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .news-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .news-image {
          max-width: 100%;
          height: auto;
          margin: 10px 0;
        }
        .news-details span {
          margin-right: 10px;
          color: #666;
        }
      `}</style>
    </div>
  );
}