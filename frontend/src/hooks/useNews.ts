// hooks/useNews.ts
import { useState, useEffect } from "react";
import { News } from "@/types/news";
import { getNewsAPI, deleteNewsAPI } from "@/services/newsService";

export const useNews = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await getNewsAPI();
      setNewsList(data);
    } catch (err) {
      setError("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id: number) => {
    try {
      setLoading(true);
      await deleteNewsAPI(id);
      await fetchNews(); 
    } catch (err) {
      setError("Failed to delete news");
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    newsList,
    loading,
    error,
    fetchNews,
    deleteNews, // Make sure to include this in return object
  };
};