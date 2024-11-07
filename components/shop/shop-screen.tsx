"use client";

import { useLocation } from "@/context/location-context";
import { Regions } from "@/mock-data/regions";
import { SearchInput } from "../search-input";
import Divider from "../divider";
import Image from "next/image";
import DefaultAvatar from "./default-avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import LocationPickerSheet from "../location-picker-sheet";
import CategoryCarousel from "./category-carousel";
import { findNearbyRegion } from "@/utils/findNearByRegion";
import reverseGeocode from "@/utils/reverseGeocode";
import { IStore } from "@/models/store";

export const getStoreLocationsNames = async (stores: IStore[]) => {
  const results: { id: number; locationName: string }[] = [];

  for (const store of stores) {
    try {
      const data = await reverseGeocode({
        location: {
          latitude: store.location.lat,
          longitude: store.location.lng,
        },
      });

      if (data) {
        results.push({ id: store.id, locationName: data.name });
      }

      results.push({ id: store.id, locationName: "" });
    } catch (error) {
      console.error("Error fetching the location names", error);
    }
  }

  return results;
};

export default function ShopScreen() {
  const { location } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>("");
  const [storeLocationNames, setStoreLocationNames] = useState<
    {
      id: number;
      locationName: string;
    }[]
  >([]);

  const region = findNearbyRegion(
    { lat: location?.latitude || 0, lng: location?.longitude || 0 },
    Regions
  );

  useEffect(() => {
    if (region) {
      const getLocationNames = async () => {
        try {
          const storeLocations = await getStoreLocationsNames(region.stores);
          setStoreLocationNames(storeLocations);
        } catch (error) {
          console.error("Error fetching location names", error);
        }
      };

      getLocationNames();
    }
  }, []);

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
        <h1 className="text-sm mb-2">Popular stores around {region.name}</h1>
        <div className="flex flex-col space-y-2.5">
          {region.stores.map((store, index) => (
            <div key={store.id} className="bg-coralPink rounded-xl p-1">
              <div className="flex space-x-2.5 items-center">
                <div className="relative">
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
                      <DefaultAvatar name={store.name} size={20} />
                    )}
                  </Link>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{store.name}</span>
                  <span className="text-xs md:text-sm">
                    {store.description}
                  </span>
                  {storeLocationNames[index] && (
                    <span className="bg-champagne text-olivine rounded-xl">
                      {storeLocationNames[index].locationName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
