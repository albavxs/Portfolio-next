import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Organization from "@/components/sections/Organization/Organization";
import Projects from "@/components/sections/Projects/Projects";
import Contact from "@/components/sections/Contact/Contact";
import Footer from "@/components/sections/Footer/Footer";
import Nav from "@/components/ui/Nav/Nav";
import ParallaxBackground from "@/components/ui/ParallaxBackground/ParallaxBackground";

export default function Home() {
  return (
    <main className="w-full">
      <Nav />
      <Hero />
      <ParallaxBackground />
      <div className="relative z-[1]">
        <About />
        <Organization />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
