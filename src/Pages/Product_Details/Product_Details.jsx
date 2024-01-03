import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { ApiGet, ApiPost, getFileImage } from "../../Api/Api";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getPosts } from "../../Redux/Apidemo/apiDemoSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Componets/Loader/Loader";
import swal from "sweetalert";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  MailruShareButton,
  TelegramShareButton,
} from "react-share";
import No_Data_Found from "../../Componets/No_data_found/No_Data_Found";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import { Helmet } from "react-helmet";

const Product_Details = () => {
  const currency = useSelector((state) => state?.currency?.currency);
  const calling_code = useSelector((state) => state?.currency?.calling_code);
  const userData = JSON.parse(localStorage.getItem("userinfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [globle, setGloble] = useState("");
  const [related_Post, setRelated_Post] = useState([]);
  const [imageValue, setImageValue] = useState({
    alwaysInPlace: true,
    overlayOpacity: 0.5,
    switchSides: false,
    fillAvailableSpace: true,
    Magnifier: "zoom-in",
  });

  const [wishlist, setWishlist] = useState([]);
  const [cartlist, setCartlist] = useState([]);
  const [saveMainProduct, setSaveMainProduct] = useState(
    location?.state?.image[0]?.image
      ? location?.state?.image?.filter(
          (e) => e?.is_default_display === "1"
        )?.[0]?.image
      : data?.get_product_display_images?.[0]?.image
      ? data?.get_product_display_images?.filter(
          (e) => e?.is_default_display === "1"
        )?.[0]?.image
      : location?.state?.image[0]?.image
  );

  var showImage = location?.state?.image[0]?.image
    ? location?.state?.image?.filter((e) => e?.is_default_display === "1")?.[0]
        ?.image
    : data?.get_product_display_images?.[0]?.image
    ? data?.get_product_display_images?.filter(
        (e) => e?.is_default_display === "1"
      )?.[0]?.image
    : location?.state?.image[0]?.image;
  const [cartID, setCartID] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState({});
  const [show, setShow] = useState(false);
  const [removeCartID, setRemoveCartID] = useState([]);
  const openModal = (e) => {
    setShow(true);
    setDeleteProduct(e);
  };
  const closeModal = () => {
    setShow(false);
    setDeleteProduct({});
  };

  const addWishlist = (e) => {
    //
    if (userData) {
      setLoading(true);
      const body = {
        params: {
          product_id: e,
        },
      };
      ApiPost("wishlists", body)
        .then((res) => {
          //
          setLoading(false);
          if (res?.data?.result) {
            swal({
              title: "Success",
              text: res?.data?.result?.status?.meaning,
              icon: "success",
            });
            dispatch(getPosts());
            setWishlist(res?.data?.result?.wishlist);
          }
        })
        .catch(async (err) => {
          //
          setLoading(false);
        });
    } else {
      navigate("/login");
    }
  };
  const getData = () => {
    if (userData) {
      setLoading(true);
      ApiGet("get-cart-list", {})
        .then((res) => {
          if (res?.data?.cartList) {
            setCartID(res?.data?.cartList[0]);
          }
          setLoading(false);
        })
        .catch(async (err) => {
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    setRemoveCartID(
      cartID?.get_cart_details?.filter(
        (e) => e?.get_product_details?.id === deleteProduct?.id
      )
    );
  }, [deleteProduct]);

  const removeCart = (e) => {
    if (userData) {
      const body = {
        params: {
          cart_details_id: removeCartID?.[0]?.id,
        },
      };
      ApiPost("remove-from-cart", body).then((res) => {
        if (res?.data?.result) {
          swal({
            title: "Success",
            text: res?.data?.result?.status?.meaning,
            icon: "success",
          });
          dispatch(getPosts());
          closeModal();
          getData();
          const body = {
            params: {
              page_type: userData && "L",
              currency_code: calling_code,
            },
          };
          ApiPost("get-search-product-result", body).then((res) => {
            if (res?.data?.details) {
              setCartlist(res?.data?.cartlist);
            }
          });
        } else if (res?.data?.error) {
          swal({
            title: "Warning",
            text: res?.data?.error?.meaning,
            icon: "warning",
          });
        }
      });
    } else {
      navigate("/login");
    }
  };
  const addCart = (e, b) => {
    if (userData) {
      setLoading(true);
      const body = {
        params: {
          product_id: e?.id,
          currency_code: calling_code,
        },
      };
      ApiPost("add-to-cart", body)
        .then((res) => {
          //
          setLoading(false);
          if (res?.data?.result) {
            if (b !== "buy") {
              swal({
                title: "Success",
                text: res?.data?.result?.status?.meaning,
                icon: "success",
              });
            }
            dispatch(getPosts());
            getData();
            setCartlist(res?.data?.result?.cart_list);
            if (b === "buy") {
              navigate("/shopping-cart");
            }
          } else if (b === "buy") {
            navigate("/shopping-cart");
          } else if (res?.data?.error) {
            if (res?.data?.error?.meaning === "Product is already added") {
              openModal(e);
            }
          }
        })
        .catch(async (err) => {
          //
          setLoading(false);
        });
    } else {
      navigate("/login");
    }
  };
  const owl4 = {
    loop: related_Post?.length > 4 ? true : false,
    nav: false,
    margin: 23,
    dots: true,
    responsive: {
      0: {
        items: 2,
      },
      567: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };
  const owl2 = {
    loop: false,
    margin: 23,
    dots: true,

    responsive: {
      0: {
        items: 3,
      },
      480: {
        items: 4,
      },
      767: {
        items: 3,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  };
  //

  const openDetailsPage = async (e) => {
    setLoading(true);
    setData({
      ...data,
      get_product_display_images: "",
    });
    const body = {
      params: {
        product_id: e,
      },
    };
    await ApiPost("get-product-details", body)
      .then((res) => {
        setLoading(false);
        if (res?.data) {
          setData(res?.data?.details);
          setSaveMainProduct(
            res?.data?.details?.get_product_display_images?.filter(
              (e) => e?.is_default_display === "1"
            )?.[0]?.image
          );
          setRelated_Post(res?.data?.related_products);
          setGloble(res?.data?.global_offer);
          setWishlist(res?.data?.wishlist);
        }
      })
      .catch(async (err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    // document.title = "Artdevotee | Product Details";
    window.scrollTo(0, 0);
    openDetailsPage(id);
    getData();
    const body = {
      params: {
        page_type: userData && "L",
        currency_code: calling_code,
      },
    };
    ApiPost("get-search-product-result", body).then((res) => {
      if (res?.data?.details) {
        setCartlist(res?.data?.cartlist);
      }
    });
  }, []);
  const openEnquiry = (e) => {
    navigate(`/enquiry/${e}`);
  };
  const mainImage = (e, y) => {
    setSaveMainProduct(y?.image);
  };

  return (
    <div>
      <Helmet>
        <title>{data?.title?`${data.title} - Artdevotee`:"Artdevotee"}</title>
        <meta
          name="description"
          content={data?.description}
        />
        <meta property="og:title" content={data?.title} />
        <meta
          property="og:description"
          content={data?.description}
        />
        <link rel="canonical" href={`https://artdevotee.com/product-detail/${data?.slug}`} />
      </Helmet>
      {loading && <Loader />}
      <div id="multiple"></div>
      <section className="breadcums_section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="bread_uls">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/search-product">Our Products</Link>
                </li>
                <li>Product Details</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`product-section ${related_Post?.length === 0 && "mb-4"}`}
      >
        <div className="container">
          <div className="row no-gutters">
            <div className="product_lefts">
              <div className="product_thumbnails">
                <div id="product-image">
                  <div className="wish_prod">
                    <a
                      className={` ${
                        wishlist?.includes(JSON.stringify(data?.id)) &&
                        "add_wishlist"
                      }`}
                      onClick={() => addWishlist(data?.id)}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/images/wish2.png"}
                        alt=""
                      />
                    </a>
                  </div>
                  {saveMainProduct && (
                    <SideBySideMagnifier
                      className="input-position overflow-hidden"
                      imageSrc={
                        "https://artdevotee.com/preview/" + saveMainProduct
                      }
                      cursorStyle={imageValue?.Magnifier}
                      alwaysInPlace={imageValue?.alwaysInPlace}
                      overlayOpacity={imageValue?.overlayOpacity}
                      switchSides={imageValue?.switchSides}
                      zoomPosition="right"
                      inPlaceMinBreakpoint={100}
                      fillAvailableSpace={imageValue?.fillAvailableSpace}
                    />
                  )}
                </div>
                <div id="thumbnails">
                  <ul style={{ top: "0px", left: "0px" }}>
                    {data?.get_product_display_images?.length !== 0 && (
                      <Swiper
                        spaceBetween={5}
                        slidesPerView={3}
                        loop={true}
                        navigation={{ clickable: true }}
                        modules={[Navigation]}
                        className="mySwiper"
                        breakpoints={{
                          640: {
                            slidesPerView: 3,
                            spaceBetween: 5,
                          },
                          768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                          },
                          1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                          },
                        }}
                      >
                        {data?.get_product_display_images?.map((e,i) => {
                          return (
                            <SwiperSlide>
                              <div onClick={(y) => mainImage(y, e)} key={i}>
                                <img
                                  className="cloudzoom-gallery pointer"
                                  src={
                                    e?.image
                                      ? getFileImage(e?.thumbnail_image)
                                      : process.env.PUBLIC_URL + "/images/1.png"
                                  }
                                  alt="thumbnail"
                                />
                              </div>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    )}
                  </ul>
                </div>
              </div>
              <div className="all_details_btns">
                {cartlist?.includes(JSON.stringify(data?.id)) && (
                  <a onClick={() => addCart(data)}>
                    Remove&nbsp;from&nbsp;Cart{" "}
                    <img
                      src={process.env.PUBLIC_URL + "/images/de1.png"}
                      alt=""
                    />
                  </a>
                )}
                {!cartlist?.includes(JSON.stringify(data?.id)) && (
                  <a onClick={() => addCart(data)}>
                    Add&nbsp;to&nbsp;Cart{" "}
                    <img
                      src={process.env.PUBLIC_URL + "/images/de1.png"}
                      alt=""
                    />
                  </a>
                )}
                <a className="blc_btns" onClick={() => openEnquiry(data?.slug)}>
                  Enquiry&nbsp;Now{" "}
                  <img
                    src={process.env.PUBLIC_URL + "/images/de2.png"}
                    alt=""
                  />
                </a>
                <a className="gree_btns" onClick={() => addCart(data, "buy")}>
                  Buy&nbsp;Now{" "}
                  <img
                    src={process.env.PUBLIC_URL + "/images/de3.png"}
                    alt=""
                  />
                </a>
              </div>
            </div>

            <div className="product_rights">
              <div className="product_top">
                <h1>{data?.title}</h1>
                <p>
                  Product Code: <span>{data?.product_id}</span>
                </p>
                <div className="product_price">
                  {(data?.get_product_price?.filter(
                    (e) => e?.get_currency?.symbol === currency
                  )[0]?.global_offer_applied === "Y" ||
                    data?.get_product_price?.filter(
                      (e) => e?.get_currency?.symbol === currency
                    )[0]?.discount) && (
                    <span>
                      {data?.global_offer_applied === "Y"
                        ? currency &&
                          currency +
                            data?.get_product_price?.filter(
                              (e) => e?.get_currency?.symbol === currency
                            )[0]?.price
                        : data?.get_product_price?.filter(
                            (e) => e?.get_currency?.symbol === currency
                          )[0]?.discount &&
                          currency &&
                          currency +
                            data?.get_product_price?.filter(
                              (e) => e?.get_currency?.symbol === currency
                            )[0]?.price}
                    </span>
                  )}
                  <h3>
                    {currency &&
                      currency +
                        (data?.get_product_price?.filter(
                          (e) => e?.get_currency?.symbol === currency
                        )[0]?.global_offer_applied === "Y"
                          ? data?.get_product_price?.filter(
                              (e) => e?.get_currency?.symbol === currency
                            )[0]?.after_discount_price
                          : data?.get_product_price?.filter(
                              (e) => e?.get_currency?.symbol === currency
                            )[0]?.discount
                          ? data?.get_product_price?.filter(
                              (e) => e?.get_currency?.symbol === currency
                            )[0]?.after_discount_price
                            ? data?.get_product_price?.filter(
                                (e) => e?.get_currency?.symbol === currency
                              )[0]?.after_discount_price
                            : 0
                          : data?.get_product_price?.filter(
                              (e) => e?.get_currency?.symbol === currency
                            )[0]?.price
                          ? data?.get_product_price?.filter(
                              (e) => e?.get_currency?.symbol === currency
                            )[0]?.price
                          : 0)}
                  </h3>
                  {data?.get_product_price?.filter(
                    (e) => e?.get_currency?.symbol === currency
                  )[0]?.discount && (
                    <p>
                      {" "}
                      (Get{" "}
                      {
                        data?.get_product_price?.filter(
                          (e) => e?.get_currency?.symbol === currency
                        )[0]?.discount
                      }
                      % Off){" "}
                    </p>
                  )}
                  {data?.get_product_price?.filter(
                    (e) => e?.get_currency?.symbol === currency
                  )[0]?.global_offer_applied === "Y" && (
                    <p> (Get {globle?.offer_percentage}% Off) </p>
                  )}
                </div>
                
              </div>
              <p style={{fontSize:"16px",marginTop:"5px"}}>(INR price inclusive of 18% GST)</p>
              <div className="product_mid">
                <h2 className="des_headings">Product Description:</h2>
                {/* <h5>Size: <span>{saveMainProduct?.get_size?.size} PX</span> </h5> */}
                <p>{data?.description}</p>
              </div>
              <div className="product_gifts">
                <h3>
                  You may also <span>Gift</span> this painting to your near and
                  dear one
                </h3>
                {/* <!--<h3>You may also <span>Gift</span> this painting to your near and dear one</h3>-->
                        <!-- <a >Gift Now <img src={process.env.PUBLIC_URL + "/images/gifts.png"}></a> --> */}
              </div>
              <div className="product_btms">
                <img
                  src={process.env.PUBLIC_URL + "/images/shares.png"}
                  alt=""
                />
                <p>Share this Product</p>
                <ul>
                  <FacebookShareButton
                    url={
                      "https://artdevotee.com/preview/dev" + location?.pathname
                    }
                  >
                    <li>
                      <a>
                        <img
                          src={process.env.PUBLIC_URL + "/images/fa2.png"}
                          alt=""
                          className="hvern"
                        />
                        <img
                          src={process.env.PUBLIC_URL + "/images/fa1.png"}
                          alt=""
                          className="hverb"
                        />
                      </a>
                    </li>
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={
                      "https://artdevotee.com/preview/dev" + location?.pathname
                    }
                  >
                    <li>
                      <a>
                        <img
                          src={process.env.PUBLIC_URL + "/images/fa3h.png"}
                          alt=""
                          className="hvern"
                        />
                        <img
                          src={process.env.PUBLIC_URL + "/images/fa3.png"}
                          alt=""
                          className="hverb"
                        />
                      </a>
                    </li>
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={
                      "https://artdevotee.com/preview/dev" + location?.pathname
                    }
                  >
                    <li>
                      <a>
                        <img
                          src={process.env.PUBLIC_URL + "/images/fa4.png"}
                          alt=""
                          className="hvern"
                        />
                        <img
                          src={process.env.PUBLIC_URL + "/images/fa4h.png"}
                          alt=""
                          className="hverb"
                        />
                      </a>
                    </li>
                  </LinkedinShareButton>
                  <WhatsappShareButton
                    url={
                      "https://artdevotee.com/preview/dev" + location?.pathname
                    }
                  >
                    <li>
                      <a>
                        <img
                          src={process.env.PUBLIC_URL + "/images/fa5.png"}
                          alt=""
                          className="hvern"
                        />
                        <img
                          src={process.env.PUBLIC_URL + "/images/fa5h.png"}
                          alt=""
                          className="hverb"
                        />
                      </a>
                    </li>
                  </WhatsappShareButton>
                  <MailruShareButton
                    url={
                      "https://artdevotee.com/preview/dev" + location?.pathname
                    }
                  >
                    <li>
                      <a>
                        <img
                          src={process.env.PUBLIC_URL + "/images/fa6.png"}
                          alt=""
                          className="hvern"
                        />
                        <img
                          src={process.env.PUBLIC_URL + "/images/fa6h.png"}
                          alt=""
                          className="hverb"
                        />
                      </a>
                    </li>
                  </MailruShareButton>
                  <TelegramShareButton
                    url={
                      "https://artdevotee.com/preview/dev" + location?.pathname
                    }
                  >
                    <li>
                      <a>
                        <img
                          src={process.env.PUBLIC_URL + "/images/fa7.png"}
                          alt=""
                          className="hvern"
                        />
                        <img
                          src={process.env.PUBLIC_URL + "/images/fa7h.png"}
                          alt=""
                          className="hverb"
                        />
                      </a>
                    </li>
                  </TelegramShareButton>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {related_Post?.length !== 0 && (
        <section className="recent similar_ba">
          <div className="container">
            <div className="recnt-head">
              <h2>Similar Products</h2>
              <a>
                View All
                <img
                  src={process.env.PUBLIC_URL + "/images/btn-r8-arw.png"}
                  alt=""
                />
              </a>
            </div>
            <div className="recent-inr">
              {related_Post?.length !== 0 ? (
                <OwlCarousel
                  className="owl-carousel owl-theme owl-recent"
                  {...owl4}
                >
                  {related_Post?.map((e) => {
                    return (
                      <div className="item">
                        <div className="recent-box">
                          <div className="recent-img">
                            <img
                              onClick={() => openDetailsPage(e?.slug)}
                              src={
                                e?.get_product_display_images?.length !== 0
                                  ? getFileImage(
                                      e?.get_product_display_images
                                        ?.filter(
                                          (e) => e?.is_default_display === "1"
                                        )
                                        ?.shift()?.thumbnail_image
                                    )
                                  : e?.get_product_details
                                      ?.get_product_display_images
                              }
                              className="main-im pointer"
                            />
                            <a
                              className={`heart heart-2 ${
                                wishlist?.includes(JSON.stringify(e?.id)) &&
                                "add_wishlist"
                              }`}
                              onClick={() => addWishlist(e?.id)}
                            >
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/images/heart-white.png"
                                }
                              />
                            </a>
                            <a className="new_bag_hover d-flex">
                              <img
                                src={
                                  process.env.PUBLIC_URL + "/images/bag-3.png"
                                }
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="recent-box-txt">
                            <a onClick={() => openDetailsPage(e?.slug)}>
                              {e?.title}
                            </a>
                            <h5>Product Code: {e?.product_id}</h5>
                            <p className="description">{e?.description}</p>
                            <div className="price">
                              <span className="prc-1">
                                {e?.global_offer_applied === "Y"
                                  ? currency &&
                                    currency +
                                      e?.get_product_price?.filter(
                                        (e) =>
                                          e?.get_currency?.symbol === currency
                                      )[0]?.price
                                  : e?.discount &&
                                    currency &&
                                    currency +
                                      e?.get_product_price?.filter(
                                        (e) =>
                                          e?.get_currency?.symbol === currency
                                      )[0]?.price}
                              </span>
                              <span className="prc-2">
                                {currency &&
                                  currency +
                                    (e?.global_offer_applied === "Y"
                                      ? e?.get_product_price?.filter(
                                          (e) =>
                                            e?.get_currency?.symbol === currency
                                        )[0]?.after_discount_price
                                      : e?.discount
                                      ? e?.get_product_price?.filter(
                                          (e) =>
                                            e?.get_currency?.symbol === currency
                                        )[0]?.after_discount_price
                                      : e?.get_product_price?.filter(
                                          (e) =>
                                            e?.get_currency?.symbol === currency
                                        )[0]?.price
                                      ? e?.get_product_price?.filter(
                                          (e) =>
                                            e?.get_currency?.symbol === currency
                                        )[0]?.price
                                      : 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </OwlCarousel>
              ) : (
                <No_Data_Found />
              )}
            </div>
          </div>
        </section>
      )}
      {related_Post?.length === 0 && (
        <h2 className="text-center mb-4">No similar product available</h2>
      )}
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
    </div>
  );
};

export default Product_Details;
