import React from "react";
import { Link } from "react-router-dom";

const No_Data_Found = ({ type }) => {
  return (
    <div className="text-center w-100">
      <img
        className="no_data_img"
        src={process.env.PUBLIC_URL + "/images/no-data-found.png"}
        alt=""
      />
      {type === "cart" && (
        <ul className="pay-btns no_data_btn">
          <li>
            <Link to="/search-product" className="shop-btn">
              Continue Shopping
            </Link>
          </li>
        </ul>
      )}
      {type === "gift-cart" && (
        <ul className="pay-btns no_data_btn">
          <li>
            <Link to="/purchase-gift-card" className="shop-btn">
              Continue Buy Gift Card
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default No_Data_Found;
