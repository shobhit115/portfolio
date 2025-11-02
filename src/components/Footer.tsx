import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-6 px-4 border-t border-primary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          {/* Crafted by section */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-muted-foreground text-sm sm:text-base">
            <span>Crafted with</span>
            <Heart
              className="w-4 h-4 text-accent animate-glow-pulse"
              fill="currentColor"
            />
            <span>
              by{" "}
              <span className="text-primary font-semibold">Shobhit Singh</span>
            </span>
          </div>

          {/* Copyright */}
          <div className="text-muted-foreground text-xs sm:text-sm order-3 sm:order-none">
            © {currentYear} All rights reserved
          </div>

          {/* Powered by */}
          <div className="flex items-center justify-center sm:justify-end gap-1.5 text-sm sm:text-base">
            <span className="text-muted-foreground">Powered by</span>
            <span className="font-orbitron text-primary font-semibold glow-cyan">
              React
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
