export interface Race {
    raceId: number;
    raceName: string;
    raceDate: string;
    season: string;
    track: Track;
  }
  
  export interface Track {
    trackId: number;
    trackName: string;
    location: string;
  }
  