// services/scheduleService.ts
import { Schedule } from "@/types/schedule";

const API_BASE_URL = "http://localhost:8080/api/schedules";

// Lấy danh sách lịch thi đấu
export const getSchedulesAPI = async (): Promise<Schedule[]> => {
  console.log(`Fetching schedules from: ${API_BASE_URL}`);
  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(`Response status: ${response.status}`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to fetch schedules: ${errorText}`);
    throw new Error(`Failed to fetch schedules: ${response.status} - ${errorText || "Unknown error"}`);
  }

  const data = await response.json();
  console.log("Response data:", data);
  return data as Schedule[];
};

// Lấy chi tiết một lịch thi đấu theo ID
export const getScheduleByIdAPI = async (id: number): Promise<Schedule> => {
  console.log(`Fetching schedule with id: ${id} from: ${API_BASE_URL}/${id}`);
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(`Response status: ${response.status}`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to fetch schedule with id ${id}: ${errorText}`);
    throw new Error(`Failed to fetch schedule: ${response.status} - ${errorText || "Unknown error"}`);
  }

  const data = await response.json();
  console.log("Response data:", data);
  return data as Schedule;
};

// Tạo lịch thi đấu mới
export const createScheduleAPI = async (schedule: Partial<Schedule>): Promise<Schedule> => {
  console.log("Creating schedule with data:", schedule);
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });

  console.log(`Response status: ${response.status}`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to create schedule: ${errorText}`);
    throw new Error(`Failed to create schedule: ${response.status} - ${errorText || "Unknown error"}`);
  }

  const data = await response.json();
  console.log("Created schedule:", data);
  return data as Schedule;
};

// Cập nhật lịch thi đấu
export const updateScheduleAPI = async (id: number, schedule: Partial<Schedule>): Promise<Schedule> => {
  console.log(`Updating schedule with id: ${id}, data:`, schedule);
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });

  console.log(`Response status: ${response.status}`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to update schedule with id ${id}: ${errorText}`);
    throw new Error(`Failed to update schedule: ${response.status} - ${errorText || "Unknown error"}`);
  }

  const data = await response.json();
  console.log("Updated schedule:", data);
  return data as Schedule;
};

// Xóa lịch thi đấu
export const deleteScheduleAPI = async (id: number): Promise<void> => {
  console.log(`Deleting schedule with id: ${id}`);
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(`Response status: ${response.status}`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to delete schedule with id ${id}: ${errorText}`);
    throw new Error(`Failed to delete schedule: ${response.status} - ${errorText || "Unknown error"}`);
  }
};