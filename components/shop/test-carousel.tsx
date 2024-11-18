"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Progress } from "../ui/progress";

export default function CarouselWithStyledProgress() {
  const [progress, setProgress] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi>();

  const slides = [
    "Slide 1",
    "Slide 2",
    "Slide 3",
    "Slide 4",
    "Slide 5",
    "Slide 6",
    "Slide 7",
  ];

  const onInit = React.useCallback(() => {
    setProgress(0);
  }, []);

  const onScroll = React.useCallback(() => {
    if (!api) return;
    const progress = Math.max(0, Math.min(1, api.scrollProgress())) * 100;
    setProgress(progress);
  }, [api]);

  React.useEffect(() => {
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
    <div className="w-full max-w-sm mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{slide}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-2 flex items-center justify-center">
        <progress className="progress h-2 w-[80%] bg-champagne" value={progress} max="100" ></progress>
      </div>
    </div>
  );
}
