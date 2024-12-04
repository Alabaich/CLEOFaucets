// src/components/Carousel.tsx
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; // Correct import for Swiper v10+
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';

const Carousel = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      loop={true}
      speed={600} 
      className="w-full h-[600px] mb-10 rounded" 
    >
      <SwiperSlide className="relative w-full h-full"> {/* Tailwind classes replacing styles.swiperSlide */}
        <Image
          src="/images/image1.png" // Ensure these images exist in public/images/
          alt="Slide 1 Description"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </SwiperSlide>
      <SwiperSlide className="relative w-full h-full"> {/* Tailwind classes replacing styles.swiperSlide */}
        <Image
          src="/images/image2.png"
          alt="Slide 2 Description"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </SwiperSlide>
      {/* Add more SwiperSlides as needed */}
    </Swiper>
  );
};

export default Carousel;
