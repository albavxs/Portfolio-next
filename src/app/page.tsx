import Hero from "@/features/hero/Hero";
import About from "@/features/about/About";
import Organization from "@/features/organization/Organization";
import Projects from "@/features/projects/Projects";
import Contact from "@/features/contact/Contact";
import Footer from "@/features/footer/Footer";
import Nav from "@/features/navigation/Nav";
import ParallaxBackground from "@/shared/ui/ParallaxBackground";

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
