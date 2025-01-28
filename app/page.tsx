import Feature from "@/src/blocks/Features";
import Footer from "@/src/blocks/Footer";
import Hero from "@/src/blocks/Hero";
import Hero2 from "@/src/blocks/Hero2";
import Navbar from "@/src/blocks/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Hero2 />
      <Hero />
      <Feature />
      <Footer />
    </div>
  );
}
