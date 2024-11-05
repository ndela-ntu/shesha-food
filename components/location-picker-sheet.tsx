"use client";

import { ChevronDown, LocateFixed, MoveRight, Pin } from "lucide-react";
import Link from "next/link";
import { SearchWithGeocoding } from "./search-with-geocoding";
import { Button } from "./ui/button";
import MapWrapper from "./map-wrapper";
import { useLocation } from "@/context/location-context";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";

export default function LocationPickerSheet({
  currentLocation,
}: {
  currentLocation: string;
}) {
  const { location, fetchLocation, setLocation, clearLocation } = useLocation();
  const [locationName, setLocationName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
    <Sheet>
      <SheetTrigger asChild>
        <div className="bg-celadon max-w-fit px-1.5 mb-1.5 flex">
          <span>{currentLocation}</span>
          <ChevronDown />
        </div>
      </SheetTrigger>
      <SheetContent side="top" className="text-champagne">
        <div className="flex flex-col items-center bg-celadon px-2.5 pt-2.5 pb-8 rounded-tl-xl rounded-tr-xl space-y-2.5 ">
          <SheetHeader>Pick delivery location</SheetHeader>
          <div className="w-full m-0">
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
        </div>
        {location && (
          <SheetFooter>
            <div className="z-20 bg-coralPink w-full flex items-center justify-between ">
              <span className="pl-2.5 text-champagne">
                {loading ? "Loading..." : locationName}
              </span>
              <SheetClose asChild>
                <div className="flex bg-champagne text-olivine py-2 px-1">
                  <span>Continue</span>
                  <MoveRight />
                </div>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
