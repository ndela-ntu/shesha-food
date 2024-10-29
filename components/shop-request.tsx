"use client";

import { useLocation } from "@/context/location-context";
import { LocateFixed, MoveRight, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

import { SearchWithGeocoding } from "./seach-with-geocoding";
import Divider from "./divider";
import DeliveryLocationPicker from "./delivery-location-picker";

export default function ShopRequest() {
  const router = useRouter();
  const { location, fetchLocation, setLocation, clearLocation } = useLocation();

  useEffect(() => {
    clearLocation();
  }, []);

  useEffect(() => {
    if (location) {
      console.log(location);
      //router.push("/shop");
    }
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
                longitude: coordinates.lng,
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
        <DeliveryLocationPicker
          onLocationSelect={(coordinates) =>
            setLocation({
              latitude: coordinates.lat,
              longitude: coordinates.lng,
            })
          }
        />
        <Divider />
        {location && (
          <Button className="bg-coralPink rounded-xl w-full">
            Continue
            <MoveRight />
          </Button>
        )}
        <p className="text-xs mt-2.5">
          Please note that shopping on the app requires a delivery location.
        </p>
      </div>
    </>
  );
}
