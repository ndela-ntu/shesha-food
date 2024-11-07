import ISoldItem from "@/models/sold-item";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import PopularItemCard from "./popular-item-card";

export default function PopularItemsCarousel({
  popularItems,
}: {
  popularItems: ISoldItem[];
}) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="-ml-1">
        {popularItems.map((popularItem) => (
          <CarouselItem
            className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4"
            key={popularItem.id}
          >
            <PopularItemCard popularItem={popularItem} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
