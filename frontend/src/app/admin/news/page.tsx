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

export default function NewsAdminPage() {
  const { newsList, loading, error, fetchNews, deleteNews } = useNews();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNews, setCurrentNews] = useState<Partial<News> | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    publishedDate: "",
    raceId: "",
    teamId: "",
    imageUrl: "", // Thêm trường này
  });
  const [formError, setFormError] = useState<string | null>(null); // Thêm state để hiển thị lỗi form

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
    if (confirm("Are you sure you want to delete this news?")) {
      try {
        await deleteNews(id);
        setFormError(null); // Reset lỗi form
      } catch (err: any) {
        setFormError(err.message || "Failed to delete news");
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
      setFormError(null); // Reset lỗi trước khi gửi
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
      setFormError(err.message || "Failed to save news");
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage News</h1>

      {loading && <p className="text-yellow-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {formError && <p className="text-red-600">{formError}</p>}

      <Button onClick={() => setIsOpen(true)} className="mb-4">
        Add New News
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit News" : "Add New News"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="publishedDate">Published Date</Label>
              <Input
                id="publishedDate"
                name="publishedDate"
                type="datetime-local"
                value={formData.publishedDate}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="raceId">Race ID (optional)</Label>
              <Input
                id="raceId"
                name="raceId"
                type="number"
                value={formData.raceId}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="teamId">Team ID (optional)</Label>
              <Input
                id="teamId"
                name="teamId"
                type="number"
                value={formData.teamId}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">Image URL (optional)</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="text"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <DialogFooter>
              <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">News List</h2>
        {newsList.length === 0 ? (
          <p className="text-gray-500">No news available.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Race</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Image URL</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsList.map((news) => (
                <TableRow key={news.newsId}>
                  <TableCell>{news.newsId}</TableCell>
                  <TableCell>{news.title}</TableCell>
                  <TableCell>
                    {new Date(news.publishedDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{news.race?.name || "-"}</TableCell>
                  <TableCell>{news.team?.name || "-"}</TableCell>
                  <TableCell>{news.imageUrl || "-"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(news)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(news.newsId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}