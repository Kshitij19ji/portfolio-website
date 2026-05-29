import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DEEP LEARNING RESEARCH</h3>
              <h4>Adversarial ML & Model Analysis</h4>
              <p>
                Conducting experiments on deep learning models, analyzing CNN robustness, and performing adversarial attack testing to evaluate model performance under real-world conditions. Experienced in PyTorch and deep learning workflows, working with CNN architectures, adversarial techniques, and tools like Python, NumPy, Pandas, and Google Colab for experimentation and analysis.
              </p>
              <h5>Skills or tools :</h5>
              <div className="what-content-flex">
                {[
                  "Python", "PyTorch", "NumPy", "Pandas", "Deep Learning",
                  "CNN Architectures", "Adversarial ML", "Google Colab",
                  "C/C++", "R", "Data Structures"
                ].map((tool, i) => {
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
                  const color = tagColors[i % tagColors.length];
                  return (
                    <div
                      key={i}
                      className="what-tags"
                      style={{
                        backgroundColor: color.bg,
                        border: `1px solid ${color.border}`,
                        color: color.text,
                        fontWeight: "500",
                        letterSpacing: "0.5px"
                      }}
                    >
                      {tool}
                    </div>
                  );
                })}
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>REAL-WORLD PROJECTS</h3>
              <h4>System Design & Practical Applications</h4>
              <p>
                Developing real-world systems such as autonomous drone navigation in GPS-denied environments and scalable applications like inventory management systems. Also building AI-powered tools like Sketch-to-UI, which converts design ideas into functional web interfaces.
              </p>
              <h5>Skills or tools :</h5>
              <div className="what-content-flex">
                {[
                  "Python", "System Design", "Flask", "Flutter", "Firebase",
                  "MySQL", "Webots", "Git", "Next.js", "React", "TypeScript", "Tailwind CSS"
                ].map((tool, i) => {
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
                  const color = tagColors[i % tagColors.length];
                  return (
                    <div
                      key={i}
                      className="what-tags"
                      style={{
                        backgroundColor: color.bg,
                        border: `1px solid ${color.border}`,
                        color: color.text,
                        fontWeight: "500",
                        letterSpacing: "0.5px"
                      }}
                    >
                      {tool}
                    </div>
                  );
                })}
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
