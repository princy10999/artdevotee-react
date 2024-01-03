import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidemenu = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userinfo"));
  const location = useLocation();
  const logout = () => {
    localStorage.removeItem("userinfo");
    localStorage.removeItem("access_tocken");
    navigate("/login");
  };
  return (
    <div className="dashbord_left sticky_new">
      <div className="dashbord_left_ir" id="mobile_menu_dv">
        <div className="dashbord_left_top">
          <div className="media">
            <em>
              <img
                src={
                  userData?.profile_image
                    ? "https://artdevotee.com/preview/storage/app/public/profile_picture/" +
                      userData?.profile_image
                    : process.env.PUBLIC_URL + "/images/Rectangle688.png"
                }
                alt=""
              />
            </em>
            <div className="media-body">
              <h4>
                {userData?.first_name} {userData?.last_name}
              </h4>
              <p>{userData?.email}</p>
            </div>
          </div>
        </div>
        <div className="dash_pro_link">
          <ul>
            <li>
              <Link
                to="/dashboard"
                className={location.pathname === "/dashboard" && "actv"}
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/das_icon1.png"}
                  alt=""
                />
                <span>Dashboard </span>
              </Link>
            </li>
            <li>
              <Link
                to="/edit-profile"
                className={location.pathname === "/edit-profile" && "actv"}
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/das_icon2.png"}
                  alt=""
                />
                <span>Edit Profile</span>
              </Link>
            </li>
            {userData?.signup_by !== "G" && (
              <li>
                <Link
                  to="/change-password"
                  className={location.pathname === "/change-password" && "actv"}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/images/das_icon6.png"}
                    alt=""
                  />
                  <span>Change Password</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/my-wishlist"
                className={location.pathname === "/my-wishlist" && "actv"}
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/das_icon5.png"}
                  alt=""
                />
                <span>My Wishlist</span>
              </Link>
            </li>
            <li>
              <Link
                to="/my-order"
                className={
                  (location.pathname === "/my-order" ||
                    location.pathname === "/order-details") &&
                  "actv"
                }
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/das_icon3.png"}
                  alt=""
                />
                <span>My Order</span>
              </Link>
            </li>
            <li>
              <Link
                to="/shopping-cart"
                className={location.pathname === "/shopping-cart" && "actve"}
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/das_icon3.png"}
                  alt=""
                />
                <span>My Cart</span>
              </Link>
            </li>
            <li>
              <Link
                to="/gift-card"
                className={
                  (location.pathname === "/gift-card" ||
                    location.pathname === "/gift-details" ||
                    location.pathname === "/purchase-gift-card") &&
                  "actv"
                }
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/gft-crd.png"}
                  alt=""
                />
                <span>Gift Card</span>
              </Link>
            </li>
            <li>
              <a onClick={logout}>
                <img
                  src={process.env.PUBLIC_URL + "/images/das_icon4.png"}
                  alt=""
                />
                <span>Log Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
