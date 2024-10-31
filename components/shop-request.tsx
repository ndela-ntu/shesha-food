"use client";

import { useLocation } from "@/context/location-context";
import { LocateFixed, MoveRight, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

import { SearchWithGeocoding } from "./search-with-geocoding";
import Map, { MapMarker } from "./map";
import MapWithNoSSR from "./map";

const customMarkers: MapMarker[] = [
  {
    position: [51.515, -0.09],
    popup: "Custom Location 1"
  },
  {
    position: [51.505, -0.08],
    popup: "Custom Location 2"
  }
];

export default function ShopRequest() {
  const router = useRouter();
  const { location, fetchLocation, setLocation, clearLocation } = useLocation();
  const [locationName, setLocationName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    clearLocation();
  }, []);

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
  }, [location]);

  return (
    <>
      <div className="flex flex-col items-center bg-celadon p-2.5 rounded-xl space-y-2.5">
        <p className="text-xs mt-2.5">
          Please note that shopping on the app requires a delivery location.
        </p>
        <div className="w-full">
          <SearchWithGeocoding
            className="border border-champagne rounded-xl"
            placeholder="Search delivery location..."
            onSelectCoordinates={(coordinates) =>
              setLocation({
                latitude: coordinates.lat,
                longitude: coordinates.lon,
              })
            }
          />
        </div>
        <span>or</span>
        <Button
          onClick={fetchLocation}
          className="bg-coralPink rounded-xl w-full"
        >
          <LocateFixed />
          Use my current location
        </Button>
        <span>or</span>
        <MapWithNoSSR
          center={[51.505, -0.09]}
          zoom={14}
          markers={customMarkers}
        />
        {location && (
          <div className="flex flex-col w-full space-y-2.5">
            <span className="text-sm font-bold underline">{locationName}</span>
            <Button className="bg-coralPink rounded-xl w-full">
              Continue
              <MoveRight />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
