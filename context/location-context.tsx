'use client';

import { ReactNode, createContext, useContext, useState } from "react";

export interface Location {
  latitude: number;
  longitude: number;
}

interface LocationContextType {
  location: Location | null;
  fetchLocation: () => void;
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
  const [location, setLocation] = useState<Location | null>(null);

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported");
    }
  };

  return (
    <LocationContext.Provider value={{ location, fetchLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
