import axios from 'axios';
import { News } from '../types/news';

const API_URL = 'http://localhost:8080/api/news';

export const fetchNews = async () => {
  try {
    const response = await axios.get<News[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};