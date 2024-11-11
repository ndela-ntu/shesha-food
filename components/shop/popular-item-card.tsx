import ISoldItem from "@/models/sold-item";
import Image from "next/image";
import Rating from "./rating";

export default function PopularItemCard({
  popularItem,
}: {
  popularItem: ISoldItem;
}) {
  function averageRating() {
    if (popularItem.ratings !== undefined) {
      const ratings = popularItem.ratings.ratings;
      const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);

      const toReturn =
        Math.round(Number((total / ratings.length)) * 2) / 2;

      return toReturn;
    }
    return 0;
  }

  return (
    <div className="flex flex-col items-center bg-coralPink rounded-md">
      <h1 className="font-semibold">{popularItem.name}</h1>
      <div className="aspect-square relative w-full h-full">
        <Image
          src={popularItem.imageUrl}
          alt="Example Image"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <p className="text-xs md:text-sm">
        <div className="text-champagne flex flex-row"><Rating maxRating={5} rating={averageRating()} /></div>
      </p>
    </div>
  );
}
