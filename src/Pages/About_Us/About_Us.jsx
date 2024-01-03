import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiPost } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";
import { Helmet } from "react-helmet";

const About_Us = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    // document.title = "Artdevotee | About Us";
    window.scrollTo(0, 0);
    ApiPost("about-us", {})
      .then(async (res) => {
        if (res?.data?.result) {
          setData(res?.data?.result?.about_us);
        }
        setLoading(false);
      })
      .catch(async (err) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
    <Helmet>
        <title>About Us - Artdevotee</title>
        <meta
            name="description"
            content="About Us - Artdevotee"
        />
        <meta property="og:title" content="About Us - Artdevotee" />
        <meta property="og:description" content="About Us - Artdevotee" />
        <meta property="og:image" content="https://artdevotee.com/preview/dev/images/about-bnr.png" />
        <link rel="canonical" href="https://artdevotee.com/about-us" />
      </Helmet>
    <div>
      {loading && <Loader />}
      <div className="contact-bnr about-bnr">
        <div className="container">
          <div className="contct-bnr-txt">
            <h1>{data?.page_heading}</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  About
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="contact-pager about-pager">
        <div className="container">
          <div className="about-inr">
            <div className="row">
              <div className="col-lg-6">
                <div className="about-img">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="img-big">
                        <img
                          src={process.env.PUBLIC_URL + "/images/image-big.png"}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="img-small sml-fst">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/images/image-small.png"
                          }
                          alt=""
                        />
                      </div>
                      <div className="img-small">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/images/image-small1.PNG"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="img-big2">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/images/image-big2.png"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="about-text">
                  <div dangerouslySetInnerHTML={{ __html: data?.section }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About_Us;
