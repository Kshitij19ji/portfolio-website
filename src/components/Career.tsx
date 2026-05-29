import "./styles/Career.css";
import NeuralNetwork from "./NeuralNetwork";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <NeuralNetwork />
      <div className="career-container" style={{ zIndex: 1, position: "relative" }}>
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Subject Matter Expert</h4>
                <h5>Chegg India</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Probability and Statistics SME. Provided step-by-step solutions to complex academic problems, strengthening analytical reasoning and problem-solving skills while maintaining high-quality standards.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Research Intern</h4>
                <h5>IIT Bhilai <span style={{ opacity: 0.6 }}>(6 Months)</span></h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Implemented and evaluated 4 adversarial attacks on deep learning models. Conducted targeted and untargeted analysis on 5 CNN architectures. Executed data preprocessing and model evaluation using Python & PyTorch.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech (Honours) CSE (Data Science)</h4>
                <h5>UTD - CSVTU Bhilai</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Pursuing Bachelor's with Honors in Computer Science specializing in Data Science. Maintained a CGPA of 7.42. Strong focus on Machine Learning, Software Development, and Data Structures & Algorithms.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathons & Achievements</h4>
                <h5>Various</h5>
              </div>
              <h3 style={{ fontSize: "clamp(20px, 3vw, 40px)" }}>2022-Present</h3>
            </div>
            <p>
              Finalist at NIT Raipur 24-Hour Hackathon. Participated in GitHub Dev Days & HackJNU 4.0 (built an AI Empathy System). Complete Gen AI labs at Univ of Calcutta. 2nd Place in CSVTU National Science Day. Certified in Management Information Systems (NPTEL).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
