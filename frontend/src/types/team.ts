export interface Team {
  teamId: number;
  teamName: string;
  baseLocation: string;
  numChampTitles: number;
  totalPoints: number;
  drivers: Driver[];
}

export interface Driver {
  driverId: number;
  driverName: string;
  nationality: string;
  birthDate: string;
  driverPoints: number;
}