import ISoldItem from "@/models/sold-item";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import PopularItemCard from "./popular-item-card";
import { IStore } from "@/models/store";

export default function PopularItemsCarousel({
  popularItemsWithStore,
}: {
  popularItemsWithStore: {popularItem: ISoldItem, store: IStore}[];
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
        {popularItemsWithStore.map((item) => (
          <CarouselItem
            className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4"
            key={item.popularItem.id}
          >
            <PopularItemCard popularItemWithStore={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
