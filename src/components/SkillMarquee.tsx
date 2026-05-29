import "./styles/SkillMarquee.css";

interface SkillMarqueeProps {
  skills: string[];
}

const colors = [
  { color: "#ff595e", bg: "rgba(255, 89, 94, 0.15)" },
  { color: "#ffca3a", bg: "rgba(255, 202, 58, 0.15)" },
  { color: "#8ac926", bg: "rgba(138, 201, 38, 0.15)" },
  { color: "#1982c4", bg: "rgba(25, 130, 196, 0.15)" },
  { color: "#6a4c93", bg: "rgba(106, 76, 147, 0.15)" },
  { color: "#f15bb5", bg: "rgba(241, 91, 181, 0.15)" },
  { color: "#00bbf9", bg: "rgba(0, 187, 249, 0.15)" },
  { color: "#00f5d4", bg: "rgba(0, 245, 212, 0.15)" }
];

const SkillMarquee = ({ skills }: SkillMarqueeProps) => {
  const content = skills.map((skill, index) => {
    const colorObj = colors[index % colors.length];
    return (
      <div
        key={index}
        className="skill-marquee-item"
        style={{
          color: colorObj.color,
          backgroundColor: colorObj.bg,
          border: `1px solid ${colorObj.color}`
        }}
      >
        {skill}
      </div>
    );
  });

  return (
    <div className="skill-marquee-container">
      <div className="skill-marquee-view">
        <div className="skill-marquee-content">{content}</div>
        <div className="skill-marquee-content">{content}</div>
      </div>
    </div>
  );
};

export default SkillMarquee;
