"use client";

import { useLocation } from "@/context/location-context";
import { LocateFixed, MoveRight, ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

import { SearchWithGeocoding } from "./search-with-geocoding";
import Divider from "./divider";
import axios from "axios";
import { Map } from "lucide-react";

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
    };

    reverseGeocode();
  }, [location]);

  return (
    <>
      <div className="flex flex-col items-center bg-celadon p-2.5 rounded-xl space-y-2.5">
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
        <Button className="bg-coralPink rounded-xl w-full">
          <Map />
          Select From Map
        </Button>
        <Divider />
        {location && (
          <div className="flex flex-col w-full space-y-2.5">
            <span className="text-sm">
              <span>Selected location: </span>
              <span className="font-bold underline">{locationName}</span>
            </span>
            <Button className="bg-coralPink rounded-xl w-full">
              Continue
              <MoveRight />
            </Button>
          </div>
        )}
        <p className="text-xs mt-2.5">
          Please note that shopping on the app requires a delivery location.
        </p>
      </div>
    </>
  );
}
