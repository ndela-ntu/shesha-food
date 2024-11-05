import Divider from "@/components/divider";
import { SearchInput } from "@/components/search-input";
import ShopScreen from "@/components/shop/shop-screen";
import RegionCard from "@/components/shop/shop-screen";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row items-center w-full space-y-2.5">
      <ShopScreen />
    </div>
  );
}
