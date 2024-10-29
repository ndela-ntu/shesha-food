"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Location = {
  latitude: number;
  longitude: number;
} | null;

interface LocationContextType {
  location: Location;
  fetchLocation: () => void;
  setLocation: (newLocation: Location) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const [location, setLocationState] = useState<Location>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLocation = localStorage.getItem("userLocation");
      if (storedLocation) {
        setLocationState(JSON.parse(storedLocation));
      }
    }
  }, []);

  const setLocation = (newLocation: Location) => {
    setLocationState(newLocation);
    if (typeof window !== "undefined") {
      localStorage.setItem("userLocation", JSON.stringify(newLocation));
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);
          localStorage.setItem("userLocation", JSON.stringify(newLocation)); // Store in localStorage
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <LocationContext.Provider value={{ location, fetchLocation, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
