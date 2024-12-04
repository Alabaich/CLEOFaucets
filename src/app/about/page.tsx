// src/app/page.tsx


import RichText from '@/components/richText';

const HomePage = () => {
  return (
    <main>
      <section style={styles.section}>
      <RichText
        title="Learn About Us"
        text="Cleo Plumbing has been a trusted name in the industry for years, known for our commitment to customer satisfaction and excellence. Our team is dedicated to providing you with expert advice, innovative products, and outstanding service. Discover our story, values, and how we strive to bring the best plumbing solutions to our customers. Learn more about why we're the go-to choice for professionals and homeowners alike."
        buttonText="About Us"
        buttonLink="/about"
      />
      </section>
    </main>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: '60px 40px',
    textAlign: 'center',
  },
};

export default HomePage;
