"use client";

import { useLocation } from "@/context/location-context";
import { MoveRight, ShoppingBag } from "lucide-react";
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

export default function ShopRequest() {
  const router = useRouter();
  const { location, fetchLocation } = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDivClick = () => {
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
      <div
        className="flex max-w-fit items-center bg-celadon p-2.5 rounded-xl"
        onClick={handleDivClick}
      >
        <div className="flex flex-col space-y-2.5">
          <div className="flex space-x-2.5">
            <span className="text-lg font-bold">Shop</span>
            <ShoppingBag />
          </div>
          <p className="text-sm">
            Please note that shopping on the app requires your location.
          </p>
        </div>
        <div className="rounded-full bg-coralPink p-1.5">
          <MoveRight />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-xl max-w-[95%] md:max-w-full flex flex-col items-center bg-olivine text-champagne">
          <DialogTitle className="underline">
            Location Access Required
          </DialogTitle>
          <DialogDescription className="text-center">
            To access the shop, please allow location access in your browser
            settings. You can reset this permission if you want to be asked each
            time.
          </DialogDescription>
          <DialogFooter>
            <Button
              className="bg-coralPink rounded-xl px-2.5 py-1 max-w-fit"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
