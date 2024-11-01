"use client";

import { useLocation } from "@/context/location-context";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { location } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>("");

  useEffect(() => {
    const reverseGeocode = async () => {
      if (location) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location?.latitude}&lon=${location?.longitude}`
          );

          const data = await response.json();
          setLocationName(data.name);
        } catch (error) {
          console.error("Error fetching location data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    reverseGeocode();
  }, []);

  return (
    <main className="w-full p-0">
      <div className="bg-celadon max-w-fit px-1.5 mb-1.5">{locationName}</div>
      <div>{children}</div>
    </main>
  );
}
