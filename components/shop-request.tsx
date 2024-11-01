"use client";

import { useLocation } from "@/context/location-context";
import { LocateFixed, MoveRight, Pin, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

import { SearchWithGeocoding } from "./search-with-geocoding";

import MapWrapper from "./map-wrapper";
import Link from "next/link";

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
      <div className="flex flex-col items-center bg-celadon px-2.5 pt-2.5 pb-8 rounded-xl space-y-2.5">
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
        <div className="w-full">
          <span className="w-full py-1.5 flex items-center justify-center bg-coralPink space-x-2.5 rounded-t-xl">
            <Pin size={16} />
            <span>Pick from map</span>
          </span>
          <div className="flex items-center space-x-2.5 bg-coralPink py-1.5 px-1.5">
            <div className="border-2 border-sky-300 h-4 w-4 rounded-full bg-sky-200" />
            <span>- Supported Regions</span>
          </div>
          <MapWrapper
            onLocationSelect={(coordinates) => {
              setLocation({
                latitude: coordinates[0],
                longitude: coordinates[1],
              });
            }}
          />
        </div>
      </div>
      {location && (
        <div className="z-20 bg-coralPink fixed bottom-0 left-0 w-full flex items-center justify-between">
          <span className="pl-2.5 text-champagne">
            {loading ? "Loading..." : locationName}
          </span>
          <Link
            href="/shop"
            className="bg-champagne text-celadon px-2.5 py-1 flex space-x-2.5"
          >
            <span>Continue</span>
            <MoveRight />
          </Link>
        </div>
      )}
    </>
  );
}
