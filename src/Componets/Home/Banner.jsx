import React from "react";
import {getFileImage } from "../../Api/Api";

const Banner = ({data}) => {
  const bgImage = getFileImage(data?.banner_image);
  return (
    <section className="banner" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-text">
              <h1>
                {data?.section
                  ? data?.section
                  : "Buy beautiful digital wallpaper for your Mobile/Laptop or gift to others"}
              </h1>
            </div>
          </div>
        </div>

        <div className="bnft-inr">
          <h2>
            {data?.subsection ? data?.subsection : "Why Buy Our Products"}
          </h2>
          <div className="bnft-lst">
            <ul>
              {data?.why_buy_point1 && (
                <li>
                  <img src={process.env.PUBLIC_URL + "/images/scd-lst.png"} alt=""/>
                  {data?.why_buy_point1}
                </li>
              )}

              {data?.why_buy_point2 && (
                <li>
                  <img src={process.env.PUBLIC_URL + "/images/scd-lst.png"} alt=""/>
                  {data?.why_buy_point2}
                </li>
              )}

              {data?.why_buy_point3 && (
                <li>
                  <img src={process.env.PUBLIC_URL + "/images/scd-lst.png"} alt=""/>
                  {data?.why_buy_point3}
                </li>
              )}
              {data?.why_buy_point4 && (
                <li>
                  <img src={process.env.PUBLIC_URL + "/images/scd-lst.png"} alt=""/>
                  {data?.why_buy_point4}
                </li>
              )}
              {data?.why_buy_point5 && (
                <li>
                  <img src={process.env.PUBLIC_URL + "/images/scd-lst.png"} alt=""/>
                  {data?.why_buy_point5}
                </li>
              )}
              {data?.why_buy_point6 && (
                <li>
                  <img src={process.env.PUBLIC_URL + "/images/scd-lst.png"} alt=""/>
                  {data?.why_buy_point6}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
