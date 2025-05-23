import {Driver} from "../types/team";

export const getDriversAPI = async (): Promise<Driver[]> => {
    const response = await fetch("http://localhost:8080/api/drivers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch drivers");
    }

    return response.json();
};

export const createDriverAPI = async (driver: Driver): Promise<void> => {
    const response = await fetch("http://localhost:8080/api/drivers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(driver),
    });

    if (!response.ok) {
        throw new Error("Failed to create driver");
    }
};
export const updateDriverAPI = async (driverId: number, driver: Driver): Promise<void> => {
    const response = await fetch(`http://localhost:8080/api/drivers/${driverId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(driver),
    });

    if (!response.ok) {
        throw new Error("Failed to update driver");
    }
}
export const deleteDriverAPI = async (driverId: number): Promise<void> => {
    const response = await fetch(`http://localhost:8080/api/drivers/${driverId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete driver");
    }
}

