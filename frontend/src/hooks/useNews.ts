import { useEffect, useState } from "react";
import { News } from "@/types/news";
import { getNewsAPI } from "@/services/newsService";

export const useNews = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNewsAPI();
        setNewsList(data);
      } catch (err) {
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { newsList, loading, error };
};
