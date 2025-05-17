"use client";
import { Button } from "@/components/ui/button";
import { useNews } from "@/hooks/useNews";
import { formatDate } from "@/lib/utils";
import { Edit, Trash2, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminNews() {
  const { newsList, loading, error,deleteNews } = useNews();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa tin này?")) {
      try {
        await deleteNews(id);
        toast({
          title: "Thành công",
          description: "Đã xóa tin tức thành công",
          variant: "default",
        });
      } catch (err) {
        toast({
          title: "Lỗi",
          description: "Xóa tin tức thất bại",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Tin tức</h1>
        <Link href="/admin/news/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm tin mới
          </Button>
        </Link>
      </div>

      <Table>
        <TableCaption>Danh sách tin tức F1</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Tác giả</TableHead>
            <TableHead>Ngày đăng</TableHead>
            <TableHead>Chặng đua</TableHead>
            <TableHead>Đội đua</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newsList.map((news) => (
            <TableRow key={news.newsId}>
              <TableCell>{news.newsId}</TableCell>
              <TableCell className="font-medium">{news.title}</TableCell>
              <TableCell>{news.author?.username || "N/A"}</TableCell>
              <TableCell>{formatDate(news.publishedDate)}</TableCell>
              <TableCell>{news.race?.name || "N/A"}</TableCell>
              <TableCell>{news.team?.name || "N/A"}</TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => router.push(`/admin/news/edit/${news.newsId}`)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(news.newsId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}