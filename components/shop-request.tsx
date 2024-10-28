"use client";

import { useLocation } from "@/context/location-context";
import { LocateFixed, MoveRight, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { SearchInput } from "./search-input";
import { SearchWithGeocoding } from "./seach-with-geocoding";

export default function ShopRequest() {
  const router = useRouter();
  const { location, fetchLocation } = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMyLocationClick = () => {
    fetchLocation();

    if (!location) {
      setIsDialogOpen(true);
    }
  };

  useEffect(() => {
    if (location) {
      router.push("/shop");
    }
  }, [location, router]);

  return (
    <>
      <div className="flex flex-col items-center bg-celadon p-2.5 rounded-xl space-y-2.5">
        <div className="w-full">
          <SearchWithGeocoding
            className="border border-champagne rounded-xl"
            placeholder="Search delivery location..."
          />
        </div>
        <span>or</span>
        <Button
          onClick={handleMyLocationClick}
          className="bg-coralPink rounded-xl w-full"
        >
          <LocateFixed />
          Use my current location
        </Button>
        <span>or</span>
        <Button className="bg-coralPink rounded-xl w-full">
          Select from map
        </Button>
        <p className="text-xs mt-2.5">
          Please note that shopping on the app requires your delivery location.
        </p>
      </div>
    </>
  );
}
