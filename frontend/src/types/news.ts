export interface News {
  newsId: number;
  title: string;
  content: string;
  publishedDate: string;
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
  imageUrl?: string; 
}