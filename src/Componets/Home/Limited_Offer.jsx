import React from "react";
import { Link } from "react-router-dom";

const Limited_Offer = ({data}) => {
  return (
    <section className="limited">
      <div className="container">
        <div className="lmtd-inr">
          <h2>
            <p>{data?.limited_offer_heading}</p>
            </h2>
          <p>
            {data?.limited_offer_description}
          </p>
          <Link to="/search-product" className="bnr-btn">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Limited_Offer;
