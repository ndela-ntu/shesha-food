import Divider from "@/components/divider";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { LocateFixed } from "lucide-react";

export default function Page() {
  return (
    <div className="px-1 flex flex-col md:flex-row items-center w-full space-y-2.5">
      <div className="w-full">
        <SearchInput
          className="border-champagne border text-champagne w-full"
          placeholder="Search for food..."
        />
      </div>
      <Divider />
      <div>
        <h1 className="text-lg">Popular In Your Area</h1>
        <div className=""></div>
      </div>
    </div>
  );
}
