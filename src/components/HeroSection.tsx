"use client";

import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import data from "@/data/carouselData.json";

const HeroSection = () => {
  const carousels = data.carousel;

  return (
    <Carousel
      plugins={[Autoplay({ delay: 2000 })]}
      className="max-w-[calc(100%-100px)]"
    >
      <CarouselContent>
        {carousels.map((carousel) => (
          <CarouselItem key={carousel.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="relative w-[1500px] h-48 sm:h-64 md:h-72 lg:h-80 xl:h-[500px]">
                    <Image
                      src={carousel.image}
                      alt={carousel.title}
                      layout="fill"
                      objectFit="fill"
                      className="rounded-md"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HeroSection;
