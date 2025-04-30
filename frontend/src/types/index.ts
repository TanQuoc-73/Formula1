export interface CurrentUser {
    role: string;
}

export interface Team {
    teamId: number;
    teamName : string;
    baseLocation: string;
    totalPoints: number;    
}

export interface Driver {
    driverId: number;
    driverName: string;
    nationality: string;
    teamName: string;
}

export type Column<T> = {
    label: string;
    key: keyof T;
    sortable?: boolean;
}

export type SortConfig<T> = {
    key: keyof T;
    direction: 'asc' | 'desc';
};