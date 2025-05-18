import { News } from "@/types/news";

interface NewsCardProps {
  news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row gap-4">
      {/* Hình ảnh */}
      {news.imageUrl ? (
        <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Không có hình ảnh</span>
        </div>
      )}

      {/* Nội dung tin tức */}
      <div className="w-full md:w-2/3 space-y-2">
        <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {news.title}
        </h2>
        <p className="text-sm text-gray-500">
          {new Date(news.publishedDate).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}{" "}
          {news.author && `• ${news.author.username}`}
        </p>
        <p className="text-gray-700 line-clamp-3">{news.content}</p>
        {(news.race || news.team) && (
          <div className="flex gap-2 text-sm text-gray-600">
            {news.race && <span>Cuộc đua: {news.race.name}</span>}
            {news.team && <span>Đội: {news.team.name}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;