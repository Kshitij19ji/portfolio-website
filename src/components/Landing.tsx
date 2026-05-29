import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              KSHITIJ
              <br />
              <span>SINHA</span>
            </h1>
          </div>
          <div className="landing-info" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <h3 style={{ margin: 0 }}>Aspiring AI Engineer |</h3>
            <h2 style={{ margin: 0, color: "#c481ff", fontSize: "clamp(32px, 4vw, 75px)", whiteSpace: "nowrap" }}>
              Deep Learning
            </h2>
            <h2 style={{ margin: 0, fontSize: "clamp(32px, 4vw, 75px)", whiteSpace: "nowrap" }}>
              & Computer Vision
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
