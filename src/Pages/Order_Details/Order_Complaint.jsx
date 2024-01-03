import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { ApiPost, getFileImage } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";
import Sidemenu from "../../Componets/Sidemenu/Sidemenu";
import { Helmet } from "react-helmet";

const Order_Complaint = () => {
  const userData = JSON.parse(localStorage.getItem("userinfo"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currency = useSelector((state) => state?.currency?.currency);
  const location = useLocation();
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [download, setDownload] = useState("");
  const [errors, setError] = useState({});
  const handlerChange = (e) => {
    const { name, value } = e.target;
    setData2({
      ...data2,
      [name]: value,
    });
  };
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!data2?.message) {
      formIsValid = false;
      errors["message"] = "Please enter your message";
    }
    setError(errors);

    return formIsValid;
  };
  const saveComplaints = () => {
    if (validateForm()) {
      const body = {
        params: {
          order_master_id: location?.state?.product_data?.order_master_id,
          order_details_id: +location?.state?.product_data?.id,
          product_id: +location?.state?.product_data?.product_id,
          user_id: userData?.id,
          comments: data2?.message,
        },
      };
      ApiPost("save-complaints", body)
        .then((res) => {
          setLoading(false);
          if (res?.data?.result) {
            swal({
              title: "Success",
              text: res?.data?.result?.success,
              icon: "success",
            });
            setData2({
              message: "",
            });
            navigate("/order-details", {
              state: {
                order_master_id: location?.state?.product_data?.order_master_id,
              },
            });
          }
        })
        .catch(async (err) => {
          setLoading(false);
        });
    }
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
          setDownload(res?.data?.result?.is_allowed_download);
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
        <title>Order Complaint - Artdevotee</title>
        <meta
            name="description"
            content="Order Complaint - Artdevotee"
        />
        <meta property="og:title" content="Order Complaint - Artdevotee" />
        <meta property="og:description" content="Order Complaint - Artdevotee" />
        <meta property="og:image" content="https://artdevotee.com/preview/dev/images/how-bnr.png" />
        <link rel="canonical" href="https://artdevotee.com/order-complaint" />
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
                      <li>
                        {data?.is_paid === "Y" && (
                          <>
                            {" "}
                            <span>Status </span>:{" "}
                            <span className="ren_colors">Completed</span>
                          </>
                        )}
                        {data?.is_paid === "N" && (
                          <>
                            <span>Status </span>:{" "}
                            <span className="ble_colors">Pending</span>
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
                    </ul>
                  </div>
                  <div className="dash_headings_div2">
                    {" "}
                    <h1>Product Information</h1>
                  </div>
                  <div className="order_boxs_sha justify-content-start">
                    <div className="produ_infos inf-top">
                      <ul>
                        <span>
                          <img
                            src={
                              location?.state?.product_data?.get_product_details
                                ?.get_product_display_images?.length !== 0
                                ? getFileImage(
                                    location?.state?.product_data?.get_product_details?.get_product_display_images
                                      ?.filter(
                                        (e) => e?.is_default_display === "1"
                                      )
                                      ?.shift()?.thumbnail_image
                                  )
                                : process.env.PUBLIC_URL + "/images/default.png"
                            }
                            alt=""
                          />
                        </span>
                      </ul>
                    </div>
                    <ul className="ml-2">
                      <li>
                        <span>Product Name. </span>:{" "}
                        {
                          location?.state?.product_data?.get_product_details
                            ?.title
                        }
                      </li>
                      <li>
                        <span>Product code</span>:{" "}
                        {
                          location?.state?.product_data?.get_product_details
                            ?.product_id
                        }
                      </li>
                      <li className="d-flex">
                        <span>Price </span> :&nbsp;
                        <div className="dash_pps">
                          {location?.state?.product_data?.unit_price_original &&
                            location?.state?.product_data
                              ?.unit_price_original !==
                              location?.state?.product_data?.total_price && (
                              <p>
                                {currency &&
                                  currency +
                                    JSON.parse(
                                      location?.state?.product_data
                                        ?.unit_price_original
                                    )?.toFixed(2)}
                              </p>
                            )}{" "}
                          <h5>
                            {currency &&
                              currency +
                                (location?.state?.product_data?.total_price &&
                                  JSON.parse(
                                    location?.state?.product_data?.total_price
                                  )?.toFixed(2))}
                          </h5>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="dash_headings_div2">
                    {" "}
                    <h1>Complaint</h1>
                  </div>
                  {!location?.state?.complaint?.comments ? <div className="order_boxs_sha flex-column align-items-end">
                    <div
                      className="cont-inpt input_froms"
                      style={{ width: "100%" }}
                    >
                      <label for="exampleFormControlInput1">Message</label>

                      <textarea
                        maxLength={500}
                        className="form-control "
                        id="exampleFormControlTextarea1"
                        placeholder="Enter your message here"
                        value={data2?.message}
                        name="message"
                        onChange={handlerChange}
                      ></textarea>
                      {data2?.message?.length <= 500 && (
                        <small>
                          {500 - data2?.message?.length} characters remaining
                        </small>
                      )}
                      {data2?.message?.length > 500 && (
                        <small>You can't use more than 500 characters.</small>
                      )}
                      {data2?.message?.length === 0 && (
                        <span className="errorInput h_10">
                          {data2?.message?.length > 0 ? "" : errors["message"]}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="mt-1 conc-btn d-flex justify-content-end"
                      onClick={saveComplaints}
                    >
                      Submit
                      <img
                        src={process.env.PUBLIC_URL + "/images/send-fly.png"}
                        alt=""
                      />
                    </button>
                  </div> :
                  <div className="order_boxs_sha flex-column align-items-end">
                    <div
                      className="cont-inpt input_froms"
                      style={{ width: "100%" }}
                    >
                    {location?.state?.complaint?.comments}
                    </div>
                    <button
                      type="button"
                      className="mt-1 conc-btn d-flex justify-content-end"
                      onClick={() => navigate(-1)}
                    >
                      Back
                      <img
                        src={process.env.PUBLIC_URL + "/images/send-fly.png"}
                        alt=""
                      />
                    </button>
                  </div>
                  }
                  
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

export default Order_Complaint;
