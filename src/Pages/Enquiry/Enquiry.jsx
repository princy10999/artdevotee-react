import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ApiPost } from "../../Api/Api";
import ReactReadMoreReadLess from "react-read-more-read-less";
import swal from "sweetalert";
import Loader from "../../Componets/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/Apidemo/apiDemoSlice";
// import { Watermark } from '@hirohe/react-watermark';
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import FormikErrorFocus from "formik-error-focus";

const Enquiry = () => {
  const userData = JSON.parse(localStorage.getItem("userinfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);
  const currency = useSelector((state) => state?.currency?.currency);
  // const [watermarkImage, setWatermarkImage] = useState()
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  // const [data, setData] = useState(userData ? userData : {});
  const [productData, setProductData] = useState([]);
  // const [errors, setError] = useState({});
  // var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // const handlerChange = (e) => {

  //     const { name, value } = e.target;
  //     if (name === "captcha") {
  //         setData({
  //             ...data,
  //             captcha: e?.target?.checked
  //         })
  //     } else {
  //         setData({
  //             ...data,
  //             [name]: value
  //         })
  //     }
  // }
  // const validateForm = () => {

  //     let errors = {};
  //     let formIsValid = true;
  //     if (!data?.full_name) {

  //         formIsValid = false;
  //         errors["first_name"] = "Please enter your full name";
  //     }
  //     if (!data?.contact) {

  //         formIsValid = false;
  //         errors["contact"] = "Please select contact";
  //     }
  //     if (!data?.email) {
  //         formIsValid = false;
  //         errors["email"] = "Please enter email";
  //     } else if (!data?.email.match(validRegex)) {
  //         formIsValid = false;
  //         errors["emails"] = "Invalid email address!";
  //     }
  //     if (!data?.phone) {

  //         formIsValid = false;
  //         errors["phone"] = "Please enter your phone number";
  //     } else if (data?.phone?.length > 11) {

  //         formIsValid = false;
  //         errors["phone_number"] = "Invalid phone number";
  //     } else if (data?.phone?.length < 6) {

  //         formIsValid = false;
  //         errors["phone_number2"] = "Invalid phone number";
  //     }
  //     if (!data?.subject) {

  //         formIsValid = false;
  //         errors["subject"] = "Please select your type";
  //     }
  //     if (!data?.message) {

  //         formIsValid = false;
  //         errors["message"] = "Please enter your message";
  //     }
  //     if (!data?.captcha) {

  //         formIsValid = false;
  //         errors["captcha"] = "Please confirm you are not a robot!";
  //     }
  //     setError(errors);

  //     return formIsValid;
  // };
  const addWishlist = (e) => {
    if (userData) {
      setLoading(true);
      const body = {
        params: {
          product_id: e,
        },
      };
      ApiPost("wishlists", body)
        .then((res) => {
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
          setLoading(false);
        });
    } else {
      navigate("/login");
    }
  };
  // const submitData = () => {
  //     window.scrollTo(0, 0)
  //     if (validateForm()) {
  //         setLoading(true)
  //         const body = {
  //             params: {
  //                 full_name: data?.full_name,
  //                 email: data?.email,
  //                 phone_number: data?.phone,
  //                 message: data?.message,
  //                 type: data?.subject,
  //                 contact_by: data?.contact === "Phone" ? "P" : "E"
  //             }
  //         }
  //         ApiPost("submit-enquiry", body)
  //             .then((res) => {
  //                 setLoading(false)

  //                 if (res?.data?.result) {
  //                     swal({
  //                         title: "Success",
  //                         text: `Please note down the enquiry reference number(${res?.data?.result?.code}) for future reference`,
  //                         icon: "success",
  //                     })
  //                     setData(userData ? {
  //                         ...data,
  //                         subject: "",
  //                         message: "",
  //                         contact_by: ""
  //                     } : {
  //                         name: "",
  //                         email: "",
  //                         phone: "",
  //                         subject: "",
  //                         message: "",
  //                         contact_by: ""
  //                     })
  //                 }
  //             })
  //             .catch(async (err) => {

  //                 setLoading(false)
  //             });
  //     }
  // }
  useEffect(() => {
    document.title = "Artdevotee | Enquiry";
    window.scrollTo(0, 0);
    // setData({
    //     ...data,
    //     full_name:userData?.first_name ? userData?.first_name + " "+ userData?.last_name : ""
    // })
    const body = {
      params: {
        product_id: id,
      },
    };
    ApiPost("get-product-details", body)
      .then((res) => {
        setLoading(false);
        if (res?.data?.details) {
          setProductData(res?.data?.details);
          setWishlist(res?.data?.wishlist);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  // const position = Math.random() + 30 + Math.random()+ Math.random()+ Math.random()
  const initialValues = {
    full_name: userData?.first_name
      ? userData?.first_name + " " + userData?.last_name
      : "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    captcha: false,
  };
  const validationSchema = Yup.object({
    full_name: Yup.string().required("Please enter your full name!"),
    email: Yup.string()
      .required("Please enter your email address!")
      .email("Please enter a valid email address!")
      .nullable(),
    phone: Yup.string()
      .required("Please enter your phone number!")
      .matches(/^([0-9\s\-+()]*)$/, "Invalid phone number!")
      .min(7, "Phone number must be at least 7 characters!")
      .max(15, "Phone number contains maximum 15 characters!"),
    subject: Yup.string().required("Please select a subject!"),
    message: Yup.string().required("Please enter message!"),
    captcha: Yup.string().oneOf(
      ["true"],
      "Please confirm you are not a robot!"
    ),
    contact: Yup.string().required("Please select atleast one option!"),
  });
  const onSubmit = (values, actions) => {
    setLoading(true);
    const body = {
      params: {
        full_name: values?.full_name,
        email: values?.email,
        phone_number: values?.phone,
        message: values?.message,
        type: values?.subject,
        contact_by: values?.contact,
      },
    };
    ApiPost("submit-enquiry", body)
      .then((res) => {
        setLoading(false);

        if (res?.data?.result) {
          swal({
            title: "Success",
            text: `Please note down the enquiry reference number(${res?.data?.result?.code}) for future reference`,
            icon: "success",
          });
          actions.resetForm();
        }
      })
      .catch(async (err) => {
        setLoading(false);
      });
  };
  return (
    <div>
      {loading && <Loader />}
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

                <li>Enquiry</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="product-section new_en_sec">
        <div className="container">
          <div className="row no-gutters">
            <div className="enquiry_lefts">
              <div className="enquiry_top_img">
                <span>
                  <div className="wish_enquie wish_prod">
                    <a
                      className={` ${
                        wishlist?.includes(JSON.stringify(productData?.id)) &&
                        "add_wishlist"
                      }`}
                      onClick={() => addWishlist(productData?.id)}
                    >
                      <img
                        src={process.env.PUBLIC_URL + "/images/wish2.png"}
                        alt=""
                      />
                    </a>
                  </div>

                  {/* <img src={watermarkImage ? watermarkImage : process.env.PUBLIC_URL + "/images/enq_img.png"} /> */}
                  {/* <ReactWatermark
                                    
                                    color={'#fff'}
                                    font={'20px serif'}
                                    imagePath={process.env.PUBLIC_URL + "/images/enq_img.png"}
                                    textData={'Artdevotee'}
                                    textPosition={[20, 40]}
                                    multiple={true}
                                    transparent={5}
                                    type={'text'}
                                /> */}
                  {productData?.get_product_display_images?.length !== 0 && (
                    <div className="waterMark_Img">
                      <img
                        style={{ width: "100%" }}
                        src={
                          productData?.get_product_display_images
                            ? "https://artdevotee.com/preview/" +
                              productData?.get_product_display_images?.filter(
                                (e) => e?.is_default_display === "1"
                              )?.[0]?.image
                            : process.env.PUBLIC_URL + "/images/default.png"
                        }
                        alt="art devotee"
                      />
                    </div>
                  )}
                </span>
              </div>
              <div className="enquiry_btm_img">
                <h2>{productData?.title}</h2>

                <h5>Product Code : {productData?.product_id}</h5>
                <p>
                  {productData && (
                    <ReactReadMoreReadLess
                      charLimit={200}
                      readMoreText={<Link to="#">Read more</Link>}
                      readLessText={<Link to="#">Read less</Link>}
                      readMoreClassName="read-more-less--more"
                      readLessClassName="read-more-less--less"
                    >
                      {productData?.description
                        ? productData?.description
                        : " "}
                    </ReactReadMoreReadLess>
                  )}
                </p>

                <div className="en_pp">
                  {productData?.get_product_price?.filter(
                    (e) => e?.get_currency?.symbol === currency
                  )?.[0]?.discount && (
                    <span>
                      {currency &&
                        currency +
                          productData?.get_product_price?.filter(
                            (e) => e?.get_currency?.symbol === currency
                          )?.[0]?.price}
                    </span>
                  )}
                  {productData?.get_product_price?.filter(
                    (e) => e?.get_currency?.symbol === currency
                  )?.[0]?.global_offer_applied === "Y" && (
                    <span>
                      {currency &&
                        currency +
                          productData?.get_product_price?.filter(
                            (e) => e?.get_currency?.symbol === currency
                          )?.[0]?.price}
                    </span>
                  )}
                  <h6>
                    {productData?.get_product_price
                      ? productData?.get_product_price?.filter(
                          (e) => e?.get_currency?.symbol === currency
                        )?.[0]?.global_offer_applied === "Y"
                        ? currency &&
                          currency +
                            productData?.get_product_price?.filter(
                              (e) => e?.get_currency?.symbol === currency
                            )?.[0]?.after_discount_price
                        : productData?.get_product_price?.filter(
                            (e) => e?.get_currency?.symbol === currency
                          )?.[0]?.discount
                        ? currency +
                          productData?.get_product_price?.filter(
                            (e) => e?.get_currency?.symbol === currency
                          )?.[0]?.after_discount_price
                        : currency +
                          productData?.get_product_price?.filter(
                            (e) => e?.get_currency?.symbol === currency
                          )?.[0]?.price
                      : "0"}
                  </h6>
                </div>
              </div>
            </div>

            <div className="enquiry_rights">
              <div className="right_en_contents">
                <h2>Post Your Enquiry </h2>

                <p>
                  If you have any query / suggestion about the product or in
                  case you would like to use this product for business purpose,
                  Kindly contact us by filling out the following:
                </p>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <div className="enquiry_forms">
                      <div className="row">
                        <div className="col-sm-6 col-md-12 col-lg-6">
                          <div className="input_froms">
                            <label>
                              Full Name <span>*</span>{" "}
                            </label>

                            <Field
                              type="text"
                              placeholder="Enter your full name here"
                              // value={data?.full_name}
                              name="full_name"
                              // onChange={handlerChange}
                            />
                            {/* <span className="errorInput">
                                                    {data?.full_name?.length > 0 ? "" : errors["full_name"]}
                                                </span> */}
                            <span className="errorInput">
                              <ErrorMessage name="full_name" />
                            </span>
                          </div>
                        </div>

                        <div className="col-sm-6 col-md-12 col-lg-6">
                          <div className="input_froms">
                            <label>
                              Email address <span>*</span>{" "}
                            </label>

                            <Field
                              type="text"
                              placeholder="Enter here"
                              // value={data?.email}
                              name="email"
                              // onChange={handlerChange}
                            />
                            {/* <span className="errorInput">
                                                    {data?.email?.length > 0 ? "" : errors["email"]}
                                                </span>
                                                <span className="errorInput">
                                                    {data?.email?.match(validRegex) ? "" : errors["emails"]}
                                                </span> */}
                            <span className="errorInput">
                              <ErrorMessage name="email" />
                            </span>
                          </div>
                        </div>

                        <div className="col-sm-6 col-md-12 col-lg-6">
                          <div className="input_froms">
                            <label>
                              Phone Number<span>*</span>
                            </label>

                            <Field
                              type="number"
                              placeholder="Enter here"
                              // value={data?.phone}
                              name="phone"
                              // onChange={handlerChange}
                            />
                            {/* <span className="errorInput">
                                                    {data?.phone?.length > 0 ? "" : errors["phone"]}
                                                </span>
                                                <span className="errorInput">
                                                    {data?.phone?.length < 12 ? "" : errors["phone_number"]}
                                                </span>
                                                <span className="errorInput">
                                                    {data?.phone?.length > 5 ? "" : errors["phone_number2"]}
                                                </span> */}
                            <span className="errorInput">
                              <ErrorMessage name="phone" />
                            </span>
                          </div>
                        </div>

                        <div className="col-sm-6 col-md-12 col-lg-6">
                          <div className="input_froms">
                            <label>
                              Type<span>*</span>
                            </label>
                            <Field
                              as="select"
                              //   value={data?.subject}
                              name="subject"
                              //   onChange={handlerChange}
                            >
                              <option value="">Select</option>

                              <option value="Business / commercial use">
                                Business / commercial use
                              </option>

                              <option value="Suggestion Comments">
                                Suggestion Comments
                              </option>

                              <option value="Any Other">Any Other</option>
                            </Field>
                            {/* <span className="errorInput">
                          {data?.subject?.length > 0 ? "" : errors["subject"]}
                        </span> */}
                            <span className="errorInput">
                              <ErrorMessage name="subject" />
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="input_froms_radio">
                            <label>Contact by me</label>

                            <label className="radio">
                              <input
                                id="radio1"
                                type="radio"
                                name="contact"
                                value="P"
                                onChange={(e) => {
                                  setFieldValue("contact", e.target.value);
                                }}
                              />
                              <span className="outer">
                                <span className="inner"></span>
                              </span>
                              Phone
                            </label>

                            <label className="radio">
                              <input
                                id="radio2"
                                type="radio"
                                name="contact"
                                value="E"
                                onChange={(e) => {
                                  setFieldValue("contact", e.target.value);
                                }}
                              />
                              <span className="outer">
                                <span className="inner"></span>
                              </span>
                              Email
                            </label>
                          </div>
                          <span className="errorInput">
                            <ErrorMessage name="subject" />
                          </span>
                        </div>

                        <div className="col-sm-12">
                          <div className="input_froms">
                            <label>
                              Message<span>*</span>
                            </label>

                            <Field
                              as="textarea"
                              maxLength={500}
                              placeholder="Enter your details query here...."
                              //   value={data?.message}
                              name="message"
                              //   onChange={handlerChange}
                            ></Field>
                            {values?.message?.length <= 500 && (
                              <small>
                                {500 - values?.message?.length} characters
                                remaining
                              </small>
                            )}
                            {values?.message?.length > 500 && (
                              <small>
                                You can't use more than 500 characters.
                              </small>
                            )}
                            {/* <span className="errorInput h_20">
                          {data?.message?.length > 0 ? "" : errors["message"]}
                        </span> */}
                            <span className="errorInput h_21">
                              <ErrorMessage name="message" />
                            </span>
                          </div>
                        </div>

                        <div className="col-sm-12 mx-auto">
                          <div className="captcha">
                            <div className="spinner">
                              <label>
                                <Field
                                  type="checkbox"
                                  name="captcha"
                                  //   onChange={handlerChange}
                                />

                                <span className="checkmark">
                                  <span>&nbsp;</span>
                                </span>
                              </label>
                            </div>

                            <div className="text">I'm not a robot</div>

                            <div className="logs">
                              <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="" />

                              <p>reCAPTCHA</p>

                              <small>Privacy - Terms</small>
                            </div>
                          </div>
                          {/* <span className="errorInput h_20">
                        {data?.captcha ? "" : errors["captcha"]}
                      </span> */}
                          <span className="errorInput h_20">
                            <ErrorMessage name="captcha" />
                          </span>
                        </div>

                        <div className="col-sm-12">
                          <button
                            type="submit"
                            className="qu_sub_btns"
                            // onClick={submitData}
                          >
                            Submit Query{" "}
                            <img
                              src={process.env.PUBLIC_URL + "/images/send.png"}
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <FormikErrorFocus
                      offset={0}
                      align={"middle"}
                      focusDelay={200}
                      ease={"linear"}
                      duration={1000}
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Enquiry;
