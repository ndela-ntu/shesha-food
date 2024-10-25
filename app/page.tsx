import Divider from "@/components/divider";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppData } from "@/mock-data/app-data";
import { LocateFixed } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-1 flex flex-col md:flex-row items-center w-full space-y-2.5">
      <div className="flex flex-col space-y-2.5 w-full">
        <SearchInput
          className="border-champagne border text-champagne w-full"
          placeholder="Search for food..."
        />
        <div className="w-full flex justify-center">
          <Button className="bg-celadon">
            <LocateFixed />
            Stores Near Me?
          </Button>
        </div>
      </div>
      <Divider />
      <div>
        <h1 className="text-lg">Popular In Your Area</h1>
        <div className=""></div>
      </div>
    </div>
  );
}
