import { useEffect, useState, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 1200);
      }
    });
  }, [isLoaded]);

  // Particle grid canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; pulse: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      // Check if loading is complete to save battery/CPU and prevent lag
      const loadingScreen = document.querySelector(".loading-screen");
      if (loadingScreen && loadingScreen.classList.contains("loading-screen-exit")) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const currentAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${currentAlpha})`;
        ctx.fill();

        // Draw connections
        particles.forEach((p2, j) => {
          if (j <= i) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className={`loading-screen ${clicked ? "loading-screen-exit" : ""}`}>
        {/* Particle canvas */}
        <canvas ref={canvasRef} className="loader-particle-canvas" />

        {/* Scanline overlay */}
        <div className="loader-scanline-overlay"></div>

        {/* Corner decorators */}
        <div className="loader-corner loader-corner-tl"></div>
        <div className="loader-corner loader-corner-tr"></div>
        <div className="loader-corner loader-corner-bl"></div>
        <div className="loader-corner loader-corner-br"></div>

        {/* System boot text */}
        <div className="system-boot-text">
          <div className="boot-line">SYSTEM INITIALIZATION SEQUENCE INITIATED...</div>
          <div className="boot-line">ESTABLISHING SECURE CONNECTION...</div>
          <div className="boot-line">ACCESSING MAINFRAME...</div>
          <div className="boot-line">STATUS: [ <span className="boot-online">ONLINE</span> ]</div>
        </div>

        {/* Profile card */}
        <div className={`loader-profile-card ${clicked ? "loader-fade-out" : ""}`}>
          {/* Animated border ring */}
          <div className="loader-card-border-ring"></div>

          <div className="loader-profile-image-container">
            <img src="/profile.jpg" alt="Kshitij Sinha" className="loader-profile-image" />
            <div className="loader-profile-ring"></div>
            <div className="loader-profile-glow"></div>
          </div>

          <div className="loader-profile-info">
            <div className="loader-welcome">
              <span className="loader-welcome-dot"></span>
              SYSTEM ACCESS GRANTED
            </div>

            <h1 className="loader-name" data-text="KSHITIJ SINHA">
              KSHITIJ SINHA
            </h1>

            <div className="loader-degree-badge">
              <span className="loader-degree-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
                </svg>
              </span>
              <span className="loader-degree-text">
                B.Tech (Honours) — Computer Science
              </span>
            </div>

            <div className="loader-specialization">
              <span className="loader-spec-line"></span>
              <span>Specialization in Data Science</span>
              <span className="loader-spec-line"></span>
            </div>

            <div className="loader-tags">
              <span className="loader-tag">AI / ML</span>
              <span className="loader-tag">Deep Learning</span>
              <span className="loader-tag">Computer Vision</span>
            </div>
          </div>
        </div>

        {/* Loading bar */}
        <div className="loader-bottom-section">
          <div
            className={`loading-wrap ${clicked && "loading-clicked"}`}
            onMouseMove={(e) => handleMouseMove(e)}
          >
            <div className="loading-hover"></div>
            <div className={`loading-button ${loaded && "loading-complete"}`}>
              <div className="loading-container">
                <div className="loading-content">
                  <div className="loading-content-in">
                    Loading <span>{percent}%</span>
                  </div>
                </div>
                <div className="loading-box"></div>
              </div>
              <div className="loading-content2">
                <span style={{ color: "#22d3ee" }}>▸ ENTER PORTFOLIO</span>
              </div>
            </div>
          </div>

          {/* Progress bar below button */}
          <div className={`loader-progress-track ${clicked ? "loader-progress-hide" : ""}`}>
            <div
              className="loader-progress-fill"
              style={{ width: `${Math.min(percent, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 15);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random() * 15);
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 150);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
