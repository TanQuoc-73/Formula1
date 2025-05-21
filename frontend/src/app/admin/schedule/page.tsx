// pages/admin/schedule.tsx
"use client";

import { useState } from "react";
import { useSchedules } from "@/hooks/useSchedules";
import { Schedule } from "@/types/schedule";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  PlusCircle,
  Edit,
  Trash2,
  AlertCircle,
  RefreshCw,
  Loader2,
  Calendar,
  Flag,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { News } from "@/types/news";

export default function ScheduleAdminPage() {
  const { schedules, loading, error, fetchSchedules, createSchedule, updateSchedule, deleteSchedule } = useSchedules();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<Partial<Schedule> | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    raceId: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchSchedules();
    setIsRefreshing(false);
  };

  // pages/admin/news.tsx
    const handleEdit = (schedule: Schedule) => {
  setIsEditing(true);
  setCurrentSchedule(schedule);
  setFormData({
    eventName: schedule.eventName ?? "",
    eventDate: schedule.eventDate ?? "",
    eventTime: schedule.eventTime ?? "",
    raceId: schedule.race?.raceId?.toString() ?? "",
  });
  setIsOpen(true);
};

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa lịch thi đấu này không?")) {
      try {
        await deleteSchedule(id);
        setFormError(null);
      } catch (err: any) {
        setFormError(err.message || "Không thể xóa lịch thi đấu");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const scheduleData: Partial<Schedule> = {
      eventName: formData.eventName,
      eventDate: formData.eventDate,
      eventTime: formData.eventTime || undefined,
      race: formData.raceId ? { raceId: Number(formData.raceId), raceName: "", location: "" } : undefined,
    };

    try {
      setFormError(null);
      if (isEditing && currentSchedule?.scheduleId) {
        await updateSchedule(currentSchedule.scheduleId, scheduleData);
      } else {
        await createSchedule(scheduleData);
      }
      setFormData({ eventName: "", eventDate: "", eventTime: "", raceId: "" });
      setIsEditing(false);
      setCurrentSchedule(null);
      setIsOpen(false);
      fetchSchedules();
    } catch (err: any) {
      setFormError(err.message || "Không thể lưu lịch thi đấu");
    }
  };

  const handleCancel = () => {
  setFormData({
    eventName: "",
    eventDate: "",
    eventTime: "",
    raceId: "",
  });
  setIsEditing(false);
  setCurrentSchedule(null);
  setIsOpen(false);
  setFormError(null);
};

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold">Quản lý lịch thi đấu</CardTitle>
              <CardDescription className="text-blue-100 mt-1">
                Tạo, chỉnh sửa và xóa lịch thi đấu
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={handleRefresh} 
                      variant="outline" 
                      size="icon" 
                      className="bg-blue-700 hover:bg-blue-600 text-white border-blue-500"
                    >
                      {isRefreshing ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <RefreshCw className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Làm mới danh sách</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button 
                onClick={() => setIsOpen(true)} 
                className="bg-green-600 hover:bg-green-500 text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Thêm lịch thi đấu mới
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {(loading || error || formError) && (
            <div className="mb-6">
              {loading && (
                <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800 mb-4">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <AlertTitle>Đang tải...</AlertTitle>
                  <AlertDescription>
                    Vui lòng đợi trong khi chúng tôi tải dữ liệu lịch thi đấu.
                  </AlertDescription>
                </Alert>
              )}
              
              {(error || formError) && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertTitle>Lỗi</AlertTitle>
                  <AlertDescription>
                    {error || formError}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <div className="bg-white rounded-lg overflow-hidden">
            <h2 className="text-xl font-semibold mb-4 px-2">Danh sách lịch thi đấu</h2>
            {schedules.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">Không có lịch thi đấu nào.</p>
                <Button 
                  onClick={() => setIsOpen(true)} 
                  variant="outline" 
                  className="mt-4"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Thêm lịch thi đấu đầu tiên
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="font-bold">ID</TableHead>
                      <TableHead className="font-bold">Sự kiện</TableHead>
                      <TableHead className="font-bold">Ngày</TableHead>
                      <TableHead className="font-bold">Giờ</TableHead>
                      <TableHead className="font-bold">Cuộc đua</TableHead>
                      <TableHead className="font-bold text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedules.map((schedule) => (
                      <TableRow key={schedule.scheduleId} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{schedule.scheduleId}</TableCell>
                        <TableCell className="max-w-xs truncate">{schedule.eventName}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            {new Date(schedule.eventDate).toLocaleDateString("vi-VN")}
                          </div>
                        </TableCell>
                        <TableCell>
                          {schedule.eventTime ? schedule.eventTime.slice(0, 5) : "--:--"}
                        </TableCell>
                        <TableCell>
                          {schedule.race?.raceName || "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(schedule)}
                              className="h-8 border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4 mr-1" /> Sửa
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(schedule.scheduleId)}
                              className="h-8 border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Xóa
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {isEditing ? "Chỉnh sửa lịch thi đấu" : "Thêm lịch thi đấu mới"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="eventName" className="text-sm font-medium">Tên sự kiện</Label>
                <Input
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1"
                  placeholder="Nhập tên sự kiện"
                />
              </div>
              
              <div>
                <Label htmlFor="eventDate" className="text-sm font-medium">Ngày diễn ra</Label>
                <div className="relative">
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    className="w-full mt-1"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="eventTime" className="text-sm font-medium">Giờ diễn ra (tùy chọn)</Label>
                <Input
                  id="eventTime"
                  name="eventTime"
                  type="time"
                  value={formData.eventTime}
                  onChange={handleInputChange}
                  className="w-full mt-1"
                  placeholder="HH:MM"
                />
              </div>
              
              <div>
                <Label htmlFor="raceId" className="text-sm font-medium">ID Cuộc đua</Label>
                <div className="relative">
                  <Input
                    id="raceId"
                    name="raceId"
                    type="number"
                    value={formData.raceId}
                    onChange={handleInputChange}
                    required
                    className="w-full mt-1"
                    placeholder="Ví dụ: 1"
                  />
                  <Flag className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-end space-x-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Hủy bỏ
              </Button>
              <Button 
                type="submit"
                className={isEditing ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}
              >
                {isEditing ? "Cập nhật" : "Tạo mới"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}