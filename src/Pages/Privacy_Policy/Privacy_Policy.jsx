import React, { useEffect } from "react";
import { useState } from "react";
import { ApiPost } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";
import No_Data_Found from "../../Componets/No_data_found/No_Data_Found";
import { Helmet } from "react-helmet";

const Privacy_Policy = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    // document.title = "Artdevotee | Privacy Policy";
    window.scrollTo(0, 0);
    ApiPost("privacy-policy", {})
      .then(async (res) => {
        if (res?.data?.result) {
          setData(res?.data?.result?.privacy_policy);
        }
        setLoading(false);
      })
      .catch(async (err) => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Helmet>
        <title>Privacy Policy - Artdevotee</title>
        <meta
            name="description"
            content="Privacy Policy - Artdevotee"
        />
        <meta property="og:title" content="Privacy Policy - Artdevotee" />
        <meta property="og:description" content="Privacy Policy - Artdevotee" />
        <meta property="og:image" content="https://artdevotee.com/preview/dev/images/how-bnr.png" />
        <link rel="canonical" href="https://artdevotee.com/privacy-policy" />
      </Helmet>
      {loading && <Loader />}
      <div className="privacy-pg">
        {data?.length !== 0 && (
          <div className="container">
            <h1>{data?.page_heading}</h1>
            <div className="pri-top">
              <div dangerouslySetInnerHTML={{ __html: data?.section }} />
            </div>

            <div className="pri-inr">
              <div dangerouslySetInnerHTML={{ __html: data?.subsection }} />
            </div>
          </div>
        )}
        {data?.length === 0 && <No_Data_Found />}
      </div>
    </div>
  );
};

export default Privacy_Policy;
