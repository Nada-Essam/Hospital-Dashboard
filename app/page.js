import Navbar from "./components/home/Navbar";
import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Services from "./components/home/Services";
import Contact from "./components/home/Contact";
import Footer from "./components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}

