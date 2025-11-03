import { useState } from 'react';
import { Mail, Github, Linkedin, Send, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLaunching, setIsLaunching] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before launching your message!",
        variant: "destructive",
      });
      return;
    }

    setIsLaunching(true);

    // EmailJS configuration
    const serviceID = 'service_t57y6jw'; // Replace with your EmailJS service ID
    const templateID = 'template_li12vmc'; // Replace with your EmailJS template ID
    const publicKey = 'wLF54QE0dWL5Xsz_K'; // Replace with your EmailJS public key

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'shobhitsinghsingh.2019@gmail.com',
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        toast({
          title: "Message Launched! 🚀",
          description: "Your message has been sent successfully. I'll get back to you soon!",
        });
        setFormData({ name: '', email: '', message: '' });
        setIsLaunching(false);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        toast({
          title: "Launch Failed",
          description: "Something went wrong. Please try again or contact me directly via email.",
          variant: "destructive",
        });
        setIsLaunching(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, href: 'https://github.com/shobhit115', label: 'GitHub' },
    { icon: <Linkedin className="w-6 h-6" />, href: 'https://linkedin.com/in/shobhit-singh-34a745249', label: 'LinkedIn' },
    { icon: <Mail className="w-6 h-6" />, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=shobhitsinghsingh.2019@gmail.com', label: 'Email' },
  ];

  return (
    <section id="contact" className="relative py-20 sm:px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Contact
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to start a new journey together? Send a transmission and let's create something amazing!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="bg-background/50 border-primary/30 focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron font-semibold border-glow group"
                disabled={isLaunching}
              >
                {isLaunching ? (
                  <>
                    <Rocket className="mr-2 h-5 w-5 animate-bounce" />
                    Launching...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
              <h3 className="font-orbitron text-2xl font-semibold mb-6 text-gradient">
                Connect Across the Galaxy
              </h3>

              <p className="text-foreground/80 mb-6 leading-relaxed">
                I’m always open to exciting opportunities where I can apply my skills, learn, and make an impact. If you’re looking for a dedicated developer who takes ownership and delivers results, I’d love to connect.
              </p>

              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-glow hover:scale-110 transition-transform duration-300"
                    aria-label={link.label}
                  >
                    <div className="text-background">
                      {link.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 sm:gap-6">
              {/* Location Card */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-primary/30 transition-all hover:border-primary/50 hover:shadow-lg">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-4xl text-primary drop-shadow-[0_0_6px_rgba(147,197,253,0.5)] hover:drop-shadow-[0_0_10px_rgba(147,197,253,0.9)] transition-all duration-300 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 sm:w-10 sm:h-10">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 6.4 11.6 6.7 11.9.2.2.5.2.7 0C12.6 20.6 19 14.3 19 9c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-orbitron font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Current Location</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">Uttrakhand, India , <span className="text-accent font-semibold">Planet Earth</span></p>
                  </div>
                </div>
              </div>

              {/* Clock Card */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
