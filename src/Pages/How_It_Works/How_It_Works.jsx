import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ApiPost } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";
import { Helmet } from "react-helmet";

const How_It_Works = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    // document.title = "Artdevotee | How It Works";
    window.scrollTo(0, 0);
    ApiPost("how-it-works", {})
      .then(async (res) => {
        if (res?.data?.result) {
          setData(res?.data?.result?.how_it_works);
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
        <title>How it Works - Artdevotee</title>
        <meta
            name="description"
            content="How it Works - Artdevotee"
        />
        <meta property="og:title" content="How it Works - Artdevotee" />
        <meta property="og:description" content="How it Works - Artdevotee" />
        <meta property="og:image" content="https://artdevotee.com/preview/dev/images/how-bnr.png" />
        <link rel="canonical" href="https://artdevotee.com/how-it-works" />
      </Helmet>
      {loading && <Loader />}
      <div className="contact-bnr how-bnr">
        <div className="container">
          <div className="contct-bnr-txt">
            <h1>{data?.page_heading}</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {data?.page_heading}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="how-pager">
        <div className="container">
          {/* <div className="how-box">
        
    <div dangerouslySetInnerHTML={{ __html: data?.section }}/>
    </div> */}
          <div className="how-box">
            <div className="how-text pl-5">
              {/* <h3>1. Choose Your Artwork</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non fermentum sapien. Vivamus vel pharetra lectus, sed viverra elit. Nam ex massa, eleifend ut lorem id, imperdiet tincidunt nunc. Integer tempor euismod orci pharetra fermentum. Sed lobortis ut mi sit amet imperdiet. Morbi nec nisi id neque mollis consectetur hendrerit sit amet arcu.</p>
                <ul>
                    <li>Quisque imperdiet ac nisi a ullamcorper. Praesent iaculis rhoncus odio</li>
                    <li>Quisque imperdiet ac nisi a ullamcorper. Praesent iaculis rhoncus odio</li>
                    <li>Quisque imperdiet ac nisi a ullamcorper. Praesent iaculis rhoncus odio</li>
                    <li>Quisque imperdiet ac nisi a ullamcorper. Praesent iaculis rhoncus odio</li>
                </ul> */}
              <div dangerouslySetInnerHTML={{ __html: data?.section }} />
            </div>
          </div>
          <div className="how-box box-rev">
            <div className="how-text pl-5">
              {/* <h3>2. Enquire for Changes</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non fermentum sapien. Vivamus vel pharetra lectus, sed viverra elit. Nam ex massa, eleifend ut lorem id, imperdiet tincidunt nunc. Integer tempor euismod orci pharetra fermentum. Sed lobortis ut mi sit amet imperdiet. Morbi nec nisi id neque mollis consectetur hendrerit sit amet arcu.</p>
                <ul>
                    <li>Quisque imperdiet ac nisi a ullamcorper. Praesent iaculis rhoncus odio</li>
                    <li>Quisque imperdiet ac nisi a ullamcorper. Praesent iaculis rhoncus odio</li>
                    
                </ul> */}
              <div dangerouslySetInnerHTML={{ __html: data?.how_it_work2 }} />
            </div>
            <div className="how-img">
              <img src={process.env.PUBLIC_URL + "/images/enquiry.png"} alt=""/>
            </div>
          </div>
          <div className="how-box">
            <div className="how-img">
              <img src={process.env.PUBLIC_URL + "/images/how-gift.png"} alt=""/>
            </div>
            <div className="how-text pl-5">
              {/* <h3>3. Gift Others</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non fermentum sapien. Vivamus vel pharetra lectus, sed viverra elit. Nam ex massa, eleifend ut lorem id, imperdiet tincidunt nunc. Integer tempor euismod orci pharetra fermentum. Sed lobortis ut mi sit amet imperdiet. Morbi nec nisi id neque mollis consectetur hendrerit sit amet arcu.</p>
                <ul>
                    <li>Quisque imperdiet ac nisi a ullamcorper. Praesent iaculis rhoncus odio</li>
                    <li>Quisque imperdiet ac nisi a ullamcorper. Praesent iaculis rhoncus odio</li>
                    <li>Quisque imperdiet ac nisi a ullamcorper. Praesent iaculis rhoncus odio</li>
                    <li>Quisque imperdiet ac nisi a ullamcorper. Praesent iaculis rhoncus odio</li>
                </ul> */}
              <div dangerouslySetInnerHTML={{ __html: data?.how_it_work3 }} />
            </div>
          </div>
          <div className="how-box box-rev">
            <div className="how-text">
              {/* <h3>4. Download Final Piece</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non fermentum sapien. Vivamus vel pharetra lectus, sed viverra elit. Nam ex massa, eleifend ut lorem id, imperdiet tincidunt nunc. Integer tempor euismod orci pharetra fermentum. Sed lobortis ut mi sit amet imperdiet. Morbi nec nisi id neque mollis consectetur hendrerit sit amet arcu.</p> */}
              <div dangerouslySetInnerHTML={{ __html: data?.how_it_work4 }} />
            </div>
          </div>
          <h2 className="did-not">
            Still Confused? Look through our <Link to="/faq">FAQs</Link>
          </h2>
        </div>
      </div>
    </>
  );
};

export default How_It_Works;
