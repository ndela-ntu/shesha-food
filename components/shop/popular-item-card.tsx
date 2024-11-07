import ISoldItem from "@/models/sold-item";
import Image from "next/image";

export default function PopularItemCard({
  popularItem,
}: {
  popularItem: ISoldItem;
}) {
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
      <p className="text-xs md:text-sm">{popularItem.description}</p>
    </div>
  );
}
