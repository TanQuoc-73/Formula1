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
      setError(null); // Reset error trước khi fetch
      const data = await getNewsAPI();
      setNewsList(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id: number) => {
    try {
      setLoading(true);
      setError(null); // Reset error trước khi delete
      await deleteNewsAPI(id);
      await fetchNews(); // Refresh danh sách sau khi xóa
    } catch (err: any) {
      setError(err.message || "Failed to delete news");
      throw err; // Re-throw để component xử lý
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
    deleteNews,
  };
};