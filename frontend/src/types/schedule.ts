// types/schedule.ts
export interface Race {
  raceId: number;
  raceName: string;
  location: string;
}

export interface Schedule {
  scheduleId: number;
  race: Race;
  startTime: string; // ISO string, e.g., "2025-05-21T14:00:00"
  endTime: string | null; // ISO string or null
  eventType: "Practice" | "Qualifying" | "Race" | "Sprint";
  sessionNumber: number;
  notes: string | null;
}