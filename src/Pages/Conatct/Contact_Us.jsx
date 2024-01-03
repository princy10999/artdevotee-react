import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { ApiPost } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import FormikErrorFocus from "formik-error-focus";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
import { Helmet } from "react-helmet";

const Contact_Us = () => {
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userinfo"));
  const [loading, setLoading] = useState(false);
  //   const [data, setData] = useState(
  //     userData
  //       ? userData
  //       : {
  //           full_name: "",
  //           email: "",
  //           phone: "",
  //           subject: "",
  //           message: "",
  //         }
  //   );
  //   const [errors, setError] = useState({});
  //   var validRegex =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   const handlerChange = (e) => {
  //     const { name, value } = e.target;
  //     setData({
  //       ...data,
  //       [name]: value,
  //     });
  //   };

  //   const validateForm = () => {
  //     let errors = {};
  //     let formIsValid = true;
  //     if (!data?.full_name) {
  //       formIsValid = false;
  //       errors["name"] = "Please enter your full name";
  //     }
  //     if (!data?.email) {
  //       formIsValid = false;
  //       errors["email"] = "Please enter email";
  //     } else if (!data?.email.match(validRegex)) {
  //       formIsValid = false;
  //       errors["emails"] = "Invalid email address!";
  //     }
  //     if (!data?.phone) {
  //       formIsValid = false;
  //       errors["phone"] = "Please enter your phone number";
  //     } else if (data?.phone?.length > 11) {
  //       formIsValid = false;
  //       errors["phone_number"] = "Invalid phone number";
  //     } else if (data?.phone?.length < 6) {
  //       formIsValid = false;
  //       errors["phone_number2"] = "Invalid phone number";
  //     }
  //     if (!data?.subject) {
  //       formIsValid = false;
  //       errors["subject"] = "Please select subject";
  //     }
  //     if (!data?.message) {
  //       formIsValid = false;
  //       errors["message"] = "Please enter your message";
  //     }
  //     setError(errors);

  //     return formIsValid;
  //   };
  //   const submitData = () => {
  //     window.scrollTo(0, 0);
  //     if (validateForm()) {
  //       setLoading(true);
  //       const body = {
  //         params: {
  //           full_name: data?.full_name,
  //           email: data?.email,
  //           phone_number: data?.phone,
  //           message: data?.message,
  //           subject: data?.subject,
  //         },
  //       };
  //       ApiPost("submit-contact", body)
  //         .then((res) => {
  //           setLoading(false);

  //           if (res?.data?.result) {
  //             swal({
  //               title: "Success",
  //               text: res?.data?.result?.status?.meaning,
  //               icon: "success",
  //             });
  //             setData(
  //               userData
  //                 ? {
  //                     ...data,
  //                     subject: "",
  //                     message: "",
  //                   }
  //                 : {
  //                     first_name: "",
  //                     email: "",
  //                     phone: "",
  //                     subject: "",
  //                     message: "",
  //                   }
  //             );
  //           }
  //         })
  //         .catch(async (err) => {
  //           setLoading(false);
  //         });
  //     }
  //   };
  useEffect(() => {
    // document.title = "Artdevotee | Contact Us";
    window.scrollTo(0, 0);
    // setData({
    //   ...data,
    //   full_name: userData?.first_name
    //     ? userData?.first_name + " " + userData?.last_name
    //     : "",
    // });
  }, []);
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
  });
  const onSubmit = (values, actions) => {
    setLoading(true);
    const body = {
      params: {
        full_name: values.full_name,
        email: values.email,
        phone_number: values.phone,
        message: values.message,
        subject: values.subject,
      },
    };
    ApiPost("submit-contact", body)
      .then((res) => {
        setLoading(false);
        if (res?.data?.result) {
          swal({
            title: "Success",
            text: res?.data?.result?.status?.meaning,
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
    <>
    <Helmet>
        <title>Contact Us - Artdevotee</title>
        <meta
            name="description"
            content="Contact Us - Artdevotee"
        />
        <meta property="og:title" content="Contact Us - Artdevotee" />
        <meta property="og:description" content="Contact Us - Artdevotee" />
        <meta property="og:image" content="https://artdevotee.com/preview/dev/images/contact-bnr.png" />
        <link rel="canonical" href="https://artdevotee.com/contact-us" />
      </Helmet>
    <div>
      {loading && <Loader />}
      <div className="contact-bnr">
        <div className="container">
          <div className="contct-bnr-txt">
            <h1>Contact Us</h1>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                  Contact
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="contact-pager">
        <div className="container">
          <div className="contact-inr">
            <div className="row">
              <div className="col-lg-7">
                <div className="contact-frm-sec">
                  <div className="loger-top cont-top">
                    <h2>Get In Touch!</h2>

                    <h3>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua enim
                    </h3>
                  </div>

                  <div className="contact-form">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                      enableReinitialize={true}
                    >
                      {({ values, setFieldValue }) => (
                        <Form action="" role="form">
                          <div className="cont-name">
                            <div className="cont-inpt">
                              <label for="exampleFormControlInput1">
                                Full Name
                              </label>

                              <Field
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Enter your full name here"
                                // value={data?.full_name}
                                name="full_name"
                                // onChange={handlerChange}
                              />
                              {/* <span className="errorInput">
                            {data?.full_name?.length > 0 ? "" : errors["name"]}
                          </span> */}
                              <span className="errorInput">
                                <ErrorMessage name="full_name" />
                              </span>
                            </div>

                            <div className="cont-inpt">
                              <label for="exampleFormControlInput1">
                                Email Address
                              </label>

                              <Field
                                type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Enter here"
                                // value={data?.email}
                                name="email"
                                // onChange={handlerChange}
                              />
                              {/* <span className="errorInput">
                            {data?.email?.length > 0 ? "" : errors["email"]}
                          </span> */}
                              {/* <span className="errorInput">
                            {data?.email.match(validRegex)
                              ? ""
                              : errors["emails"]}
                          </span> */}
                              <span className="errorInput">
                                <ErrorMessage name="email" />
                              </span>
                            </div>
                          </div>

                          <div className="cont-name">
                            <div className="cont-inpt">
                              <label for="exampleFormControlInput1">
                                Phone Number
                              </label>

                              <Field
                                type="number"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Enter your phone number here"
                                // value={data?.phone}
                                name="phone"
                                // onChange={handlerChange}
                              />
                              {/* <span className="errorInput">
                            {data?.phone?.length > 0 ? "" : errors["phone"]}
                          </span>
                          <span className="errorInput">
                            {data?.phone?.length < 12
                              ? ""
                              : errors["phone_number"]}
                          </span>
                          <span className="errorInput">
                            {data?.phone?.length > 5
                              ? ""
                              : errors["phone_number2"]}
                          </span> */}
                              <span className="errorInput">
                                <ErrorMessage name="phone" />
                              </span>
                            </div>

                            <div className="cont-inpt">
                              <label for="exampleFormControlInput1">
                                Subject
                              </label>

                              <Field
                                as="select"
                                className="form-control"
                                id="exampleFormControlSelect1"
                                // value={data?.subject}
                                name="subject"
                                // onChange={handlerChange}
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

                          <div className="cont-inpt input_froms">
                            <label for="exampleFormControlInput1">
                              Message
                            </label>

                            <Field
                              as="textarea"
                              maxLength={500}
                              className="form-control "
                              id="exampleFormControlTextarea1"
                              placeholder="Enter your message here"
                              //   value={data?.message}
                              name="message"
                              //   onChange={handlerChange}
                            ></Field>
                            {/* {data?.message?.length <= 500 && (
                          <small>
                            {500 - data?.message?.length} characters remaining
                          </small>
                        )}
                        {data?.message?.length > 500 && (
                          <small>You can't use more than 500 characters.</small>
                        )}
                        <span className="errorInput">
                          {data?.message?.length > 0 ? "" : errors["message"]}
                        </span> */}
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
                            <span className="errorInput">
                              <ErrorMessage name="message" />
                            </span>
                          </div>
                          <div
                            className="col-sm-12 mx-auto"
                            style={{
                              paddingLeft: "0px",
                              marginBottom: "22px",
                              marginTop: "22px",
                            }}
                          >
                            <div className="captcha">
                              <div className="spinner">
                                <label>
                                  <Field type="checkbox" name="captcha" />

                                  <span className="checkmark">
                                    <span>&nbsp;</span>
                                  </span>
                                </label>
                              </div>

                              <div className="text">I'm not a robot</div>

                              <div className="logs">
                                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt=""/>

                                <p>reCAPTCHA</p>

                                <small>Privacy - Terms</small>
                              </div>
                            </div>
                            <span className="errorInput h_20">
                              <ErrorMessage name="captcha" />
                            </span>
                          </div>
                          <button
                            // type="button"
                            type="submit"
                            className="conc-btn"
                            // onClick={submitData}
                          >
                            Submit
                            <img
                              src={
                                process.env.PUBLIC_URL + "/images/send-fly.png"
                              }
                              alt=""
                            />
                          </button>
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

              <div className="col-lg-5">
                <div className="adrs-box">
                  <div className="adrs-inr">
                    <div className="ad-sec-01">
                      <div className="sec-img">
                        <img
                          src={process.env.PUBLIC_URL + "/images/map-white.png"}
                          alt=""
                        />
                      </div>

                      <div className="sec-text">
                        <h2>Address</h2>

                        <p>
                          Lorem ipsum dolor sit amet adipiscing elit sed do
                          eiusmod tempor
                        </p>
                      </div>
                    </div>

                    <div className="ad-sec-01">
                      <div className="sec-img">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/images/mail-white.png"
                          }
                          alt=""
                        />
                      </div>

                      <div className="sec-text">
                        <h2>Email</h2>

                        <a
                          className="a_hover"
                          href={`mailto:info@artdevotee.com`}
                        >
                          info@artdevotee.com
                        </a>
                      </div>
                    </div>

                    <div className="ad-sec-01">
                      <div className="sec-img">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/images/phone-white.png"
                          }
                          alt=""
                        />
                      </div>

                      <div className="sec-text">
                        <h2>Contact number</h2>
                        <a className="a_hover" href={`tel:+1 0123456789`}>
                          +1 0123456789{" "}
                        </a>
                        /
                        <span>
                          <a className="a_hover" href={`tel:+1 9876543210`}>
                            +1 9876543210
                          </a>
                        </span>
                      </div>
                    </div>

                    <div className="social-conct">
                      <h2>Connect with social media</h2>

                      <div className="sos-cnct-lst">
                        <ul>
                          <li>
                            <FacebookShareButton
                              url={
                                "https://artdevotee.com/preview/dev" +
                                location?.pathname
                              }
                            >
                              <a>
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/images/facebook.png"
                                  }
                                  alt=""
                                />
                              </a>
                            </FacebookShareButton>
                          </li>
                          <li>
                            <LinkedinShareButton
                              url={
                                "https://artdevotee.com/preview/dev" +
                                location?.pathname
                              }
                            >
                              <a>
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/images/linkedin.png"
                                  }
                                  alt=""
                                />
                              </a>
                            </LinkedinShareButton>
                          </li>
                          <li>
                            <PinterestShareButton
                              media={
                                "https://artdevotee.com/preview/dev" +
                                location?.pathname
                              }
                              description={
                                "https://artdevotee.com/preview/dev" +
                                location?.pathname
                              }
                              url={
                                "https://artdevotee.com/preview/dev" +
                                location?.pathname
                              }
                            >
                              <a>
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/images/pinterest.png"
                                  }
                                  alt=""
                                />
                              </a>
                            </PinterestShareButton>
                          </li>
                          <TwitterShareButton
                            url={
                              "https://artdevotee.com/preview/dev" +
                              location?.pathname
                            }
                          >
                            <li>
                              <a>
                                <img
                                  src={
                                    process.env.PUBLIC_URL + "/images/fa3.png"
                                  }
                                  alt=""
                                  className="hverb"
                                />
                              </a>
                            </li>
                          </TwitterShareButton>
                          {/* <li>
                            <a>
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/images/instagram.png"
                                }
                                alt=""
                              />
                            </a>
                          </li> */}
                        </ul>
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
    </>
  );
};

export default Contact_Us;
