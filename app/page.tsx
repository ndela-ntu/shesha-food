import Divider from "@/components/divider";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { LocateFixed, MoveRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link
        className="flex max-w-fit items-center bg-celadon p-2.5 rounded-xl"
        href="/shop"
      >
        <div className="flex flex-col space-y-2.5">
          <div className="flex  space-x-2.5">
            <span className="text-lg font-bold">Shop</span>
            <ShoppingBag />
          </div>
          <p className="text-sm">Shopping on the app requires your location</p>
        </div>
        <div className="rounded-full bg-coralPink p-1.5">
          <MoveRight />
        </div>
      </Link>
    </div>
  );
}
