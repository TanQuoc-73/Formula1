import axios from "axios";
import { News } from "@/types/news";

const API_BASE_URL = "http://localhost:8080/api/news"; 

// Lấy danh sách tin tức
export const getNewsAPI = async (): Promise<News[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Lấy chi tiết một tin tức theo ID
export const getNewsByIdAPI = async (id: number): Promise<News> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Tạo tin tức mới
export const createNewsAPI = async (newsData: Partial<News>) => {
  const response = await axios.post(API_BASE_URL, newsData);
  return response.data;
};

// Cập nhật tin tức
export const updateNewsAPI = async (id: number, newsData: Partial<News>) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, newsData);
  return response.data;
};

// Xóa tin tức
export const deleteNewsAPI = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
