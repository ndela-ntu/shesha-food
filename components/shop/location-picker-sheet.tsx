"use client";

import { ChevronDown, LocateFixed, MoveRight, Pin } from "lucide-react";
import Link from "next/link";
import { SearchWithGeocoding } from "../search-with-geocoding";
import { Button } from "../ui/button";
import MapWrapper from "../map-wrapper";
import { useLocation } from "@/context/location-context";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import ICoordinates from "@/models/coordinates";

export default function LocationPickerSheet({
  currentLocation,
  onLocationPickedCB,
}: {
  currentLocation: string;
  onLocationPickedCB: (location: ICoordinates) => void;
}) {
  const { location, fetchLocation, setLocation, clearLocation } = useLocation();
  const [locationName, setLocationName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [locationState, setLocationState] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const reverseGeocode = async () => {
      if (location || locationState) {
        setLoading(true);
        try {
          let response = null;
          if (locationState) {
            response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${locationState?.latitude}&lon=${locationState?.longitude}`
            );
          } else if (location) {
            response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location?.latitude}&lon=${location?.longitude}`
            );
          }

          if (response) {
            const data = await response.json();
            setLocationName(data.name);
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    reverseGeocode();
  }, [location, locationState]);

  const handleOnContinueClick = () => {
    if (locationName) {
      if (locationState) {
        onLocationPickedCB({
          id: 0,
          lat: locationState.latitude,
          lng: locationState.longitude,
          name: locationName,
        });
        setLocation({
          latitude: locationState.latitude,
          longitude: locationState.longitude,
        });
      } else if (location) {
        onLocationPickedCB({
          id: 0,
          lat: location.latitude,
          lng: location.longitude,
          name: locationName,
        });
      }
    }
  };

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
                setLocationState({
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
          <SheetFooter className="z-0">
            <div className="z-0 bg-coralPink w-full flex items-center justify-between">
              <span className="pl-2.5 text-champagne">
                {loading ? "Loading..." : locationName}
              </span>
              <SheetClose asChild>
                <div
                  onClick={handleOnContinueClick}
                  className="flex bg-champagne text-olivine py-2 px-1"
                >
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
