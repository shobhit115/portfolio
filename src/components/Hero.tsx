import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroSpace from '@/assets/hero2.png';
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "📄 Download started",
      description: "Initiating data transfer sequence...",
      duration: 2000, // auto-close after 2s
    });
  };

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${heroSpace})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-10 right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-2 sm:px-4 animate-fade-in-up">

        <div className="inline-block mb-4">
          <span className="text-primary text-sm font-orbitron tracking-widest uppercase border border-primary/30 px-4 py-2 rounded-full glow-cyan">
            Welcome to My portfolio
          </span>
        </div>

        <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="text-gradient glow-cyan">Shobhit Singh</span>
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-4 font-light">
          Web Developer & AI/ML Enthusiast
        </p>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          I’m a Web Developer and AI/ML Enthusiast passionate about building modern, scalable applications and exploring the intersection of intelligent systems and web technologies.
        </p>

        {/* <Button
          onClick={scrollToAbout}
          size="lg"
          className="group relative bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron font-semibold px-8 py-6 text-lg border-glow transition-all duration-300 hover:scale-105"
        >
          <Rocket className="mr-2 h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
          Explore My Universe
        </Button> */}
        <Button
          asChild
          size="lg"
          onClick={handleDownload}
          className="group relative bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron font-semibold px-8 py-6 text-lg border-glow transition-all duration-300 hover:scale-105"
        >
          <a
            href="/Resume_ShobhitSingh.pdf"
            download
            className="flex items-center"
          >
            <Rocket className="mr-2 h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
            Download Resume
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
