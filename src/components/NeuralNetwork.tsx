import { useRef, useEffect } from "react";

const NeuralNetwork = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Skip heavy particle animation on mobile
        if (window.innerWidth <= 1024) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        const numParticles = 70;
        const connectionDistance = 150;
        let animationFrameId: number;

        const mouse = { x: -1000, y: -1000 };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleResize = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 1.2;
                this.vy = (Math.random() - 0.5) * 1.2;
                this.radius = Math.random() * 2 + 0.5;
            }

            update(w: number, h: number) {
                // Bounce off edges
                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction (repel)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const forceDirectionX = dx / dist;
                    const forceDirectionY = dy / dist;
                    const force = (150 - dist) / 150;
                    this.x -= forceDirectionX * force * 3;
                    this.y -= forceDirectionY * force * 3;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = "#22d3ee"; // Cyan primary
                ctx.fill();
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#06b6d4";
            }
        }

        const initParticles = () => {
            particles = [];
            const w = canvas.width;
            const h = canvas.height;
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle(w, h));
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < numParticles; i++) {
                particles[i].update(w, h);
                particles[i].draw();

                for (let j = i + 1; j < numParticles; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        // Opacity falls off based on distance
                        const opacity = 1 - Math.pow(dist / connectionDistance, 2);
                        ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove); // Using window to track even if hovered over text
        window.addEventListener("mouseleave", () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        handleResize();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none", // Ensures it doesn't block text selection
                opacity: 0.6, // Blend gently into background
            }}
        />
    );
};

export default NeuralNetwork;
