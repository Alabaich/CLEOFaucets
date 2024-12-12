// src/app/page.tsx
"use client";

import Carousel from "../components/Carousel"; // Correct default import
import RichText from "@/components/richText";
import Slider from "@/components/slider";
import DualFeature from "@/components/DualFeature";
import Innovation from "@/components/Innovations";

const HomePage = () => {
  return (
    <main className="flex flex-col gap-[50px]">
      <div className="fullWidth h-[185px] sm:h-[380px] lg:h-[550px] 2xl:h-[650px]">
        <Carousel />
      </div>

      {/* Other homepage content */}
      <section>
        <RichText
          title="Welcome to Cleo Plumbing"
          text="At Cleo Plumbing, we pride ourselves on offering an extensive selection of high-quality plumbing products, from durable fixtures to modern designs that suit any style. Whether you're renovating your bathroom, upgrading your kitchen, or tackling a commercial project, we provide the solutions you need to complete your work efficiently and effectively. Start your journey to better plumbing today!"
          buttonText="Explore Now"
          buttonLink="/collections"
        />
      </section>
      {/* <DualFeature /> */}
      <Innovation />
      <Slider />
    </main>
  );
};



export default HomePage;
