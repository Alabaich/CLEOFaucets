// src/app/page.tsx
"use client";

import Carousel from "../components/Carousel"; // Correct default import
import RichText from "@/components/richText";
import FirebaseTestComponent from "@/components/FirebaseTestComponent";
import { db } from "@/utils/firebaseAdmin";
import Slider from "@/components/slider";
import DualFeature from "@/components/DualFeature";
import Innovation from "@/components/Innovations";

const HomePage = () => {
  return (
    <main className="flex flex-col gap-[150px]">
      <div className="fullWidth ">
        <Carousel />
      </div>

      {/* Other homepage content */}
      <section style={styles.section}>
        <RichText
          title="Welcome to Cleo Plumbing"
          text="At Cleo Plumbing, we pride ourselves on offering an extensive selection of high-quality plumbing products, from durable fixtures to modern designs that suit any style. Whether you're renovating your bathroom, upgrading your kitchen, or tackling a commercial project, we provide the solutions you need to complete your work efficiently and effectively. Start your journey to better plumbing today!"
          buttonText="Explore Now"
          buttonLink="/collections"
        />
      </section>
      <DualFeature />
      <Innovation />
      <Slider />
    </main>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: "60px 40px",
    textAlign: "center",
  },
};

export default HomePage;
