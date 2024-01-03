import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { ApiGet, ApiPost, getFileImage } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";
import No_Data_Found from "../../Componets/No_data_found/No_Data_Found";
import { getPosts } from "../../Redux/Apidemo/apiDemoSlice";
import { Helmet } from "react-helmet";

const Shopping_Cart = () => {
  const currency = useSelector((state) => state?.currency?.currency);
  const calling_code = useSelector((state) => state?.currency?.calling_code);
  const userData = JSON.parse(localStorage.getItem("userinfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [coupon2, setCoupon2] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [couponData, setCouponData] = useState({});
  const [deleteProduct, setDeleteProduct] = useState({});
  const [show, setShow] = useState(false);
  const [deleteProduct2, setDeleteProduct2] = useState({});
  const [show2, setShow2] = useState(false);
  const openModal = (e) => {
    setShow(true);
    setDeleteProduct(e);
  };
  const closeModal = () => {
    setShow(false);
    setDeleteProduct({});
  };
  const openModal2 = (e) => {
    setShow2(true);
    setDeleteProduct2(e);
    setDeleteProduct(e);
  };
  const closeModal2 = () => {
    setShow2(false);
    setDeleteProduct2({});
  };
  const removeCart = (e) => {
    if (userData) {
      const body = {
        params: {
          cart_details_id: deleteProduct?.id,
        },
      };
      ApiPost("remove-from-cart", body).then((res) => {
        if (res?.data?.result) {
          if (e !== "2") {
            swal({
              title: "Success",
              text: res?.data?.result?.status?.meaning,
              icon: "success",
            });
          }
          dispatch(getPosts());
          closeModal();
          getData();
        } else if (res?.data?.error) {
          if (e !== "2") {
            swal({
              title: "Warning",
              text: res?.data?.error?.meaning,
              icon: "warning",
            });
          }
        }
      });
    } else {
      navigate("/login");
    }
  };
  const getData = () => {
    setLoading(true);
    ApiGet("get-cart-list", {})
      .then((res) => {
        if (res?.data?.cartList) {
          setData(res?.data?.cartList[0]);
        }
        setLoading(false);
      })
      .catch(async (err) => {
        setLoading(false);
      });
  };
  const cancleCoupon = () => {
    setLoading(true);
    const body = {
      params: {
        coupon_code: "",
      },
    };
    ApiPost("apply-coupon-gcard", body)
      .then((res) => {
        if (res?.data) {
          setCouponData("");
          setLoading(false);
          setCoupon("");
          setCoupon2("");
        }
      })
      .catch(async (err) => {
        setLoading(false);
      });
  };
  const applyCoupon = (e) => {
    if (e === "G" ? coupon : coupon2) {
      setLoading(true);
      const body = {
        params: {
          coupon_code: e === "G" ? coupon : coupon2,
          currency_code: calling_code,
          card_type: e,
        },
      };
      ApiPost("apply-coupon-gcard", body)
        .then((res) => {
          if (res?.data) {
            setCouponData(res?.data);
            setLoading(false);
            e === "G" ? setCoupon2("") : setCoupon("");
          }
        })
        .catch(async (err) => {
          setLoading(false);
        });
    } else if (e === "G") {
      swal({
        title: "Warning",
        text: "Please insert gift card code",
        icon: "warning",
      });
    } else {
      swal({
        title: "Warning",
        text: "Please insert coupon code",
        icon: "warning",
      });
    }
  };
  const addWishlist = () => {
    if (wishlist?.includes(deleteProduct2?.product_id)) {
      swal({
        title: "Warning",
        text: "This product is already saved in your wishlist.",
        icon: "warning",
      });
      closeModal2();
      removeCart("2");
    } else if (userData) {
      removeCart("2");
      setLoading(true);
      const body = {
        params: {
          product_id: deleteProduct2?.product_id,
        },
      };
      ApiPost("wishlists", body)
        .then((res) => {
          setLoading(false);
          if (res?.data?.result) {
            closeModal2();
            setWishlist(res?.data?.result?.wishlist);
            swal({
              title: "Success",
              //   text: res?.data?.result?.status?.meaning,
              text: "This product is successfully saved in your wishlist for later.",
              icon: "success",
            });
            dispatch(getPosts());
          }
        })
        .catch(async (err) => {
          setLoading(false);
        });
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    // document.title = "Artdevotee | Shopping Cart";
    window.scrollTo(0, 0);
    getData();
  }, []);
  useEffect(() => {
    const body = {
      params: {
        page_type: userData && "L",
        currency_code: calling_code,
      },
    };
    ApiPost("get-search-product-result", body)
      .then((res) => {
        if (res?.data?.details) {
          setWishlist(res?.data?.wishlist);
        }
      })
      .catch(async (err) => {});
  }, []);
  const openDetailsPage = (e) => {
    navigate(`/product-detail/${e?.get_product_details?.slug}`, {
      state: { image: e?.get_product_details?.get_product_display_images },
    });
  };
  var totalPrice = couponData?.total_price_after_deduction
    ? couponData?.total_price_after_deduction
    : couponData?.total_price_after_deduction === 0
    ? 0
    : data?.total_after_discount;
  return (
    <div>
      <Helmet>
        <title>Shopping Cart - Artdevotee</title>
        <meta
            name="description"
            content="Shopping Cart - Artdevotee"
        />
        <meta property="og:title" content="Shopping Cart - Artdevotee" />
        <meta property="og:description" content="Shopping Cart - Artdevotee" />
        <meta property="og:image" content="https://artdevotee.com/preview/dev/images/how-bnr.png" />
        <link rel="canonical" href="https://artdevotee.com/shopping-cart" />
      </Helmet>
      {loading && <Loader />}
      <div className="shopping-sec">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb shop-crumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Shopping Cart
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className={data ? "col-lg-8" : "col-sm-12"}>
              <div className="cart-list-box">
                {data && (
                  <>
                    <h2>{data?.total_item} Items In Cart</h2>
                    <ul>
                      {data?.get_cart_details?.map((e) => {
                        return (
                          <li>
                            <div className="produ_infos">
                              <span className="squer_boxx">
                                {/* <img
                                  className="pointer"
                                  src={
                                    e?.get_product_details
                                      ?.get_product_display_images.length !== 0
                                      ? getFileImage(
                                          e?.get_product_details?.get_product_display_images
                                            ?.filter(
                                              (e) =>
                                                e?.is_default_display === "1"
                                            )
                                            ?.shift()?.thumbnail_image
                                        )
                                      : process.env.PUBLIC_URL +
                                        "/images/order1.png"
                                  }
                                  onClick={() => openDetailsPage(e)}
                                /> */}
                                   <LazyLoadImage 
                       className="pointer"
                       src={
                         e?.get_product_details
                           ?.get_product_display_images.length !== 0
                           ? getFileImage(
                               e?.get_product_details?.get_product_display_images
                                 ?.filter(
                                   (e) =>
                                     e?.is_default_display === "1"
                                 )
                                 ?.shift()?.thumbnail_image
                             )
                           : process.env.PUBLIC_URL +
                             "/images/order1.png"
                       }
                       onClick={() => openDetailsPage(e)}
                          loading="lazy"
        alt="Image Alt"
      />
                              </span>
                              <div className="order_details_dash">
                                <h3
                                  className="pointer"
                                  onClick={() => openDetailsPage(e)}
                                >
                                  {e?.get_product_details?.title}
                                  {/* {e?.get_product_details?.get_product_display_images?.filter(e => e?.is_default_display === "1")?.shift()?.get_size?.size} */}
                                </h3>
                                <p>
                                  Order Id :{" "}
                                  {e?.get_product_details?.product_id}
                                </p>
                                {/* <p>Size: {e?.get_product_details?.get_product_display_images?.filter(e => e?.is_default_display === "1")?.shift()?.get_size?.size}</p> */}
                                <div className="dash_pps">
                                  {currency &&
                                    currency +
                                      e?.get_product_details?.get_product_price?.filter(
                                        (e) =>
                                          e?.get_currency?.symbol === currency
                                      )[0]?.price !==
                                      currency &&
                                    currency +
                                      e?.get_product_details?.get_product_price?.filter(
                                        (e) =>
                                          e?.get_currency?.symbol === currency
                                      )[0]?.after_discount_price &&
                                    e?.get_product_details?.get_product_price?.filter(
                                      (e) =>
                                        e?.get_currency?.symbol === currency
                                    )[0]?.after_discount_price !==
                                      e?.get_product_details?.get_product_price?.filter(
                                        (e) =>
                                          e?.get_currency?.symbol === currency
                                      )[0]?.price && (
                                      <p>
                                        {currency &&
                                          currency +
                                            e?.get_product_details?.get_product_price?.filter(
                                              (e) =>
                                                e?.get_currency?.symbol ===
                                                currency
                                            )[0]?.price}
                                      </p>
                                    )}
                                  <h5>
                                    {currency &&
                                      currency +
                                        e?.get_product_details?.get_product_price?.filter(
                                          (e) =>
                                            e?.get_currency?.symbol === currency
                                        )[0]?.after_discount_price}
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <div className="save_latter">
                              <a onClick={() => openModal2(e)}>
                                Save for later
                              </a>
                            </div>
                            <a
                              className="css-tooltip-top color-blue meet-rvw uu0 prod-del"
                              onClick={() => openModal(e)}
                            >
                              {" "}
                              <span>Cancel</span>
                              <img
                                src={
                                  process.env.PUBLIC_URL + "/images/rejectt.png"
                                }
                                className="blue-show"
                                alt=""
                              />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
                {!loading && !data && <No_Data_Found type="cart" />}
              </div>
            </div>
            {data && (
              <div className="col-lg-4">
                <div className="payment-box">
                  <h2>Payment Deatils</h2>
                  <div className="pay-calc">
                    <h5>
                      Subtotal{" "}
                      <span>
                        {currency && currency + data?.total_before_discount}
                      </span>
                    </h5>
                    <div className="cupon">
                      <h3>Coupon code</h3>
                      <div className="input-group cupon-inpt">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Here"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          value={coupon2}
                          onChange={(e) => setCoupon2(e?.target?.value)}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn"
                            type="button"
                            onClick={() => applyCoupon("C")}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="cupon">
                      <h3>Gift card code</h3>
                      <div className="input-group cupon-inpt">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Here"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          value={coupon}
                          onChange={(e) => setCoupon(e?.target?.value)}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn"
                            type="button"
                            onClick={() => applyCoupon("G")}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                    {(couponData?.total_price_after_deduction ||
                      couponData?.total_price_after_deduction === 0) && (
                      <h5 className="coupon_msg">
                        {couponData?.message}
                        <img
                          src={process.env.PUBLIC_URL + "/images/rejectt.png"}
                          className="blue-show"
                          alt=""
                          onClick={cancleCoupon}
                        />
                      </h5>
                    )}
                    {couponData?.error && (
                      <h5 className="coupon_msg">
                        {couponData?.error}
                        <img
                          src={process.env.PUBLIC_URL + "/images/rejectt.png"}
                          className="blue-show pointer"
                          alt=""
                          onClick={cancleCoupon}
                        />
                      </h5>
                    )}
                    <h5>
                      Discount{" "}
                      <span>
                        {currency &&
                          currency +
                            (data?.total_before_discount - totalPrice)?.toFixed(
                              2
                            )}
                      </span>
                    </h5>
                    <h4>
                      Total Payable Amount :{" "}
                      <span>
                        {currency &&
                          currency +
                            (totalPrice && JSON.parse(totalPrice)?.toFixed(2))}
                      </span>
                    </h4>
                  </div>

                  <ul className="pay-btns">
                    <li>
                      <a
                        className="chck-btn"
                        onClick={() => {
                          navigate("/checkout", {
                            state: {
                              data: data,
                              coupon: couponData,
                            },
                          });
                        }}
                      >
                        Continue Checkout
                      </a>
                    </li>
                    <li>
                      <Link to="/search-product" className="shop-btn">
                        Continue Shopping
                      </Link>
                    </li>
                  </ul>
                  <div className="gurantee">
                    {/* <!--<h6>Money back gurantee</h6>
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>--> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`modal fade ${show && "show"}`}
        style={{ display: show ? "block" : "none" }}
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="log-page">
                <div className="container">
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div className="log-page-inr">
                    <div className="login-box">
                      <div className="log-box-top">
                        <div className="loger-top for-got">
                          <h2>Remove from Cart</h2>
                        </div>
                        <div className="loger-inr">
                          <form action="" role="form">
                            <h3>
                              Are you sure you want to remove this item from the
                              cart?
                            </h3>
                            <div className="d-flex">
                              <button
                                type="button"
                                className="log-sbmt bg-white text-dark border mt-4 mr-3"
                                onClick={closeModal}
                              >
                                {" "}
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="log-sbmt mt-4"
                                onClick={removeCart}
                              >
                                {" "}
                                Remove
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal fade ${show2 && "show"}`}
        style={{ display: show2 ? "block" : "none" }}
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="log-page">
                <div className="container">
                  <button type="button" className="close" onClick={closeModal2}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div className="log-page-inr">
                    <div className="login-box">
                      <div className="log-box-top">
                        <div className="loger-top for-got">
                          <h2>save for later</h2>
                        </div>
                        <div className="loger-inr">
                          <form action="" role="form">
                            <h3>
                              Are you sure you want to save this item for later?
                            </h3>
                            <div className="d-flex">
                              <button
                                type="button"
                                className="log-sbmt bg-white text-dark border mt-4 mr-3"
                                onClick={closeModal2}
                              >
                                {" "}
                                Cancle
                              </button>
                              <button
                                type="button"
                                className="log-sbmt mt-4"
                                onClick={addWishlist}
                              >
                                {" "}
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopping_Cart;
