import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiPost, getFileImage } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";
import Sidemenu from "../../Componets/Sidemenu/Sidemenu";
import moment from "moment";
import { Helmet } from "react-helmet";

const Order_Details = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currency = useSelector((state) => state?.currency?.currency);
  const location = useLocation();
  const [data, setData] = useState({});
  const [download, setDownload] = useState("");
  const [exDate, setExDate] = useState();
  const userData = JSON.parse(localStorage.getItem("userinfo"));

  const downloadImage = (y, e) => {
    const body = {
      params: {
        product_id: y?.get_product_details?.id,
        product_option_id: e,
        order_master_id: y?.order_master_id,
      },
    };
    ApiPost("update-last-download", body).then((res) => {
      if (res?.data?.result?.success) {
        const body = {
          params: {
            order_master_id: location?.state?.order_master_id,
          },
        };
        ApiPost("get-order-details", body)
          .then((res) => {
            if (res?.data?.orderDetails) {
              setData(res?.data?.orderDetails[0]);
            }
            if (res?.data?.validity) {
              setExDate(res.data.validity);
            }
            setLoading(false);
          })
          .catch(async (err) => {
            setLoading(false);
          });
      }
    });
  };
  useEffect(() => {
    // document.title = "Artdevotee | Order Details";
    window.scrollTo(0, 0);
    setLoading(true);
    const body = {
      params: {
        order_master_id: location?.state?.order_master_id,
      },
    };
    ApiPost("get-order-details", body)
      .then((res) => {
        if (res?.data?.orderDetails) {
          setData(res?.data?.orderDetails[0]);
        }
        if (res?.data?.validity) {
          setExDate(res.data.validity);
        }
        setLoading(false);
      })
      .catch(async (err) => {
        setLoading(false);
      });
    const body2 = {
      params: {
        order_master_id: location?.state?.order_master_id,
      },
    };
    ApiPost("is-download-allowed", body2)
      .then((res) => {
        if (res?.data?.result) {
          setDownload(res?.data?.result?.is_allowed_download.toString());
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
        <title>Order Details - Artdevotee</title>
        <meta
            name="description"
            content="Order Details - Artdevotee"
        />
        <meta property="og:title" content="Order Details - Artdevotee" />
        <meta property="og:description" content="Order Details - Artdevotee" />
        <meta property="og:image" content="https://artdevotee.com/preview/dev/images/how-bnr.png" />
        <link rel="canonical" href="https://artdevotee.com/order-details" />
      </Helmet>
      {loading && <Loader />}
      <div className="dashbord_sec">
        <div className="container">
          <div className="dashbord_inr">
            <Sidemenu />
            <div className="dashbord_right">
              <div className="dashbord_right_ir">
                <div className="dash_headings_div">
                  <h1>Order Details</h1>
                </div>
                <div className="dashbord_frm">
                  <div className="order_boxs_sha">
                    <ul>
                      <li>
                        <span>Order No. </span>: #{data?.order_number}
                      </li>
                      <li>
                        <span>No. of Item </span>: {data?.total_item}
                      </li>
                      <li>
                        <span>Order date </span>: {data?.order_date}
                      </li>
                      {/* <li>
                                 <span>Payment method  </span>: Online
                             </li> */}
                      {data?.status !== "I" && (
                        <li>
                          <span>Transaction Id </span>:{" "}
                          {data?.payments_details?.tran_id}
                        </li>
                      )}
                      <li>
                        {data?.is_paid === "Y" && data?.status !== "I" && (
                          <>
                            {" "}
                            <span>Status </span>:{" "}
                            <span className="ren_colors">Completed</span>
                          </>
                        )}
                        {data?.is_paid === "N" && data?.status !== "I" && (
                          <>
                            <span>Status </span>:{" "}
                            <span className="red_colors">Failed</span>
                          </>
                        )}
                        {data?.status === "I" && (
                          <>
                            <span>Status </span>:{" "}
                            <span className="yel_colors">Initiated</span>
                          </>
                        )}
                      </li>
                    </ul>
                    <ul className="new_sp">
                      <li>
                        <span>Order subtotal </span>:{" "}
                        {currency &&
                          currency +
                            (data?.total_before_discount &&
                              JSON.parse(data?.total_before_discount)?.toFixed(
                                2
                              ))}
                      </li>
                      <li>
                        <span>Discount price </span>:{" "}
                        {currency &&
                          currency +
                            (
                              data?.total_before_discount - data?.total_amount
                            )?.toFixed(2)}
                      </li>
                      {(data?.get_coupon || data?.get_gift_card) && (
                        <li>
                          <span>
                            {data?.get_coupon
                              ? "Coupon code applied"
                              : data?.get_gift_card
                              ? "Gift card applied"
                              : ""}
                          </span>
                          :{" "}
                          {data?.get_coupon
                            ? data?.get_coupon?.coupon_code
                            : data?.get_gift_card
                            ? data?.get_gift_card?.giftcard_name
                            : ""}
                        </li>
                      )}
                      <li>
                        <span>Total payable amount </span>:{" "}
                        {currency &&
                          currency +
                            (data?.total_amount &&
                              JSON.parse(data?.total_amount)?.toFixed(2))}
                      </li>
                      <li>
                        (INR price inclusive of 18% GST)
                      </li>
                      {userData?.email === data?.gift_email && (
                        <>
                          <li>
                            <span>Gifted By </span>:{" "}
                            {data?.billing_fname &&
                              data?.billing_lname &&
                              data?.billing_fname + " " + data?.billing_lname}
                          </li>
                          <li>
                            <span>Download valid till </span>:{" "}
                            {exDate && moment(exDate).format("DD-MM-YYYY")}
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  {location?.state?.type !== "R" && (
                    <>
                      <h3 className="das_headingds">Billing Info</h3>
                      <div className="order_boxs_sha">
                        <ul className="w-100">
                          <li>
                            <span>Name </span>: {data?.billing_fname}{" "}
                            {data?.billing_lname}
                          </li>
                          <li>
                            <span>Email address </span>: {data?.billing_email}
                          </li>
                          <li>
                            <span>Phone No. </span>: {data?.billing_phone}
                          </li>
                          <li>
                            <span>Address </span>:{" "}
                            {data?.billing_street_address +
                              ", " +
                              data?.billing_city +
                              ", " +
                              data?.billing_address_line2 +
                              ", " +
                              data?.get_billing_country_name?.name +
                              "- " +
                              data?.billing_postcode}
                          </li>
                        </ul>
                      </div>
                    </>
                  )}

                  <div className="dash_headings_div2">
                    {" "}
                    <h1>Product Information</h1>
                  </div>
                  <div className="profile-form meet-page-prof com_pad_tablle payment_areaa">
                    <div className="new-table-mr">
                      <div className="table">
                        <div className="one_row1 hidden-sm-down only_shawo">
                          <div className="cell1 tab_head_sheet">Product Info</div>
                          <div className="cell1 tab_head_sheet">Last Download</div>
                          <div className="cell1 tab_head_sheet">&nbsp;</div>
                          <div className="cell1 tab_head_sheet">&nbsp;</div>
                        </div>
                        {data?.get_order_details?.map((y) => {
                          return (
                            <>
                              <div className="one_row1 small_screen31">
                                <div className="cell1 tab_head_sheet_1 half-boxes">
                                  <span className="W55_1 new_adb">
                                    Product Info
                                  </span>
                                  <div className="produ_infos inf-top">
                                    <span>
                                      <img
                                        src={
                                          y?.get_product_details
                                            ?.get_product_image?.length !== 0
                                            ? getFileImage(
                                                y?.get_product_details?.get_product_image
                                                  ?.filter(
                                                    (e) =>
                                                      e?.make_default === "1"
                                                  )
                                                  ?.shift()?.image
                                              )
                                            : process.env.PUBLIC_URL +
                                              "/images/default.png"
                                        }
                                        alt=""
                                      />
                                    </span>
                                    <div className="order_details_dash">
                                      <h3>
                                        {y?.get_product_details?.title}
                                        {/* {y?.get_product_details?.get_product_display_images?.filter(e => e?.is_default_display === "1")?.shift()?.get_size?.size} */}
                                      </h3>
                                      <p>Product Code: {y?.product_id}</p>
                                      <div className="dash_pps">
                                        {y?.unit_price_original &&
                                          y?.unit_price_original !==
                                            y?.total_price && (
                                            <p>
                                              {currency &&
                                                currency +
                                                  JSON.parse(
                                                    y?.unit_price_original
                                                  )?.toFixed(2)}
                                            </p>
                                          )}{" "}
                                        <h5>
                                          {currency &&
                                            currency +
                                              (y?.total_price &&
                                                JSON.parse(
                                                  y?.total_price
                                                )?.toFixed(2))}
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="cell1 tab_head_sheet_1">
                                  <span className="W55_1 w55_06">
                                    Last Download
                                  </span>
                                  <p className="add_ttrr">
                                    {data?.download_details?.length !== 0
                                      ? data?.download_details?.filter(
                                          (e) => e?.product_id === y?.product_id
                                        )[0]?.last_download_date
                                      : "-"}
                                  </p>
                                </div>
                                {data?.is_paid === "Y" &&
                                  (userData?.email === data?.gift_email ||
                                    !data?.gift_email) && (
                                    <>
                                      <div className="cell1 tab_head_sheet_1 ">
                                        <span className="W55_1">Action</span>
                                        {download === "Y" && (
                                          <div className="">
                                            {y?.get_product_details
                                              ?.get_product_image?.length !==
                                              0 &&
                                              y?.get_product_details?.get_product_image?.map(
                                                (e) => {
                                                  return (
                                                    <div className="add_ttrr actions-main text-center">
                                                      <a
                                                        href={
                                                          "https://artdevotee.com/preview/" +
                                                          e?.image
                                                        }
                                                        download={Math?.floor(
                                                          100000000 +
                                                            Math.random() *
                                                              900000000
                                                        )}
                                                        target="_blank"
                                                        onClick={() => {
                                                          downloadImage(
                                                            y,
                                                            e?.id
                                                          );
                                                        }}
                                                      >
                                                        <img
                                                          src={
                                                            process.env
                                                              .PUBLIC_URL +
                                                            "/images/dnwld.png"
                                                          }
                                                          alt=""
                                                        />
                                                        Download Now (
                                                        {e?.get_size?.size})
                                                      </a>
                                                    </div>
                                                  );
                                                }
                                              )}
                                          </div>
                                        )}
                                      </div>
                                      <div className="cell1 tab_head_sheet_1">
                                        <div className="dash_pps add_ttrr pointer">
                                          {y?.is_under_complaint !== "Y" && (
                                            <h5
                                              onClick={() =>
                                                navigate("/order-complaint", {
                                                  state: {
                                                    order_master_id:
                                                      location?.state
                                                        ?.order_master_id,
                                                    type: "R",
                                                    product_data: y,
                                                  },
                                                })
                                              }
                                            >
                                              Complaint{" "}
                                            </h5>
                                          )}
                                          {y?.get_complaint?.status === "A" && (
                                            <h5  onClick={() =>
                                              navigate("/order-complaint", {
                                                state: {
                                                  order_master_id:
                                                    location?.state
                                                      ?.order_master_id,
                                                  type: "R",
                                                  product_data: y,
                                                  complaint:y?.get_complaint
                                                },
                                              })
                                            }>
                                              Open
                                            </h5>
                                          )}
                                          {y?.get_complaint?.status === "I" && (
                                            <h5 className="text-danger" onClick={() =>
                                              navigate("/order-complaint", {
                                                state: {
                                                  order_master_id:
                                                    location?.state
                                                      ?.order_master_id,
                                                  type: "R",
                                                  product_data: y,
                                                  complaint:y?.get_complaint
                                                },
                                              })
                                            }>
                                              Close
                                            </h5>
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  )}
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order_Details;
