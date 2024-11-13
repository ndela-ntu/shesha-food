import ISoldItem from "@/models/sold-item";
import Image from "next/image";
import Rating from "./rating";
import { IStore } from "@/models/store";
import DefaultAvatar from "./default-avatar";
import Divider from "../divider";

export default function PopularItemCard({
  popularItemWithStore,
}: {
  popularItemWithStore: { popularItem: ISoldItem; store: IStore };
}) {
  function averageRating() {
    const popularItem = popularItemWithStore.popularItem;
    if (popularItem.ratings !== undefined) {
      const ratings = popularItem.ratings;
      const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);

      const toReturn = Math.round(Number(total / ratings.length) * 2) / 2;

      return toReturn;
    }
    return 0;
  }

  return (
    <div className="flex flex-col items-center bg-coralPink rounded-md">
      <div className="flex items-center justify-start w-full space-x-2.5 p-1">
        <DefaultAvatar name={popularItemWithStore.store.name} size={20} className="h-5 w-5" />
        <h1 className="font-medium">
          {popularItemWithStore.popularItem.name}
        </h1>
      </div>
      <div className="aspect-square relative w-full h-full">
        <Image
          src={popularItemWithStore.popularItem.imageUrl}
          alt="Image of food"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="text-champagne flex w-full items-center justify-between px-1">
        <Rating maxRating={5} rating={averageRating()} />
        <span className="text-sm">{averageRating()}</span>
      </div>
    </div>
  );
}
