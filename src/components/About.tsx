import profileImg from '@/assets/profile.png';

const About = () => {
  return (
    <section id="about" className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Mission Statement
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-[8rem] items-center min-h-screen md:min-h-0">


          {/* Profile Image */}
          <div className="flex justify-center md:justify-end animate-fade-in-up lg:pr-20 xl:pr-32">

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-glow-pulse"></div>
              <a
                href="https://www.linkedin.com/in/shobhit-singh-34a745249/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-2xl transform group-hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <img
                    src={profileImg}
                    alt="Shobhit Singh"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
              <a
                href="https://github.com/shobhit115"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-6 -right-6 w-16 h-16 bg-accent rounded-full flex items-center justify-center border-4 border-background shadow-lg hover:scale-110 transition-transform animate-bounce"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-background"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 
      0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.463-1.11-1.463-.909-.621.069-.609.069-.609 
      1.004.07 1.532 1.032 1.532 1.032.893 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.22-.252-4.555-1.112-4.555-4.949 
      0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.27.098-2.648 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.851.004 
      1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.545 1.379.202 2.396.099 2.648.64.7 1.028 1.595 1.028 2.688 
      0 3.847-2.338 4.694-4.566 4.943.36.31.682.92.682 1.855 
      0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.481A10.013 10.013 0 0022 12.012C22 6.484 17.523 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Hello, I'm <span className="text-primary font-semibold">Shobhit Singh</span>,
              a dedicated web developer focused on building efficient and scalable digital solutions using modern web technologies.
            </p>

            <p className="text-lg text-foreground/80 leading-relaxed">
              With a strong foundation in <span className="text-accent">full-stack development</span>,
              I specialize in creating dynamic, high-performance applications using React, Node.js, and contemporary frameworks.
            </p>

            <p className="text-lg text-foreground/80 leading-relaxed">
              I combine technical expertise with creative problem-solving to design user-centric, reliable, and maintainable software.
              My goal is to deliver clean, impactful solutions that balance innovation with long-term stability.
            </p>


            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-card/50 p-4 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors">
                <div className="text-3xl font-orbitron font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Projects Built</div>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-accent/20 hover:border-accent/50 transition-colors">
                <div className="text-3xl font-orbitron font-bold text-accent">7+</div>
                <div className="text-sm text-muted-foreground">Workshops Conducted</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
