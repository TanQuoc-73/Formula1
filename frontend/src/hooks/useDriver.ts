import {useState, useEffect} from "react";
import {Driver} from "@/types/driver";
// import {getDriversAPI} from "@/services/driversService";

export const useDrivers = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDrivers = async () => {
        setLoading(true);
        try {
            // const data = await getDriversAPI();
            // setDrivers(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to load drivers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    return {drivers, loading, error, refreshDrivers: fetchDrivers};
};