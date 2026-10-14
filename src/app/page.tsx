import Nav from "@/features/navigation/Nav";
import Hero from "@/features/hero/Hero";
import Projects from "@/features/projects/Projects";
import Organization from "@/features/organization/Organization";
import Experience from "@/features/experience/Experience";
import About from "@/features/about/About";
import Contact from "@/features/contact/Contact";
import Footer from "@/features/footer/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="w-full">
        <Hero />
        <Projects />
        <Organization />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
