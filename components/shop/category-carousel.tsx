import { ITEMSCATEGORY } from "@/models/items-category";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

export default function CategoryCarousel() {
  const categories = Object.values(ITEMSCATEGORY).filter(
    (category) => typeof category === "string"
  );

  return (
    <Carousel opts={{ align: "center" }} className="w-full">
      <CarouselContent className="-ml-1">
        {categories.map((category, i) => (
          <CarouselItem
            key={i}
            className="pl-1 basis-1/4 md:basis-1/5 lg:basis-1/6"
          >
            <div className="flex items-center justify-center py-2.5 rounded-xl m-0 bg-champagne">
              <span className="text-olivine text-xs">{category}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
