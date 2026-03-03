import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinklePhase: number;
  shouldTwinkle: boolean;
  isShootingStar: boolean;
  shootingProgress: number;
  shootingStartX: number;
  shootingStartY: number;
  shootingEndX: number;
  shootingEndY: number;
}

interface BigStar {
  x: number;
  y: number;
  baseSize: number;
  hue: number;
  hueSpeed: number;
  sizePhase: number;
  sizeSpeed: number;
}

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const stars: Star[] = [];
    const bigStars: BigStar[] = [];
    const starCount = 150;
    const bigStarCount = 0;

    // Create regular stars
    for (let i = 0; i < starCount; i++) {
      const brightness = Math.random();
      const shouldTwinkle = Math.random() > 0.3;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: brightness > 0.7 ? 2.5 : brightness > 0.4 ? 1.5 : 1,
        brightness: brightness,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        shouldTwinkle: shouldTwinkle,
        isShootingStar: false,
        shootingProgress: 0,
        shootingStartX: 0,
        shootingStartY: 0,
        shootingEndX: 0,
        shootingEndY: 0,
      });
    }

    // Create big twinkling stars
    for (let i = 0; i < bigStarCount; i++) {
      bigStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseSize: 4 + Math.random() * 3,
        hue: Math.random() * 60 + 180, // Blue to cyan range
        hueSpeed: Math.random() * 0.5 + 0.3,
        sizePhase: Math.random() * Math.PI * 2,
        sizeSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const drawStar = (x: number, y: number, size: number, opacity: number, color = 'white') => {
      ctx.save();
      ctx.translate(x, y);

      const spikes = 8;
      const outerRadius = size;
      const innerRadius = size * 0.5;

      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      if (color === 'white') {
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        if (opacity > 0.6) {
          ctx.shadowBlur = 8 + opacity * 4;
          ctx.shadowColor = 'rgba(200, 230, 255, 0.8)';
        } else {
          ctx.shadowBlur = 3;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        }
      } else {
        ctx.fillStyle = color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
      }

      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const drawBigStar = (x: number, y: number, size: number, hue: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);

      const spikes = 8;
      const outerRadius = size;
      const innerRadius = size * 0.5;

      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      const color = `hsla(${hue}, 80%, 70%, ${opacity})`;
      ctx.fillStyle = color;
      ctx.shadowBlur = 20 + size * 2;
      ctx.shadowColor = `hsla(${hue}, 100%, 60%, 0.8)`;
      ctx.fill();
      
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const drawShootingStar = (startX: number, startY: number, endX: number, endY: number, progress: number) => {
      const currentX = startX + (endX - startX) * progress;
      const currentY = startY + (endY - startY) * progress;
      const trailLength = 100;
      
      const angle = Math.atan2(endY - startY, endX - startX);
      const trailStartX = currentX - Math.cos(angle) * trailLength;
      const trailStartY = currentY - Math.sin(angle) * trailLength;
      
      const gradient = ctx.createLinearGradient(trailStartX, trailStartY, currentX, currentY);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.6)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(trailStartX, trailStartY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
      
      // Star head
      drawStar(currentX, currentY, 3, 0.9);
    };

    let time = 0;
    let lastShootingStarTime = 0;
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Trigger shooting star every 5 seconds
      if (time - lastShootingStarTime > 5) {
        const availableStars = stars.filter(s => !s.isShootingStar);
        if (availableStars.length > 0) {
          const shootingStar = availableStars[Math.floor(Math.random() * availableStars.length)];
          shootingStar.isShootingStar = true;
          shootingStar.shootingProgress = 0;
          
          // Random starting position
          shootingStar.shootingStartX = Math.random() * canvas.width;
          shootingStar.shootingStartY = Math.random() * canvas.height * 0.4; // Top 40% of screen
          
          // Random diagonal angle (between 30 to 60 degrees downward)
          const angle = (Math.random() * 30 + 30) * (Math.PI / 180);
          const distance = 800 + Math.random() * 200;
          const direction = Math.random() > 0.5 ? 1 : -1; // Left or right
          
          shootingStar.shootingEndX = shootingStar.shootingStartX + Math.cos(angle) * distance * direction;
          shootingStar.shootingEndY = shootingStar.shootingStartY + Math.sin(angle) * distance;
          
          lastShootingStarTime = time;
        }
      }

      // Draw regular stars
      stars.forEach((star) => {
        if (star.isShootingStar) {
          star.shootingProgress += 0.015;
          if (star.shootingProgress <= 1) {
            drawShootingStar(
              star.shootingStartX,
              star.shootingStartY,
              star.shootingEndX,
              star.shootingEndY,
              star.shootingProgress
            );
          } else {
            star.isShootingStar = false;
            star.shootingProgress = 0;
          }
        } else {
          const twinkle = star.shouldTwinkle
            ? Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7
            : 1;
          const opacity = star.brightness * twinkle;
          drawStar(star.x, star.y, star.size, opacity);
        }
      });

      // Draw big twinkling stars
      bigStars.forEach((star) => {
        const hue = star.hue + Math.sin(time * star.hueSpeed) * 30;
        const size = star.baseSize + Math.sin(time * star.sizeSpeed + star.sizePhase) * 2;
        const opacity = 0.7 + Math.sin(time * star.sizeSpeed * 1.5 + star.sizePhase) * 0.3;
        drawBigStar(star.x, star.y, size, hue, opacity);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          'linear-gradient(135deg, hsl(240, 30%, 3%) 0%, hsl(250, 50%, 10%) 50%, hsl(280, 40%, 15%) 100%)',
      }}
    />
  );
};

export default StarField;