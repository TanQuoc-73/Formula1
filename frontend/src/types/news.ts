export interface News {
  newsId: number;
  title: string;
  content: string;
  publishedDate: string; // Dữ liệu từ backend thường là dạng chuỗi
  author?: {
    userId: number;
    username: string;
  };
  race?: {
    raceId: number;
    name: string;
  };
  team?: {
    teamId: number;
    name: string;
  };
  
}
