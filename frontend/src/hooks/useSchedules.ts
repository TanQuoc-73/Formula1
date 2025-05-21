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
    } finally {
      setLoading(false);
    }
  };

  const createSchedule = async (schedule: Partial<Schedule>) => {
    try {
      const newSchedule = await createScheduleAPI(schedule);
      setSchedules((prev) => [...prev, newSchedule]);
    } catch (err: any) {
      throw new Error(err.message || "Không thể tạo lịch thi đấu");
    }
  };

  const updateSchedule = async (id: number, schedule: Partial<Schedule>) => {
    try {
      const updatedSchedule = await updateScheduleAPI(id, schedule);
      setSchedules((prev) =>
        prev.map((item) => (item.scheduleId === id ? updatedSchedule : item))
      );
    } catch (err: any) {
      throw new Error(err.message || "Không thể cập nhật lịch thi đấu");
    }
  };

  const deleteSchedule = async (id: number) => {
    try {
      await deleteScheduleAPI(id);
      setSchedules((prev) => prev.filter((item) => item.scheduleId !== id));
    } catch (err: any) {
      throw new Error(err.message || "Không thể xóa lịch thi đấu");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return { schedules, loading, error, fetchSchedules, createSchedule, updateSchedule, deleteSchedule };
};