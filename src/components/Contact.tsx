import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:kshitijsinha261@gmail.com" data-cursor="disable">
                kshitijsinha261@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+916268760622" data-cursor="disable">
                +91 62687 60622
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://drive.google.com/drive/folders/1arE0apqadL5CLr_qtrGAkwiWlDrB_hsq?usp=sharing"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Certificates <MdArrowOutward />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Kshitij Sinha</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
