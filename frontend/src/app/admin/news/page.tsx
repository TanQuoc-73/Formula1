"use client";

import { useState } from "react";
import { useNews } from "@/hooks/useNews";
import { News } from "@/types/news";
import { createNewsAPI, updateNewsAPI } from "@/services/newsService";
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
import { Textarea } from "@/components/ui/textarea";
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
  Image,
  Flag,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function NewsAdminPage() {
  const { newsList, loading, error, fetchNews, deleteNews } = useNews();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState<Partial<News> | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    publishedDate: "",
    raceId: "",
    teamId: "",
    imageUrl: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNews();
    setIsRefreshing(false);
  };

  const handleEdit = (news: News) => {
    setIsEditing(true);
    setCurrentNews(news);
    setFormData({
      title: news.title,
      content: news.content,
      publishedDate: news.publishedDate || "",
      raceId: news.race?.raceId?.toString() || "",
      teamId: news.team?.teamId?.toString() || "",
      imageUrl: news.imageUrl || "",
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa tin tức này không?")) {
      try {
        await deleteNews(id);
        setFormError(null);
      } catch (err: any) {
        setFormError(err.message || "Không thể xóa tin tức");
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newsData: Partial<News> = {
      title: formData.title,
      content: formData.content,
      publishedDate: formData.publishedDate,
      race: formData.raceId ? { raceId: Number(formData.raceId) } : undefined,
      team: formData.teamId ? { teamId: Number(formData.teamId) } : undefined,
      imageUrl: formData.imageUrl || undefined,
    };

    try {
      setFormError(null);
      if (isEditing && currentNews?.newsId) {
        await updateNewsAPI(currentNews.newsId, newsData);
      } else {
        await createNewsAPI(newsData);
      }
      setFormData({ title: "", content: "", publishedDate: "", raceId: "", teamId: "", imageUrl: "" });
      setIsEditing(false);
      setCurrentNews(null);
      setIsOpen(false);
      fetchNews();
    } catch (err: any) {
      setFormError(err.message || "Không thể lưu tin tức");
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", content: "", publishedDate: "", raceId: "", teamId: "", imageUrl: "" });
    setIsEditing(false);
    setCurrentNews(null);
    setIsOpen(false);
    setFormError(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold">Quản lý tin tức</CardTitle>
              <CardDescription className="text-blue-100 mt-1">
                Tạo, chỉnh sửa và xóa tin tức
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
                <PlusCircle className="mr-2 h-4 w-4" /> Thêm tin tức mới
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
                    Vui lòng đợi trong khi chúng tôi tải dữ liệu tin tức.
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
            <h2 className="text-xl font-semibold mb-4 px-2">Danh sách tin tức</h2>
            {newsList.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">Không có tin tức nào.</p>
                <Button 
                  onClick={() => setIsOpen(true)} 
                  variant="outline" 
                  className="mt-4"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Thêm tin tức đầu tiên
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="font-bold">ID</TableHead>
                      <TableHead className="font-bold">Tiêu đề</TableHead>
                      <TableHead className="font-bold">Ngày đăng</TableHead>
                      <TableHead className="font-bold">Cuộc đua</TableHead>
                      <TableHead className="font-bold">Đội</TableHead>
                      <TableHead className="font-bold">Hình ảnh</TableHead>
                      <TableHead className="font-bold text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newsList.map((news) => (
                      <TableRow key={news.newsId} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{news.newsId}</TableCell>
                        <TableCell className="max-w-xs truncate">{news.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            {new Date(news.publishedDate).toLocaleString('vi-VN')}
                          </div>
                        </TableCell>
                        <TableCell>
                          {news.race?.name ? (
                            <Badge variant="outline" className="flex items-center gap-1 bg-blue-50">
                              <Flag className="h-3 w-3 text-blue-500" />
                              {news.race.name}
                            </Badge>
                          ) : "-"}
                        </TableCell>
                        <TableCell>
                          {news.team?.name ? (
                            <Badge variant="outline" className="flex items-center gap-1 bg-purple-50">
                              <Users className="h-3 w-3 text-purple-500" />
                              {news.team.name}
                            </Badge>
                          ) : "-"}
                        </TableCell>
                        <TableCell>
                          {news.imageUrl ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <div className="flex items-center">
                                    <Image className="h-4 w-4 mr-1 text-gray-500" />
                                    <span className="text-blue-600 hover:text-blue-800 underline">
                                      Xem hình
                                    </span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  <div className="p-1">
                                    <img 
                                      src={news.imageUrl} 
                                      alt={news.title} 
                                      className="max-w-xs max-h-48 rounded" 
                                    />
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(news)}
                              className="h-8 border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4 mr-1" /> Sửa
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(news.newsId)}
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
        <DialogContent className="sm:max-w-2xl max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {isEditing ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">Tiêu đề</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1"
                  placeholder="Nhập tiêu đề tin tức"
                />
              </div>
              
              <div>
                <Label htmlFor="content" className="text-sm font-medium">Nội dung</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 min-h-32"
                  placeholder="Nhập nội dung chi tiết tin tức"
                />
              </div>
              
              <div>
                <Label htmlFor="publishedDate" className="text-sm font-medium">Ngày đăng</Label>
                <div className="relative">
                  <Input
                    id="publishedDate"
                    name="publishedDate"
                    type="datetime-local"
                    value={formData.publishedDate}
                    onChange={handleInputChange}
                    required
                    className="w-full mt-1"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="raceId" className="text-sm font-medium">ID Cuộc đua (tùy chọn)</Label>
                  <div className="relative">
                    <Input
                      id="raceId"
                      name="raceId"
                      type="number"
                      value={formData.raceId}
                      onChange={handleInputChange}
                      className="w-full mt-1"
                      placeholder="Ví dụ: 1"
                    />
                    <Flag className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="teamId" className="text-sm font-medium">ID Đội (tùy chọn)</Label>
                  <div className="relative">
                    <Input
                      id="teamId"
                      name="teamId"
                      type="number"
                      value={formData.teamId}
                      onChange={handleInputChange}
                      className="w-full mt-1"
                      placeholder="Ví dụ: 1"
                    />
                    <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="imageUrl" className="text-sm font-medium">URL Hình ảnh (tùy chọn)</Label>
                <div className="relative">
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="text"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full mt-1"
                    placeholder="https://example.com/image.jpg"
                  />
                  <Image className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
                </div>
                
                {formData.imageUrl && (
                  <div className="mt-2 p-2 border rounded max-h-48 overflow-hidden">
                    <p className="text-xs text-gray-500 mb-1">Xem trước:</p>
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="max-w-full max-h-48 rounded object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/150?text=Invalid+Image+URL";
                      }}
                    />
                  </div>
                )}
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