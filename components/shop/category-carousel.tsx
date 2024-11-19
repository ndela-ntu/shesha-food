import { ITEMSCATEGORY } from "@/models/items-category";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { useCallback, useEffect, useState } from "react";
import React from "react";

export default function CategoryCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const categories = Object.values(ITEMSCATEGORY).filter(
    (category) => typeof category === "string"
  );

  const onInit = React.useCallback(() => {
    setCount(0);
    setCurrent(0);
  }, []);

  const onScroll = React.useCallback(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    onScroll();
    api.on("init", onInit);
    api.on("scroll", onScroll);
    api.on("reInit", onScroll);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

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
      <div className="mt-1 flex items-center justify-center space-x-2.5">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current ? "bg-coralPink w-4" : "bg-champagne"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </>
  );
}
