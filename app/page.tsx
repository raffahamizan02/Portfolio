import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import ProjectGallery from "@/components/ProjectGallery";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Skills />
        <ProjectGallery />
        <ExperienceTimeline />
      </main>
      <Footer />
    </>
  );
}
