// services/scheduleService.ts
import axios from "axios";
import { Schedule } from "@/types/schedule";

const API_BASE_URL = "http://localhost:8080/api/schedules";

// Lấy danh sách lịch thi đấu
export const getSchedulesAPI = async (): Promise<Schedule[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch schedules: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
};

// Lấy chi tiết một lịch thi đấu theo ID
export const getScheduleByIdAPI = async (id: number): Promise<Schedule> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch schedule by ID: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
};

// Tạo lịch thi đấu mới
export const createScheduleAPI = async (schedule: Partial<Schedule>): Promise<Schedule> => {
  try {
    const response = await axios.post(API_BASE_URL, schedule, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to create schedule: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
};

// Cập nhật lịch thi đấu
export const updateScheduleAPI = async (id: number, schedule: Partial<Schedule>): Promise<Schedule> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, schedule, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to update schedule: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
};

// Xóa lịch thi đấu
export const deleteScheduleAPI = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    if (response.status !== 204) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error: any) {
    throw new Error(`Failed to delete schedule: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
  }
};