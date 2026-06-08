import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let isMobile = window.innerWidth <= 1024;
    if (isMobile) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Projects</span>
        </h2>
        <div className="work-flex">
          {[
            {
              name: "GPS-Denied Navigation System",
              category: "Autonomous Drones",
              description: "Developed an autonomous drone navigation system for GPS-denied environments using Lazy Theta* path planning and real-time SLAM. Implemented 9-direction obstacle avoidance, autonomous replanning, and PID-based flight control. Designed an interactive 3D dashboard for real-time path visualization and telemetry.",
              tools: "Python, Flask, Webots, SLAM, Lazy Theta*, PID Control, LiDAR, Three.js",
              image: "/images/autonav.png"
            },
            {
              name: "Inventory Management System",
              category: "University Services",
              description: "Designed and developed an inventory management system to improve selection, tracking, and documentation of stationery items across university facilities. Facilitated user ability to select multiple inventory items and automatically generate PDF reports.",
              tools: "Dart language (Flutter), Firebase, MySQL",
              image: "/images/invi.jpg"
            },
            {
              name: "AI based Sketch-to-UI",
              category: "AI Project",
              description: "Developed an AI-powered system using Gemini Vision to convert hand-drawn sketches or design mockups into functional web interfaces automatically. Designed a multi-agent workflow to handle UI generation, backend logic, and code refinement with live preview and ZIP exports.",
              tools: "Next.js, React, Tailwind CSS, FastAPI, Python, Gemini Vision API, Pillow",
              image: "/images/sketch2ui.png"
            }
          ].map((project, index) => {
            const tagColors = [
              { bg: "rgba(255, 89, 94, 0.15)", border: "#ff595e", text: "#ffadad" },
              { bg: "rgba(255, 202, 58, 0.15)", border: "#ffca3a", text: "#ffd6a5" },
              { bg: "rgba(138, 201, 38, 0.15)", border: "#8ac926", text: "#caffbf" },
              { bg: "rgba(25, 130, 196, 0.15)", border: "#1982c4", text: "#9bf6ff" },
              { bg: "rgba(106, 76, 147, 0.15)", border: "#6a4c93", text: "#bdb2ff" },
              { bg: "rgba(241, 91, 181, 0.15)", border: "#f15bb5", text: "#ffc6ff" },
              { bg: "rgba(0, 187, 249, 0.15)", border: "#00bbf9", text: "#a0c4ff" },
              { bg: "rgba(0, 245, 212, 0.15)", border: "#00f5d4", text: "#9fd3c7" }
            ];

            return (
              <div className="work-box" key={index}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{index + 1}</h3>

                    <div>
                      <h4>{project.name}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Overview</h4>
                  <p style={{ fontSize: "13px", lineHeight: "1.5", marginTop: "10px", marginBottom: "20px", display: "block" }}>{project.description}</p>
                  <h4>Tools and features</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
                    {project.tools.split(", ").map((tool, i) => {
                      const color = tagColors[i % tagColors.length];
                      return (
                        <span
                          key={i}
                          style={{
                            backgroundColor: color.bg,
                            border: `1px solid ${color.border}`,
                            color: color.text,
                            padding: "5px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "500",
                            letterSpacing: "0.5px"
                          }}
                        >
                          {tool}
                        </span>
                      )
                    })}
                  </div>
                </div>
                <WorkImage image={project.image} alt={project.name} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;
