import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";
import TerminalWidget from "./TerminalWidget";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    let isMobile = window.innerWidth <= 1024;
    
    if (!isMobile) {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.7,
        speed: 1.7,
        effects: true,
        autoResize: true,
        ignoreMobileResize: true,
      });

      smoother.scrollTop(0);
      smoother.paused(true);
    }

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        let currentTarget = e.currentTarget as HTMLAnchorElement;
        let section = currentTarget.getAttribute("data-href");

        // Only prevent default and scroll if it's an internal section link
        if (section && !isMobile) {
          e.preventDefault();
          if (smoother) smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      if (!isMobile && smoother) {
        ScrollSmoother.refresh(true);
      }
    });
  }, []);
  return (
    <>
      <div className="header">
        <div className="navbar-left">
          <a href="/#" className="navbar-title" data-cursor="disable">
            Kshitij19ji
          </a>
          <a
            href="mailto:kshitijsinha261@gmail.com"
            className="navbar-connect"
            data-cursor="disable"
          >
            kshitijsinha261@gmail.com
          </a>
        </div>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="PROJECTS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="navbar-resume-btn magnetic"
            >
              RESUME
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
