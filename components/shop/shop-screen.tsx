"use client";

import { useLocation } from "@/context/location-context";
import { Regions } from "@/mock-data/regions";
import { findNearbyRegion } from "@/utils/findNearByRegion";
import { SearchInput } from "../search-input";
import Divider from "../divider";
import Image from "next/image";
import DefaultAvatar from "./default-avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import LocationPickerSheet from "../location-picker-sheet";
import CategoryCarousel from "./category-carousel";

export default function ShopScreen() {
  const { location } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const region = findNearbyRegion(
    { lat: location?.latitude || 0, lng: location?.longitude || 0 },
    Regions
  );

  if (!region) {
    return <div>This app is not supported in your region</div>;
  }

  return (
    <div className="w-full">
      <LocationPickerSheet currentLocation={locationName} />
      <div className="text-champagne w-full min-h-screen px-1">
        <div className="w-full">
          <SearchInput
            className="border-champagne border text-champagne w-full"
            placeholder="Search for food..."
          />
        </div>
        <CategoryCarousel />
        <Divider />
        <h1 className="text-base mb-1">Popular around {region.name}</h1>
        <div className="grid grid-cols-2 gap-1">
          {region.stores.map((store) => (
            <div key={store.id} className="bg-coralPink rounded-md p-1">
              <div>
                <span className="underline font-medium">{store.name}</span>
                <div className="relative aspect-square">
                  <Link href={`shop/${store.id}`}>
                    {store.logoUrl ? (
                      <Image
                        src={store.logoUrl}
                        alt="Logo of store"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <DefaultAvatar name={store.name} size={100} />
                    )}
                  </Link>
                </div>
                <p className="text-xs">{store.description}</p>
                <span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
