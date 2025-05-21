// types/schedule.ts
export interface Race {
  raceId: number;
  raceName: string;
  location: string;
}

export interface Schedule {
  scheduleId: number;
  race: Race;
  eventName: string;
  eventDate: string; 
  eventTime: string; 
}