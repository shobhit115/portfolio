import StarField from '@/components/StarField';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Blogs from "@/components/Blogs";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <Navigation />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blogs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
