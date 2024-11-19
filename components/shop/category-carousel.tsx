import { ITEMSCATEGORY } from "@/models/items-category";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { useCallback, useEffect, useState } from "react";

export default function CategoryCarousel() {
  const [progress, setProgress] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const categories = Object.values(ITEMSCATEGORY).filter(
    (category) => typeof category === "string"
  );

  const onInit = useCallback(() => {
    setProgress(0);
  }, []);

  const onScroll = useCallback(() => {
    if (!api) return;
    const progress = Math.max(0, Math.min(1, api.scrollProgress())) * 100;
    setProgress(progress);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    onScroll(); // Call once to set initial progress
    api.on("init", onInit);
    api.on("scroll", onScroll);
    api.on("reInit", onScroll);

    return () => {
      api.off("init", onInit);
      api.off("scroll", onScroll);
      api.off("reInit", onScroll);
    };
  }, [api, onInit, onScroll]);

  return (
    <>
      <Carousel setApi={setApi} opts={{ align: "center" }} className="w-full">
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
      <div className="mt-1 flex items-center justify-center">
        <progress
          className="progress h-1.5 w-[80%] bg-champagne"
          value={progress}
          max="100"
        ></progress>
      </div>
    </>
  );
}
