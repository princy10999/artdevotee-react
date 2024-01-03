import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ApiPost} from "../../Api/Api";
import { getPosts } from "../../Redux/Apidemo/apiDemoSlice";
import { FiChevronDown } from "react-icons/fi";
import logo_image  from "../../Assest/Images/bnr-logo.png"
import { getMaintenance } from "../../Redux/Apidemo/maintananceDemoSlice";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getUserData = JSON.parse(localStorage.getItem("userinfo"));
  const [userData, setUserData] = useState({});
  const [count, setCount] = useState({});
  const count2 = useSelector((state) => state.apiDemo.lists?.data);
  const maintenance = useSelector((state) => state.maintananceDemo.maintenance?.data?.maintenance_details);
  const currency = useSelector((state) => state?.currency?.currency);
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState("");
  const logout = () => {
    setCount({});
    localStorage.removeItem("userinfo");
    localStorage.removeItem("access_tocken");
    navigate("/login");
  };
  useEffect(() => {
    {
      setCategoryId("");
      ApiPost("category-list", {}).then((res) => {
        if (res?.data?.result) {
          setCategory(res?.data?.result?.category_list);
        }
      });
    }
  }, []);
  useEffect(() => {
    {
      getUserData && dispatch(getPosts());
    }
  }, [location?.pathname]);
  useEffect(() => {
    dispatch(getMaintenance());
  }, []);
  useEffect(() => {
    setSearch(location?.state?.search);
  }, [location]);
  useEffect(() => {
    if (getUserData) {
      setCount(count2)
      setUserData(getUserData)
    } else {
      setCount({})
      setUserData({})
    }
  }, [count2])
  useEffect(() => {
    if (location?.pathname === "/login") {
      setCount({})
    }
  }, [getUserData])

  const dummy = category.filter((e) => {
    return e?.id === location?.state?.categoryId && e?.name;
  });
  // console.log("count2",count,maintenance);
const serachPage = (e) => {
  e.preventDefault()
  navigate("/search-product", {
    state: {
      categoryId: categoryId?.id,
      search: search,
    },
  })
}
  return (
    <header className={`${getUserData && "after_login"} header`}>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo_image} alt=""/>
          </Link>
          <div className="navbar-right">
            <div className="nav-r8-tp">
              <form action="" role="form" className="nav-frm" onSubmit={serachPage}>
                <div className="dropdown show">
                  <a
                    className="btn dropdown-toggle"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {categoryId?.name
                      ? categoryId?.name
                      : dummy?.length !== 0
                        ? dummy[0]?.name
                        : "Catagory"}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {category?.map((e) => {
                      return (
                        <>
                          <a
                            className="dropdown-item category_option"
                            onClick={() => setCategoryId(e)}
                          >
                            {e?.name}
                          </a>
                          {e?.child_category !== 0 &&
                            e?.child_category?.map((e) => (
                              <a
                                className="dropdown-item sub_category_option"
                                onClick={() => setCategoryId(e)}
                              >
                                &nbsp;&nbsp;&nbsp;&nbsp;{e?.name}
                              </a>
                            ))}
                        </>
                      );
                    })}
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control nav-src"
                  id="inlineFormInputName2"
                  placeholder="Search for illustrations, textures, patterns and more"
                  value={search}
                  onChange={(e) => setSearch(e?.target?.value)}
                />
                <button
                  type="submit"
                  className="gls-btn">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
              <div className="cart-num">
                <Link to="/my-wishlist" className="wish">
                  <img
                    src={process.env.PUBLIC_URL + "/images/heart.png"}
                    alt=""
                  />
                  <h5>Wishlist</h5>
                  <span>{count?.product_count ? count?.product_count : 0}</span>
                </Link>
                <Link to="/shopping-cart" className="cart">
                  <div className="cart-img">
                    <img src={process.env.PUBLIC_URL + "/images/de1.png"} alt=""/>
                    <span>{count?.cart_count ? count?.cart_count : 0}</span>
                  </div>
                  <h5>
                    <strong>Add to cart :</strong>{" "}
                    {currency &&
                      currency + (count?.cart_price ? count?.cart_price : 0)}
                  </h5>
                </Link>
                <button className="navbar-toggler" type="button" id="openMenu">
                  <span className="navbar-toggler-icon">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
            </div>
            <div className="nav-r8-btm">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/search-product">
                      Our Product
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/about-us">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/contact-us">
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/how-it-works">
                      How It Works
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/faq">
                      FAQ
                    </Link>
                  </li>
                </ul>

                {!getUserData && (
                  <ul className="log-btns">
                    <li className="nav-item active">
                      <Link to="/login" className="log1">
                        <img
                          src={process.env.PUBLIC_URL + "/images/user.png"}
                          alt=""
                        />
                        Login
                      </Link>
                    </li>
                    <li className="nav-item active">
                      <Link to="/sign-up" className="sign2">
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              {getUserData && (
                <div className="af_log_dv">
                  <a id="profidrop">
                    <img
                      src={
                        getUserData?.profile_image
                          ? "https://artdevotee.com/preview/storage/app/public/profile_picture/" +
                          getUserData?.profile_image
                          : process.env.PUBLIC_URL + "/images/Rectangle688.png"
                      }
                      alt=""
                    />
                    <div className="header_log">
                      <h6>
                        {" "}
                        Hi, {getUserData?.first_name}{" "}
                        <span>
                          <FiChevronDown />
                        </span>
                      </h6>
                    </div>
                  </a>
                  <div
                    className="profidropdid"
                    id="profidropdid"
                    style={{ display: "none" }}
                  >
                    <ul>
                      <li>
                        <Link
                          to="/dashboard"
                          className={location.pathname === "/dashboard" && "actve"}
                        >
                          <span>Dashboard </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/edit-profile"
                          className={
                            location.pathname === "/edit-profile" && "actve"
                          }
                        >
                          <span>Edit Profile</span>
                        </Link>
                      </li>
                      {userData?.signup_by !== "G" && (
                        <li>
                          <Link
                            to="/change-password"
                            className={
                              location.pathname === "/change-password" &&
                              "actve"
                            }
                          >
                            <span>Change Password</span>
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          to="/my-wishlist"
                          className={
                            location.pathname === "/my-wishlist" && "actve"
                          }
                        >
                          <span>My Wishlist</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/my-order"
                          className={location.pathname === "/my-order" && "actve"}
                        >
                          <span>My Order</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/shopping-cart"
                          className={
                            location.pathname === "/shopping-cart" && "actve"
                          }
                        >
                          <span>My Cart</span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/gift-card"
                          className={location.pathname === "/gift-card" && "actve"}
                        >
                          <span>Gift Card</span>
                        </Link>
                      </li>
                      <li>
                        <a onClick={logout}>
                          <span>Log Out</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
