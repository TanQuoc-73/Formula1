// services/scheduleService.ts
import axios from "axios";
import { Schedule } from "@/types/schedule";

const API_URL = "http://localhost:8080/api/schedules";

export const getSchedulesAPI = async (): Promise<Schedule[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getScheduleByIdAPI = async (id: number): Promise<Schedule> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createScheduleAPI = async (schedule: Partial<Schedule>): Promise<Schedule> => {
  const response = await axios.post(API_URL, schedule);
  return response.data;
};

export const updateScheduleAPI = async (id: number, schedule: Partial<Schedule>): Promise<Schedule> => {
  const response = await axios.put(`${API_URL}/${id}`, schedule);
  return response.data;
};

export const deleteScheduleAPI = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};