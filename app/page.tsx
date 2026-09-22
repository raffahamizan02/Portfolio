import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import ProjectPreview from "@/components/ProjectPreview";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <ProjectPreview />
        <ExperienceTimeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}