import { useState } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import vakeelaiImg from '../assets/legalai.png';
import repesImg from '../assets/repes.png';
import portfolioImg from "../assets/portfolio.png";
import howoldImg from "../assets/howold.png";
import qrImg from "../assets/qr.png";
import classiflyImg from "../assets/classify.png";
import travelwebsiteImg from "../assets/travel.png";
import hackathonLandingImg from "../assets/landingpage.png";
interface Project {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
  year: number;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');

  const projects: Project[] = [
    {
      title: 'Portfolio Website',
      category: 'Web',
      description: 'My personal developer portfolio',
      longDescription:
        'Responsive portfolio built with Next.js and Tailwind CSS. Includes animated project sections, dark mode, and category filtering — designed to showcase all my major work and achievements.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/shobhit115/portfolio',
      demo: 'https://shobhit115.vercel.app',
      image: portfolioImg,
      year: 2025,
    },
    {
      title: 'Club Hackathon Landing Page',
      category: 'Web',
      description: 'A sleek and modern landing page designed for our club’s hackathon event.',
      longDescription:
        'Built using Vite, Tailwind CSS, and Spline 3D, this project delivers a fast, responsive, and visually engaging landing page for a college hackathon. It featured interactive 3D visuals, smooth animations, and clear event information — focused on aesthetics, speed, and user experience.',
      tech: ['Vite', 'Tailwind CSS', 'Spline 3D'],
      github: 'https://github.com/shobhit115/Landing-page',
      demo: 'https://landing-page-vert-six-14.vercel.app/',
      image: hackathonLandingImg,
      year: 2025,
    },
    {
      title: 'VakeelAI',
      category: 'AI / Web',
      description: 'AI-powered legal assistant for Indian law queries',
      longDescription:
        'VakeelAI is an intelligent legal assistant that answers queries related to Indian laws. It combines Gemini AI, FAISS-based embeddings, and the Tavily API to analyze legal documents and generate context-aware responses via Streamlit.',
      tech: ['Python', 'Streamlit', 'FAISS', 'Gemini API', 'Tavily'],
      github: '',
      demo: '',
      image:
        vakeelaiImg,
      year: 2025,
    },

    {
      title: 'Reps Counting ML Project',
      category: 'AI / CV',
      description: 'Computer vision-based workout rep counter',
      longDescription:
        'A fitness-focused ML project that detects and counts workout repetitions using pose estimation. Built using OpenCV and Mediapipe for real-time joint tracking and Python for logic handling.',
      tech: ['Python', 'OpenCV', 'Mediapipe', 'NumPy'],
      github: 'https://github.com/shobhit115/Reps-Counting-ML-Project',
      demo: '',
      image: repesImg,
      year: 2023,
    },
    {
      title: 'HowOld.AI',
      category: 'AI / CV',
      description: 'Predicts age and gender from images',
      longDescription:
        'A deep learning app that predicts a persons age and gender using TensorFlow and OpenCV. It supports both image uploads and live webcam input, with a clean Streamlit interface.',
      tech: ['Python', 'TensorFlow', 'OpenCV', 'Streamlit'],
      github: 'https://howold.streamlit.app/',
      demo: 'https://howoldai.streamlit.app',
      image: howoldImg,
      year: 2024,
    },
    {
      title: 'QR Code Generator',
      category: 'Web Utility',
      description: 'Instant QR code generator for text or URLs',
      longDescription:
        'A lightweight tool that generates and downloads QR codes instantly. Built with simple UI and minimal dependencies for fast performance and practical usability.',
      tech: ['Python', 'HTML', 'CSS'],
      github: 'https://github.com/shobhit115/QR-Code-Generator',
      demo: 'https://qrcode-maker.streamlit.app/',
      image: qrImg,
      year: 2024,
    },
    {
      title: 'ClassifyX',
      category: 'ML',
      description: 'Interactive image classification web app',
      longDescription:
        'ClassifyX lets users upload or capture images for instant predictions using a PyTorch-based CNN. The Streamlit interface offers real-time feedback and visualization of predictions.',
      tech: ['Python', 'PyTorch', 'Streamlit'],
      github: 'https://github.com/shobhit115/ClassifyX',
      demo: 'https://classify-x.streamlit.app/',
      image: classiflyImg,
      year: 2024,
    },
    {
      title: 'Travel Website',
      category: 'Web',
      description: 'A responsive travel-themed website built for a hackathon during my 1st year of graduation.',
      longDescription:
        'Developed using HTML, CSS, and JavaScript, this project was a fully responsive travel website created for a college hackathon. It featured destination showcases, image galleries, and smooth UI animations, focusing on user-friendly navigation and visual appeal.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/shobhit115/Travel_website',
      demo: 'https://infiniycoderspsrs.netlify.app/home',
      image: travelwebsiteImg,
      year: 2022,
    },

  ];

  const categories = ['All', 'Web', 'ML', 'Open Source'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Project Galaxy
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my universe of projects spanning web development, machine learning, and open source
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? 'default' : 'outline'}
              className={`font-orbitron ${filter === category
                  ? 'bg-primary text-primary-foreground border-glow'
                  : 'hover:border-primary/50'
                }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60"></div>
                <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs px-3 py-1 rounded-full font-orbitron">
                  {project.category}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="font-orbitron text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{project.tech.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-primary/30 p-4 sm:p-6">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-orbitron text-xl sm:text-2xl text-gradient flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span>{selectedProject.title}</span>
                    <span className="text-sm sm:text-base text-muted-foreground font-normal">
                      {selectedProject.year}
                    </span>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 sm:space-y-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                  />

                  <p className="text-foreground/90 leading-relaxed text-sm sm:text-base">
                    {selectedProject.longDescription}
                  </p>

                  <div>
                    <h4 className="font-orbitron font-semibold mb-3 text-sm sm:text-base">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full border border-primary/30 text-xs sm:text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <Button
                      asChild
                      className="flex-1 bg-primary hover:bg-primary/90 border-glow text-sm sm:text-base"
                    >
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 hover:border-primary/50 text-sm sm:text-base"
                    >
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;
