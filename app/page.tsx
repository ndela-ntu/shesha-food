import Divider from "@/components/divider";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { Regions } from "@/mock-data/app-data";
import { LocateFixed, MapPinHouse, MoveRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2.5">
      <Link
        className="flex max-w-fit items-center bg-celadon p-2.5 rounded-xl"
        href="/shop"
      >
        <div className="flex flex-col space-y-2.5">
          <div className="flex space-x-2.5">
            <span className="text-lg font-bold">Shop</span>
            <ShoppingBag />
          </div>
          <p className="text-sm">Shopping on the app requires your location</p>
        </div>
        <div className="rounded-full bg-coralPink p-1.5">
          <MoveRight />
        </div>
      </Link>
      <Link
        className="flex max-w-fit items-center bg-celadon p-2.5 rounded-xl"
        href="/check-availability"
      >
        <div className="flex flex-col space-y-2.5">
          <div className="flex space-x-2.5">
            <span className="text-lg font-bold">Check Availability</span>
            <MapPinHouse />
          </div>
          <p className="text-sm">
            Check if the app is available in your region
          </p>
        </div>
        <div className="rounded-full bg-coralPink p-1.5">
          <MoveRight />
        </div>
      </Link>
      <Divider />
      <div className="flex flex-col w-full bg-celadon p-2.5 rounded-xl space-y-2.5">
        <div>
          <span className="text-lg font-bold">Supported Regions</span>
          <p className="text-sm">
            A list of regions the app currently supports
          </p>
        </div>
        <ul>
          {Regions.map((region, i) => (
            <li className="flex space-x-1.5">
              <span>{i + 1}.</span>
              <span>{region.name}</span>
            </li>
          ))}
        </ul>
        {Regions.length >= 10 && (
          <Button className="bg-coralPink rounded-xl max-w-fit">More</Button>
        )}
      </div>
    </div>
  );
}
