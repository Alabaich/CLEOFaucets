"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Correct import for Swiper v10+
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: string;
  imageUrl: string;
  link: string;
}

const Carousel = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/get-promotion-slides");
        if (!res.ok) {
          throw new Error("Failed to fetch promotion slides");
        }
        const data = await res.json();
        setSlides(data.slides);
      } catch (error) {
        console.error("Error fetching promotion slides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return <p className="text-center text-white">Loading slides...</p>;
  }

  if (slides.length === 0) {
    return <p className="text-center text-white">No slides available.</p>;
  }

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      loop={true}
      speed={600}
      className="w-full h-[155px] sm:h-[350px] lg:h-[500px] 2xl:h-[600px] mb-10 rounded"
    >
      {slides.map((slide) => (
        <SwiperSlide
          key={slide.id}
          className="relative w-full h-full"
        >
          <Link href={slide.link} passHref>
            <Image
              src={slide.imageUrl}
              alt={`Promotion Slide ${slide.id}`}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
