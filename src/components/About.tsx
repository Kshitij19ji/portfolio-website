import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-image-container">
        <div className="about-image-wrapper">
          <img src="/profile.jpg" alt="Kshitij Sinha" className="about-image" />
          <div className="about-image-glow"></div>
        </div>
      </div>
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am a B.Tech (Honours) graduate in Computer Science with a specialization in Data Science, passionate about Artificial Intelligence and solving real-world problems through technology. I have gained hands-on experience in deep learning and adversarial machine learning during my research internship at IIT Bhilai, where I worked on analyzing the robustness of modern CNN architectures.
          <br /><br />
          I enjoy building impactful projects, including an autonomous drone navigation system for GPS-denied environments and scalable full-stack applications. My work reflects a strong blend of analytical thinking, experimentation, and continuous learning.
          <br /><br />
          Currently, I am focused on developing AI-driven systems, enhancing my problem-solving abilities, and growing as a data science professional.
        </p>
      </div>
    </div>
  );
};

export default About;
