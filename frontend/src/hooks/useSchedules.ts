// hooks/useSchedules.ts
import { useState, useEffect } from "react";
import { Schedule } from "@/types/schedule";
import {
  getSchedulesAPI,
  createScheduleAPI,
  updateScheduleAPI,
  deleteScheduleAPI,
} from "@/services/scheduleService";

export const useSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const data = await getSchedulesAPI();
      setSchedules(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Không thể tải lịch thi đấu");
      console.error("Error fetching schedules:", err);
    } finally {
      setLoading(false);
    }
  };

  const createSchedule = async (schedule: Partial<Schedule>) => {
    try {
      console.log("Creating schedule with data:", JSON.stringify(schedule, null, 2));
      const newSchedule = await createScheduleAPI(schedule);
      setSchedules((prev) => [...prev, newSchedule]);
      return newSchedule; // Trả về newSchedule để sử dụng trong component nếu cần
    } catch (err: any) {
      console.error("Error creating schedule:", err);
      throw new Error(err.message || "Không thể tạo lịch thi đấu");
    }
  };

  const updateSchedule = async (id: number, schedule: Partial<Schedule>) => {
    try {
      console.log("Updating schedule with data:", JSON.stringify(schedule, null, 2));
      const updatedSchedule = await updateScheduleAPI(id, schedule);
      setSchedules((prev) =>
        prev.map((item) => (item.scheduleId === id ? updatedSchedule : item))
      );
      return updatedSchedule; // Trả về updatedSchedule để sử dụng trong component nếu cần
    } catch (err: any) {
      console.error("Error updating schedule:", err);
      throw new Error(err.message || "Không thể cập nhật lịch thi đấu");
    }
  };

  const deleteSchedule = async (id: number) => {
    try {
      console.log("Deleting schedule with id:", id);
      await deleteScheduleAPI(id);
      setSchedules((prev) => prev.filter((item) => item.scheduleId !== id));
    } catch (err: any) {
      console.error("Error deleting schedule:", err);
      throw new Error(err.message || "Không thể xóa lịch thi đấu");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return { schedules, loading, error, fetchSchedules, createSchedule, updateSchedule, deleteSchedule };
};