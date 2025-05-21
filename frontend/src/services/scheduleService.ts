// services/scheduleService.ts
import axios from "axios";
import { Schedule } from "@/types/schedule";

const API_BASE_URL = "http://localhost:8080/api/schedules";

export const getSchedulesAPI = async (): Promise<Schedule[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch schedules: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
};