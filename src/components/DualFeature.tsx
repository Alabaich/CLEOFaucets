import React from "react";
import Link from "next/link";

const DualFeature = () => {
  return (
    <div className="fullWidth flex gap-8 justify-between">
      <div className="relative w-1/2 h-[500px]">
        <img
          src="images/image1.png"
          alt="Bathroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute text-left top-28 left-4 transform -translate-y-1/2 text-black z-10 bg-white bg-opacity-75 p-4 rounded-md w-72">
          <h3 className="text-lg font-bold">
            Modern Elegance for Your Bathroom
          </h3>
          <p className="text-sm mb-4">
            Explore our range of faucets, bathtubs, and shower systems to create
            a serene retreat in your home.
          </p>
          <Link
            href="#"
            className="px-4 py-2 text-[#2c2d2c] font-bold bg-blue-50 rounded hover:bg-[#2c2d2c] hover:text-white transition-colors duration-300"
          >
            Explore Bathroom Fixtures
          </Link>
        </div>
      </div>

      <div className="relative w-1/2">
        <img
          src="images/image1.png"
          alt="Kitchen"
          className="w-full h-full object-cover"
        />
        <div className="absolute text-right bottom-[-5rem] right-4 transform -translate-y-1/2 text-black z-10 bg-white bg-opacity-75 p-4 rounded-md w-72">
          <h3 className="text-lg font-bold">
            Functionality Meets Sophistication
          </h3>
          <p className="text-sm mb-4">
            Upgrade your kitchen with durable sinks, high-performance faucets,
            and innovative features.
          </p>
          <Link
            href="#"
            className="px-4 py-2 text-[#2c2d2c] font-bold bg-blue-50 rounded hover:bg-[#2c2d2c] hover:text-white transition-colors duration-300"
          >
            Discover Kitchen Solutions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DualFeature;
