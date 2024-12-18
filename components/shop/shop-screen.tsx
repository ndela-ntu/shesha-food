"use client";

import { useLocation } from "@/context/location-context";
import { Regions } from "@/mock-data/regions";
import { SearchInput } from "../search-input";
import Image from "next/image";
import DefaultAvatar from "./default-avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import LocationPickerSheet from "./location-picker-sheet";
import CategoryCarousel from "./category-carousel";
import { findNearbyRegion } from "@/utils/findNearByRegion";
import reverseGeocode from "@/utils/reverseGeocode";
import { IStore } from "@/models/store";
import IRegion from "@/models/region";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import PopularItemsCarousel from "./popular-items-carousel";
import ISoldItem from "@/models/sold-item";
import { menuWithRatings } from "@/utils/menuWithRatings";
import { Button } from "../ui/button";

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
        results.push({ id: store.id, locationName: data });
      } else {
        results.push({ id: store.id, locationName: "" });
      }
    } catch (error) {
      console.error("Error fetching the location names", error);
    }
  }

  return results;
};

export default function ShopScreen() {
  const { location, setLocation } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>("");
  const [popularItemsWithStore, setPopularItemsWithStore] = useState<
    { popularItem: ISoldItem; store: IStore }[]
  >([]);
  const [storeLocationNames, setStoreLocationNames] = useState<
    {
      id: number;
      locationName: string;
    }[]
  >([]);
  const [region, setRegion] = useState<IRegion | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const region = findNearbyRegion(
      { lat: location?.latitude || 0, lng: location?.longitude || 0 },
      Regions
    );

    if (region) {
      setRegion(region);
    } else {
      setRegion(null);
    }

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

  useEffect(() => {
    if (region) {
      const topFiveMenus = menuWithRatings(region.stores)
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 5);

      const popularItemsWithStore: { popularItem: ISoldItem; store: IStore }[] =
        [];
      topFiveMenus.forEach((menu) => {
        const store = region.stores.find((item) => item.id === menu.storeId);
        const popularItem = store?.menu.find(
          (menuItem) => menuItem.id === menu.id
        );

        if (store && popularItem) {
          popularItemsWithStore.push({ popularItem, store });
        }
      });
      setPopularItemsWithStore(popularItemsWithStore);

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
  }, [region]);

  if (!region) {
    return (
      <div className="h-screen w-full flex flex-col items-center space-y-2.5 pt-2.5">
        <span className="text-center">
          This app is not supported in your region. Please select a supported
          region.
        </span>
        <Link href="/">
          <div className="flex w-full rounded-xl justify-center items-center bg-coralPink max-w-min text-champagne">
            <ArrowLeft className="p-0" />
            <Button className="pl-0">Pick location</Button>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pb-5">
      <LocationPickerSheet
        onLocationPickedCB={(coordinates) => {
          setLocation({
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          });
        }}
        currentLocation={locationName}
      />
      <div className="text-champagne w-full min-h-screen px-1 flex flex-col space-y-4">
        <div className="w-full">
          <SearchInput
            className="border-champagne border text-champagne w-full"
            placeholder="Search for food..."
          />
        </div>
        <CategoryCarousel />
        <div className="border border-champagne p-1.5">
          <h1 className="text-sm mb-2 bg-celadon rounded-xl p-1.5 max-w-fit">
            Popular foods around {region.name}
          </h1>
          <PopularItemsCarousel popularItemsWithStore={popularItemsWithStore} />
          <div className="w-full flex items-center justify-end">
            <Button className="bg-coralPink text-champagne rounded-xl mt-2.5 max-w-fit">
              <span>View All</span>
              <ArrowRight />
            </Button>
          </div>
        </div>

        <div className="border border-champagne p-1.5">
          <h1 className="text-sm mb-2 bg-celadon rounded-xl p-1.5 max-w-fit">
            Popular stores around {region.name}
          </h1>
          <div className="flex flex-col space-y-2.5">
            {region.stores.map((store, index) => {
              const total = store.ratings.reduce(
                (acc, curr) => acc + curr.rating,
                0
              );
              const average = Number((total / store.ratings.length).toFixed(1));

              return (
                <div key={store.id} className="bg-coralPink rounded-xl p-1">
                  <div className="flex space-x-2.5 items-center justify-between">
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
                          <DefaultAvatar
                            defaultColors={store.defaultLogo.gradient}
                            name={store.name}
                            size={25}
                          />
                        )}
                      </Link>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="font-semibold">{store.name}</span>
                      <span className="text-xs md:text-sm">
                        {store.description}
                      </span>
                      {storeLocationNames[index] && (
                        <span className="flex items-center justify-center bg-champagne text-olivine rounded-xl px-2.5 p-1 text-xs md:text-sm max-w-fit space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{storeLocationNames[index].locationName}</span>
                        </span>
                      )}
                    </div>
                    <span className="flex items-center justify-center rounded-full w-6 h-6 bg-champagne text-asparagus text-sm">
                      {average}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex items-center justify-end">
            <Button className="bg-coralPink text-champagne rounded-xl mt-2.5 max-w-fit">
              <span>View All</span>
              <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="border border-champagne p-1.5">
          <h1 className="text-sm mb-2 bg-celadon rounded-xl p-1.5 max-w-fit">
            Kasi Flavour
          </h1>
          <PopularItemsCarousel popularItemsWithStore={popularItemsWithStore} />
        </div>
        <div className="border border-champagne p-1.5">
          <h1 className="text-sm mb-2 bg-celadon rounded-xl p-1.5 max-w-fit">
            Bakery
          </h1>
          <PopularItemsCarousel popularItemsWithStore={popularItemsWithStore} />
        </div>
      </div>
    </div>
  );
}
