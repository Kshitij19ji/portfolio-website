import "./styles/MobileTechStack.css";

const skills = [
  "Python", "PyTorch", "Flask", "Flutter", "Firebase",
  "MySQL", "Dart", "NumPy", "Pandas", "React",
  "Next.js", "C++", "SQL", "HTML", "Git"
];

const ballColors = [
  { bg: "rgba(34, 211, 238, 0.15)", border: "#22d3ee", text: "#a5f3fc" },
  { bg: "rgba(139, 92, 246, 0.15)", border: "#8b5cf6", text: "#c4b5fd" },
  { bg: "rgba(255, 89, 94, 0.15)", border: "#ff595e", text: "#ffadad" },
  { bg: "rgba(255, 202, 58, 0.15)", border: "#ffca3a", text: "#ffd6a5" },
  { bg: "rgba(138, 201, 38, 0.15)", border: "#8ac926", text: "#caffbf" },
  { bg: "rgba(25, 130, 196, 0.15)", border: "#1982c4", text: "#9bf6ff" },
  { bg: "rgba(106, 76, 147, 0.15)", border: "#6a4c93", text: "#bdb2ff" },
  { bg: "rgba(241, 91, 181, 0.15)", border: "#f15bb5", text: "#ffc6ff" },
];

// Pre-defined animation offsets for each ball to avoid React rendering issues
const ballAnimProps = [
  { delay: "0s", duration: "3.1s", tx: "12px", ty: "-18px" },
  { delay: "0.4s", duration: "3.7s", tx: "-15px", ty: "20px" },
  { delay: "0.8s", duration: "4.2s", tx: "20px", ty: "12px" },
  { delay: "1.2s", duration: "3.5s", tx: "-10px", ty: "-22px" },
  { delay: "0.6s", duration: "4.0s", tx: "16px", ty: "16px" },
  { delay: "1.0s", duration: "3.3s", tx: "-20px", ty: "10px" },
  { delay: "0.2s", duration: "3.9s", tx: "10px", ty: "-14px" },
  { delay: "1.4s", duration: "4.5s", tx: "-14px", ty: "20px" },
  { delay: "0.5s", duration: "3.6s", tx: "18px", ty: "-10px" },
  { delay: "0.9s", duration: "4.1s", tx: "-16px", ty: "-18px" },
  { delay: "1.3s", duration: "3.4s", tx: "22px", ty: "14px" },
  { delay: "0.7s", duration: "3.8s", tx: "-12px", ty: "22px" },
  { delay: "1.1s", duration: "4.3s", tx: "14px", ty: "-20px" },
  { delay: "0.3s", duration: "3.2s", tx: "-22px", ty: "12px" },
  { delay: "1.5s", duration: "4.6s", tx: "10px", ty: "18px" },
];

const MobileTechStack = () => {
  return (
    <div className="mobile-techstack">
      <h2 className="mobile-techstack-title">
        My <span>Techstack</span>
      </h2>

      <div className="mobile-balls-arena">
        {skills.map((skill, i) => {
          const color = ballColors[i % ballColors.length];
          const anim = ballAnimProps[i % ballAnimProps.length];
          return (
            <div
              key={i}
              className="mobile-skill-ball"
              style={{
                backgroundColor: color.bg,
                border: `1.5px solid ${color.border}`,
                color: color.text,
                animationDelay: anim.delay,
                animationDuration: anim.duration,
                // CSS custom props for unique float direction per ball
                "--tx": anim.tx,
                "--ty": anim.ty,
              } as React.CSSProperties}
            >
              {skill}
            </div>
          );
        })}
      </div>

      {/* Scrolling marquee below */}
      <div className="mobile-techstack-marquee-wrap">
        <div className="mobile-techstack-marquee">
          {[...skills, ...skills].map((skill, i) => {
            const color = ballColors[i % ballColors.length];
            return (
              <span
                key={i}
                className="mobile-techstack-marquee-item"
                style={{
                  backgroundColor: color.bg,
                  border: `1px solid ${color.border}`,
                  color: color.text,
                }}
              >
                {skill}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileTechStack;
