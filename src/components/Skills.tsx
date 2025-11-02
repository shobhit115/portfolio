import { Code2, Server, Database, Terminal, Cpu, Brain } from 'lucide-react';

const Skills = () => {
  const skills = [
    {
      icon: <Code2 className="w-8 h-8" />,
      name: 'Frontend Development',
      description: 'HTML, CSS, JavaScript, React, Tailwind CSS',
      color: 'primary',
      delay: '0s',
    },
    {
      icon: <Server className="w-8 h-8" />,
      name: 'Backend Development',
      description: 'Node.js, Express, REST APIs',
      color: 'primary',
      delay: '0.1s',
    },
    {
      icon: <Database className="w-8 h-8" />,
      name: 'Database Management',
      description: 'MongoDB, MySQL, PostgreSQL (basic)',
      color: 'primary',
      delay: '0.2s',
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      name: 'Programming & Problem Solving',
      description: 'Python, C, Data Structures & Algorithms',
      color: 'primary',
      delay: '0.3s',
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      name: 'Core Computer Science',
      description: 'Operating Systems, CN, TOC, Digital Logic',
      color: 'primary',
      delay: '0.4s',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      name: 'Research & AI Foundations',
      description: 'Edge Computing, AI/ML Fundamentals (Learning)',
      color: 'primary',
      delay: '0.5s',
    },
  ];
  

  return (
    <section id="skills" className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Skill Constellation
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Building Efficient, Scalable, and Thoughtful Software
          Turning ideas into reliable, performant web solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fade-in-up"
              style={{ animationDelay: skill.delay }}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${skill.color}/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Planet Circle */}
              <div className={`relative w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-${skill.color} to-${skill.color}/50 rounded-full flex items-center justify-center border-glow group-hover:animate-float`}>
                <div className="text-background">
                  {skill.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative text-center">
                <h3 className="font-orbitron text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Orbit Ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
