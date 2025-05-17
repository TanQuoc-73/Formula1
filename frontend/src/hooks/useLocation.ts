import { useState, useEffect } from "react";

interface Location {
  lat: number;
  lon: number;
}

const useLocation = (): Location | null => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);

  return location;
};

export default useLocation;
