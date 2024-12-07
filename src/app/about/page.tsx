// src/app/page.tsx

import InnovationsAboutUs from "@/components/InnovationsAboutUs";
import RichText from "@/components/richText";
import SingleImage from "@/components/SingleImage";

const AboutPage = () => {
  return (
    <main>
      <SingleImage src="/images/image1.png" />
      <RichText
        title="Who We Are"
        text="At Cleo Faucets, we bring over 30 years of industry expertise in delivering plumbing fixtures that cater to the unique needs of Canadian homes. We combine our expertise with a commitment to offering stylish, high-quality, and affordable plumbing fixtures for Canadian homes, ensuring every product meets both aesthetic and practical standards."
      />
      <SingleImage src="/images/image1.png" />
      <RichText
        title="Our Vision"
        text="At Cleo Faucets, we believe that luxury should be accessible to everyone. Our goal is to provide Canadians with elegant plumbing fixtures that offer both high quality and affordable pricing. We are committed to delivering products that blend style, durability, and practicality, ensuring that every home, whether large or small, can experience the beauty of sophisticated design without the premium cost."
      />
      <SingleImage src="/images/image1.png" />
      <RichText
        title="Our Partnerships"
        text="We pride ourselves on fostering strong relationships with:
<br>
    Retailers and sellers of plumbing fixtures, ensuring seamless access to our products.
    <br>
    Homeowners and industry professionals, working closely with them to deliver tailored solutions for every space."
      />
      <SingleImage src="/images/image1.png" />
      <InnovationsAboutUs />
    </main>
  );
};

export default AboutPage;
