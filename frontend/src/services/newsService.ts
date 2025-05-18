import axios from "axios";
import { News } from "@/types/news";

const API_BASE_URL = "http://localhost:8080/api/news";

// Lấy danh sách tin tức
export const getNewsAPI = async (): Promise<News[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch news: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
};

// Lấy chi tiết một tin tức theo ID
export const getNewsByIdAPI = async (id: number): Promise<News> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch news by ID: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
};

// Tạo tin tức mới
export const createNewsAPI = async (newsData: Partial<News>) => {
  try {
    const response = await axios.post(API_BASE_URL, newsData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create news: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
};

// Cập nhật tin tức
export const updateNewsAPI = async (id: number, newsData: Partial<News>) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, newsData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update news: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
};

// Xóa tin tức
export const deleteNewsAPI = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    if (response.status !== 204) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to delete news: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
};