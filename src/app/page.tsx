import Hero from "@/components/sections/Hero/Hero";
import Skills from "@/components/sections/Skills/Skills";
import Projects from "@/components/sections/Projects/Projects";
import Experience from "@/components/sections/Experience/Experience";
import About from "@/components/sections/About/About";
import Footer from "@/components/sections/Footer/Footer";
import Nav from "@/components/ui/Nav/Nav";

export default function Home() {
  return (
    <main className="w-full">
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <About />
      <Footer />
    </main>
  );
}
