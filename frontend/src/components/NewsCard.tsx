import { News } from "@/types/news";

interface NewsCardProps {
  news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold">{news.title}</h2>
      <p className="text-gray-600">{new Date(news.publishedDate).toLocaleDateString()}</p>
      {/* {news.imageUrl && <img src={news.imageUrl} alt={news.title} className="w-full h-48 object-cover mt-2 rounded-md" />} */}
      <p className="mt-2">{news.content}</p>
    </div>
  );
};

export default NewsCard;
