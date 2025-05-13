export interface News {
  newsId: number;
  title: string;
  content: string;
  publishedDate: string;
  author: {
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
  };
  imageUrl: string | null;
  race: {
    raceId: number;
    raceName: string;
  } | null;
  team: {
    teamId: number;
    teamName: string;
  } | null;
}