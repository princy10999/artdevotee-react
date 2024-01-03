import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
import { ApiPost } from "../../Api/Api";

const Footer = () => {
  const location = useLocation();
  const [about, setAbout] = useState([]);
  useEffect(() => {
    ApiPost("get-home-content", {}).then((res) => {
      if (res?.data?.result) {
        setAbout(res?.data?.result?.about);
      }
    });
  }, []);
  return (
    <>
      <section className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="foot-top-inr">
              <a href="index.html" className="foot-logo">
                <img
                  src={process.env.PUBLIC_URL + "/images/foot-logo.png"}
                  alt=""
                />
              </a>
              <ul className="sos-icns">
                <li>
                  <PinterestShareButton
                    media={
                      "https://artdevotee.com/preview/dev" + location?.pathname
                    }
                    description={
                      "https://artdevotee.com/preview/dev" + location?.pathname
                    }
                    url={
                      "https://artdevotee.com/preview/dev" + location?.pathname
                    }
                  >
                    <a>
                      <i className="fa fa-pinterest" aria-hidden="true"></i>
                    </a>
                  </PinterestShareButton>
                </li>
                <li>
                  <FacebookShareButton
                    url={
                      "https://artdevotee.com/preview/dev" + location?.pathname
                    }
                  >
                    <a>
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                  </FacebookShareButton>
                </li>
                <li>
                  <TwitterShareButton
                    url={
                      "https://artdevotee.com/preview/dev" + location?.pathname
                    }
                  >
                    <a>
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </TwitterShareButton>
                </li>
                <li>
                  <LinkedinShareButton
                    url={
                      "https://artdevotee.com/preview/dev" + location?.pathname
                    }
                  >
                    <a>
                      <i className="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                  </LinkedinShareButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-mid">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="fot-fst">
                  <p dangerouslySetInnerHTML={{ __html: about }} />
                  <Link to="/about-us">Read More +</Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="fot-scnd">
                  <h4>Quick Links</h4>
                  <div className="fot-scnd-inr">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link to="/">Our Products</Link>
                      </li>
                      <li>
                        <Link to="/sign-up">Sign Up</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <Link to="/contact-us">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="/how-it-works">How It Works</Link>
                      </li>
                      <li>
                        <Link to="/faq">FAQ</Link>
                      </li>
                      <li>
                        <Link to="/terms-condition">Terms and Conditions</Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="fot-lst">
                  <h4>Get In Touch</h4>
                  <ul>
                    <li>
                      <img
                        src={process.env.PUBLIC_URL + "/images/foot-loc.png"}
                        alt=""
                      />
                      Lorem Ipsum is simply dummy caption dummy address info
                      here.
                    </li>
                    <li className="fot-call">
                      <img
                        src={process.env.PUBLIC_URL + "/images/fot-call.png"}
                        alt=""
                      />
                      <a className="a_hover" href={`tel:+1 0123456789`}>
                        +1 0123456789
                      </a>
                      /
                      <a className="a_hover" href={`tel:+1 9876543210`}>
                        +1 9876543210
                      </a>{" "}
                    </li>
                    <li>
                      <img
                        src={process.env.PUBLIC_URL + "/images/fot-mail.png"}
                        alt=""
                      />
                      <a
                        className="a_hover"
                        href={`mailto:info@artdevotee.com`}
                      >
                        info@artdevotee.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-btm">
          <div className="container">
            <div className="foot-btm-inr">
              <p>
                Copyright &copy; 2022{" "}
                <Link to="/" target="_blank">
                  artdevotee.com
                </Link>{" "}
                | All Rights Reserved.
              </p>
              <ul className="pay-opt">
                <li>
                  <p>Secure Payment Options</p>
                </li>
                <li>
                  <img src={process.env.PUBLIC_URL + "/images/visa.png"} alt=""/>
                </li>
                <li>
                  <img src={process.env.PUBLIC_URL + "/images/master.png"} alt=""/>
                </li>
                <li>
                  <img src={process.env.PUBLIC_URL + "/images/discover.png"} alt=""/>
                </li>
                <li>
                  <img src={process.env.PUBLIC_URL + "/images/american.png"}alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div id="stop" className="scrollTop">
        <span>
          <Link to="#">
            <img src={process.env.PUBLIC_URL + "/images/go-to-top.png"} alt=""/>
          </Link>
        </span>
      </div>
    </>
  );
};

export default Footer;
