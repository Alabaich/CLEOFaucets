import React, { useRef } from "react";
import Link from "next/link";

const HorizontalScroller = () => {
  const items = [
    {
      image: "/images/image1.png",
      title: "Title 1",
      description: "From $999",
      link: "https://www.apple.com/shop/buy-iphone/iphone-16-pro",
    },
    {
      image: "/images/image1.png",
      title: "Title 10",
      description: "From $399 or $33.25/mo. for 12 mo.",
      link: "https://www.apple.com/shop/buy-watch/apple-watch",
    },
    {
      image: "/images/image1.png",
      title: "Title mini",
      description: "From $499",
      link: "https://www.apple.com/shop/buy-ipad/ipad-mini",
    },
    {
      image: "/images/image1.png",
      title: "Title mini",
      description: "From $499",
      link: "https://www.apple.com/shop/buy-ipad/ipad-mini",
    },
    {
      image: "/images/image1.png",
      title: "Title mini",
      description: "From $499",
      link: "https://www.apple.com/shop/buy-ipad/ipad-mini",
    },
  ];

  const scrollerRef = useRef(null);

  const scrollLeft = () => {
    scrollerRef.current.scrollBy({
      left: -480,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollerRef.current.scrollBy({
      left: 480,
      behavior: "smooth",
    });
  };

  return (
    <div className="group relative w-full">
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-4 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        aria-label="Scroll Left"
      >
        <img
          src="./arrowSlider.svg"
          alt="Scroll Left"
          className="w-6 h-6 rotate-180"
        />
      </button>

      <div
        ref={scrollerRef}
        className="pl-[150px] pr-[150px] rf-cards-scroller w-full overflow-x-auto flex space-x-8 overflow-x-hidden"
        style={{ scrollBehavior: "smooth" }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="rf-cards-scroller-item flex-shrink-0 h-[500px] flex items-center justify-center"
            style={{ width: "480px" }}
          >
            <Link
              href={item.link}
              className="rf-ccard block rounded-lg overflow-hidden text-decoration-none transform transition-all duration-300 ease-in-out hover:scale-105"
              style={{ textDecoration: "none" }}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute top-4 left-4 text-black z-10 bg-white bg-opacity-75 p-2 rounded-md">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-4 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        aria-label="Scroll Right"
      >
        <img src="./arrowSlider.svg" alt="Scroll Right" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HorizontalScroller;
