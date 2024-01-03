import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ApiPostNoAuth } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";
import { Formik, Form, ErrorMessage, Field } from "formik";
import swal from "sweetalert";
import * as Yup from "yup";
import FormikErrorFocus from "formik-error-focus";
import { Helmet } from "react-helmet";
import { ApiPost } from "../../Api/Api";
import { gapi } from 'gapi-script';

const Sign_Up = () => {
  const location = useLocation();
  const [phoneStore, setPhoneStore] = useState("");
  const [country, setCountry] = useState([]);
  const [con, setCon] = useState("");
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [rType, setRType] = useState("N");
  const [uData, setUData] = useState([]);
  // const [data, setData] = useState({
  //     fname: "",
  //     lname: "",
  //     email: "",
  //     password: "",
  //     cPassword: "",
  //     newsletter_receive: false,
  //     agree: false,
  // })
  // var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\$%\^&\*]).{6,}$/;
  // const [errors, setError] = useState({});
  const [errorMsg, seterrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  
  // const validateForm = () => {

  //     let errors = {};
  //     let formIsValid = true;
  //     if (!data?.fname) {
  //         formIsValid = false;
  //         errors["fname"] = "Please enter first name";
  //     }
  //     if (!data?.lname) {
  //         formIsValid = false;
  //         errors["lname"] = "Please enter last name";
  //     }
  //     if (!data?.email) {
  //         formIsValid = false;
  //         errors["email"] = "Please enter email";
  //     } else if (!data?.email.match(validRegex)) {
  //         formIsValid = false;
  //         errors["emails"] = "Invalid email address!";
  //     }
  //     if (!data?.password) {
  //         formIsValid = false;
  //         errors["password"] = "Please enter password";
  //     }
  //     else if (data?.password?.length < 5) {
  //         formIsValid = false;
  //         errors["passwords"] = "Password must be 6 characters.";
  //     } else if (!data?.password?.match(passwordRegex)) {
  //         formIsValid = false;
  //         errors["passwordCheck"] = "Please enter strong password";
  //     }
  //     if (!data?.cPassword) {
  //         formIsValid = false;
  //         errors["cPassword"] = "Please confirm your password";
  //     } else if (data?.password !== data?.cPassword) {
  //         formIsValid = false;
  //         errors["cPasswordmatch"] = "Password do NOT match";
  //     }
  //     if (!data?.agree) {
  //         formIsValid = false;
  //         errors["agree"] = "Please agree to our terms & condition and privacy policy";
  //     }
  //     if (!data?.know) {
  //         formIsValid = false;
  //         errors["know"] = "Please select how you come to know about our website";
  //     }
  //     setError(errors);

  //     return formIsValid;
  // };
  // const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     if (name === "agree") {
  //         setData({ ...data, agree: e.target.checked })
  //     } else if (name === "newsletter_receive") {
  //         setData({ ...data, newsletter_receive: e.target.checked })
  //      } else {
  //         setData({
  //             ...data,
  //             [name]: value,
  //         });
  //     }
  // }
  // const submitData = () => {
  //     if (validateForm()) {
  //         setLoading(true)
  //         const body = {
  //             first_name: data?.fname,
  //             last_name: data?.lname,
  //             email: data?.email,
  //             password: data?.password,
  //             confirm_password: data?.cPassword,
  //             agree: data?.agree ? "Y" : "N",
  //             newsletter_receive:data?.newsletter_receive ? "Y" :"N",
  //             got_to_know:data?.know
  //         }
  //         ApiPostNoAuth("signUp", body)
  //             .then((res) => {

  //                 if (res?.data?.error) {
  //                     seterrorMsg(res?.data?.error?.meaning)
  //                 }
  //                 setLoading(false)
  //                 { res?.data?.result?.status && setMsg(res?.data?.result?.status?.meaning) }
  //             })
  //             .catch(async (err) => {

  //                 setLoading(false)

  //             });
  //     }
  // }
  const responseGoogle = (response) => {
    if (response && response.googleId) {
      setRType("S");
      setUData(response);
      swal({
        text: "Please select country to complete your registration",
        icon: "warning",
      });
    }

    // setLoading(true);
    // const body = {
    //   params: {
    //     social_id: response?.googleId,
    //     type: "google",
    //     accessToken: response?.accessToken,
    //     first_name: response?.profileObj?.givenName,
    //     last_name: response?.profileObj?.familyName,
    //     email: response?.profileObj?.email,
    //     image: response?.profileObj?.imageUrl,
    //     action_type: "S",
    //   },
    // };
    // ApiPostNoAuth("socialLogin", body)
    //   .then((res) => {
    //     if (res?.data?.error) {
    //       seterrorMsg(res?.data?.error?.meaning);
    //     } else if (res?.data?.result) {
    //       swal({
    //         text: res?.data?.result?.status?.meaning,
    //         icon: "warning",
    //       });
    //       setRType("S");
    //       if (res?.data?.result?.userData) {
    //         setUData(res?.data?.result?.userData);
    //       }
    //       // navigate("/login");
    //       // localStorage.setItem("userinfo", JSON.stringify(res?.data?.result?.userData))
    //       // localStorage.clear()
    //     }
    //     setLoading(false);
    //   })
    //   .catch((e) => {
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    // document.title = "Artdevotee | Signup";
    window.scrollTo(0, 0);
    localStorage.clear();
    ApiPost("country-list", {})
      .then((res) => {
        setLoading(false);
        if (res?.data?.result) {
          setCountry(res?.data?.result?.country_with_code);
          setStates(res?.data?.result?.state_list);
        }
      })
      .catch(async (err) => {
        setLoading(false);
      });
  }, [rType]);
  useEffect(() => {
    setTimeout(() => {
      seterrorMsg("");
    }, 10000);
  }, [errorMsg]);
  useEffect(() => {
    if (msg) {
      setMsg("");
    }
  }, [location]);
  const bbb = country.map((e) => e?.name);
  const bbbb = bbb.filter((e) => {
    if (e?.toLowerCase()?.includes(phoneStore.toLowerCase())) {
      return e;
    }
  });

  //suabrna 19-10-22
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    cPassword: "",
    newsletter_receive: false,
    agree: false,
    know: "",
    country: "",
    state: "",
    type: rType,
  };
  const validationSchema = Yup.object({
    type: Yup.string(),
    fname: Yup.string().when("type", {
      is: "N",
      then: Yup.string().required("Please enter your first name!"),
    }),
    lname: Yup.string().when("type", {
      is: "N",
      then: Yup.string().required("Please enter your last name!"),
    }),
    email: Yup.string().when("type", {
      is: "N",
      then: Yup.string()
        .required("Please enter your email address!")
        .email("Please enter a valid email address!")
        .nullable(),
    }),
    country: Yup.string().required("Please select your country!"),
    state: Yup.string().when("country", {
      is: "India (+91)",
      then: Yup.string().required("Please select your state!"),
    }),
    password: Yup.string().when("type", {
      is: "N",
      then: Yup.string()
        .required("Please enter Password!")
        .matches(passwordRegex, "Please enter a strong password!"),
    }),
    cPassword: Yup.string().when("type", {
      is: "N",
      then: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords is not matching!")
        .required("Please confirm your password!"),
    }),
    agree: Yup.string().when("type", {
      is: "N",
      then: Yup.string().oneOf(
        ["true"],
        "Please agree to our terms & condition and privacy policy!"
      ),
    }),
    know: Yup.string().when("type", {
      is: "N",
      then: Yup.string().required("Please select an option!"),
    }),
  });
  const onSubmit = (values, actions) => {
    setLoading(true);
    let body = {};
    let url = "";
    if (rType === "N") {
      url = "signUp";
      body = {
        first_name: values?.fname,
        last_name: values?.lname,
        email: values?.email,
        password: values?.password,
        confirm_password: values?.cPassword,
        agree: values?.agree ? "Y" : "N",
        newsletter_receive: values?.newsletter_receive ? "Y" : "N",
        got_to_know: values?.know,
        country: values?.country,
        state: values?.state,
      };
    } else if (rType === "S" && uData) {
      url = "socialLogin";
      body = {
        params: {
          social_id: uData?.googleId,
          type: "google",
          accessToken: uData?.accessToken,
          first_name: uData?.profileObj?.givenName,
          last_name: uData?.profileObj?.familyName,
          email: uData?.profileObj?.email,
          image: uData?.profileObj?.imageUrl,
          action_type: "S",
          country: values?.country,
          state: values?.state,
        },
      };
    }
    ApiPostNoAuth(url, body)
      .then((res) => {
        if (res?.data?.error) {
          seterrorMsg(res?.data?.error?.meaning);
        }
        setLoading(false);
        {
          res?.data?.result?.status &&
            setMsg(res?.data?.result?.status?.meaning);
        }
      })
      .catch(async (err) => {
        setLoading(false);
      });
  };
  //Subarna 19-10-22


  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "774931894790-na1l9qv8n3crfids6c6ij51aa074nisd.apps.googleusercontent.com",
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  return (
    <>
      <Helmet>
        <title>Sign Up - Artdevotee</title>
        <meta name="description" content="Sign Up - Artdevotee" />
        <meta property="og:title" content="Sign Up - Artdevotee" />
        <meta property="og:description" content="Sign Up - Artdevotee" />
        <meta
          property="og:image"
          content="https://artdevotee.com/preview/dev/images/how-bnr.png"
        />
        <link rel="canonical" href="https://artdevotee.com/sign-up" />
      </Helmet>
      <div className="log-page">
        {loading && <Loader />}
        {!msg ? (
          <div className="container">
            <div className="log-page-inr">
              <div className="login-box">
                <div className="log-box-top">
                  {errorMsg && <h6 className="errorMsg">{errorMsg}</h6>}
                  <div className="loger-top">
                    <h2>Signup</h2>
                    <h3>Please fill in the below fields to continue</h3>
                  </div>
                  <div className="loger-inr signer-inr">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                      enableReinitialize={true}
                    >
                      {({ values, setFieldValue }) => (
                        <Form action="" role="form">
                          {rType === "N" && (
                            <>
                              <div className="name">
                                <div className="log-inpt sign-inpt">
                                  <label for="exampleInputEmail1">
                                    First Name<span>*</span>
                                  </label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter here"
                                    id="fname"
                                    name="fname"
                                    //   value={data?.fname}
                                    //   onChange={handleChange}
                                  />
                                  {/* <span className="errorInput">
                                                {data?.fname?.length > 0 ? "" : errors["fname"]}
                                            </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="fname" />
                                  </span>
                                </div>
                                <div className="log-inpt sign-inpt">
                                  <label for="exampleInputEmail1">
                                    Last Name<span>*</span>
                                  </label>
                                  <Field
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter here"
                                    id="lname"
                                    name="lname"
                                    //   value={data?.lname}
                                    //   onChange={handleChange}
                                  />
                                  {/* <span className="errorInput">
                                                {data?.lname?.length > 0 ? "" : errors["lname"]}
                                            </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="lname" />
                                  </span>
                                </div>
                              </div>
                              <div className="log-inpt sign-inpt">
                                <label for="exampleInputEmail1">
                                  Email address<span>*</span>
                                </label>
                                <Field
                                  type="email"
                                  className="form-control"
                                  placeholder="Enter here"
                                  id="email"
                                  name="email"
                                  // value={data?.email}
                                  // onChange={handleChange}
                                />
                                {/* <span className="errorInput">
                                            {data?.email?.length > 0 ? "" : errors["email"]}
                                        </span>
                                        <span className="errorInput">
                                            {data?.email.match(validRegex) ? "" : errors["emails"]}
                                        </span> */}
                                <span className="errorInput">
                                  <ErrorMessage name="email" />
                                </span>
                              </div>
                            </>
                          )}
                          <div className="log-inpt sign-inpt sing-up-con">
                            <label for="exampleInputEmail1">
                              Country<span>*</span>
                            </label>
                            <a className="sort_open country_input">
                              {values?.country ? values?.country : "select"}
                            </a>
                            <div className="sort_lst show_phone_code show_checkout_code ">
                              <input
                                className="phone_input"
                                value={phoneStore}
                                name="country"
                                onChange={(e) =>
                                  setPhoneStore(e?.target?.value)
                                }
                              />
                              <ul className="sort_open show_phone_code_list sing-up-con-ul">
                                {phoneStore &&
                                  [...new Set(bbbb)]?.map((e) => (
                                    <li>
                                      <a
                                        onClick={() => {
                                          setFieldValue("country", e);
                                          setCon(e);
                                        }}
                                      >
                                        +{e}
                                      </a>
                                    </li>
                                  ))}
                                {!phoneStore &&
                                  [...new Set(bbb)]?.map((e) => (
                                    <li>
                                      <a
                                        onClick={() => {
                                          setFieldValue("country", e);
                                          setCon(e);
                                        }}
                                      >
                                        +{e}
                                      </a>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <span className="errorInput extra_error ext-err00">
                              <ErrorMessage name="country" />
                            </span>
                          </div>
                          {con.toString() === "India (+91)" && (
                            <div className="log-inpt sign-inpt">
                              <div className="input_froms">
                                <label>State</label>
                                <Field as="select" name="state">
                                  <option value="">Select</option>
                                  {states && states.length > 0
                                    ? states.map((value, index) => {
                                        return (
                                          <option
                                            key={"state" + index}
                                            value={value.name}
                                          >
                                            {value.name}
                                          </option>
                                        );
                                      })
                                    : null}
                                </Field>

                                <span className="errorInput">
                                  <ErrorMessage name="state" />
                                </span>
                              </div>
                            </div>
                          )}
                          {rType === "N" && (
                            <>
                              <div className="name mb_0">
                                <div className="log-inpt sign-inpt">
                                  <label for="exampleInputEmail1">
                                    Password<span>*</span>
                                  </label>
                                  <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autocomplete="current-password"
                                    id="id_password"
                                    placeholder="Enter here"
                                    //   value={data?.password}
                                    //   onChange={handleChange}
                                  />
                                  <i
                                    className={`${
                                      showPassword && "fa-eye-slash"
                                    } fa fa-eye pointer`}
                                    id="togglePassword"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                  ></i>
                                  {/* <span className="errorInput">
                                                {data?.password?.length > 0 ? "" : errors["password"]}
                                            </span>
                                            <span className="errorInput">
                                                {data?.password?.length > 5 ? "" : errors["passwords"]}
                                            </span>
                                            <span className="errorInput h_21">
                                            {data?.password.match(passwordRegex) ? "" : errors["passwordCheck"]}
                                        </span> */}
                                  <span className="errorInput h15">
                                    <ErrorMessage name="password" />
                                  </span>
                                </div>
                                <div className="log-inpt sign-inpt">
                                  <label for="exampleInputEmail1">
                                    Confirm Password<span>*</span>
                                  </label>
                                  <Field
                                    type={showPassword2 ? "text" : "password"}
                                    name="cPassword"
                                    autocomplete="current-password"
                                    id="id_password_2"
                                    placeholder="Enter here"
                                    //   value={data?.cPassword}
                                    //   onChange={handleChange}
                                  />
                                  <i
                                    className={`${
                                      showPassword2 && "fa-eye-slash"
                                    } fa fa-eye pointer`}
                                    id="togglePassword"
                                    onClick={() =>
                                      setShowPassword2(!showPassword2)
                                    }
                                  ></i>
                                  {/* <span className="errorInput">
                                                {data?.cPassword?.length > 0 ? "" : errors["cPassword"]}
                                            </span>
                                            <span className="errorInput">
                                                {data?.cPassword && (data?.cPassword === data?.password) ? "" : errors["cPasswordmatch"]}
                                            </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="cPassword" />
                                  </span>
                                </div>
                              </div>
                              <label className="mb-3 text-success f_12">
                                Note: For a strong password it should contain at
                                least one capital letter, one small letter, a
                                number and a special character and minimum 6
                                characters.(A!12fd)
                              </label>
                              <div className="forget signer-forget">
                                <label className="tick ">
                                  Sign up for newsletter
                                  <Field
                                    type="checkbox"
                                    name="newsletter_receive"
                                    //   value={data?.newsletter_receive}
                                    //   onChange={handleChange}
                                  />
                                  <span className="tickmark"></span>
                                </label>
                                <label className="tick">
                                  By creating an account, you agree to Art
                                  Devotee’s all{" "}
                                  <Link to="/terms-condition" target="_blank">
                                    Terms & Conditions
                                  </Link>{" "}
                                  and{" "}
                                  <Link to="/privacy-policy" target="_blank">
                                    Privacy Policy
                                  </Link>
                                  .
                                  <Field
                                    type="checkbox"
                                    name="agree"
                                    //   value={data?.agree}
                                    //   onChange={handleChange}
                                  />
                                  <span className="tickmark"></span>
                                  {/* <span className="errorInput h_21">
                          {data?.agree ? "" : errors["agree"]}
                        </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="agree" />
                                  </span>
                                </label>
                              </div>
                              <div className="input_froms">
                                <label>
                                  How did you come to know about our website?
                                </label>
                                <Field
                                  as="select"
                                  name="know"
                                  // value={data?.know}
                                  // onChange={handleChange}
                                >
                                  <option value="">Select</option>
                                  <option value="Social Media">
                                    Social Media
                                  </option>
                                  <option value="Internet">Internet</option>
                                  <option value="Newspaper">Newspaper</option>
                                  <option value="Friend">Friend</option>
                                  <option value="Family">Family</option>
                                  <option value="Other">Other</option>
                                </Field>
                                {/* <span className="errorInput h_15">
                          {data?.know ? "" : errors["know"]}
                        </span> */}
                                <span className="errorInput h_15">
                                  <ErrorMessage name="know" />
                                </span>
                              </div>
                            </>
                          )}
                          <button
                            type="submit"
                            className="log-sbmt"
                            // onClick={submitData}
                          >
                            {" "}
                            Sign Up
                          </button>
                          {rType === "N" && (
                            <GoogleLogin
                              clientId="774931894790-k9coguvfehldv4b9g4p7103olio8g7cl.apps.googleusercontent.com"
                              buttonText="Login"
                              render={(renderProps) => (
                                <div className="google">
                                  <span>Or Continue With</span>
                                  <a
                                    className="pointer"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                  >
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        "/images/google.png"
                                      }
                                      alt=""
                                    />
                                  </a>
                                </div>
                              )}
                              onSuccess={responseGoogle}
                              onFailure={responseGoogle}
                              cookiePolicy={"single_host_origin"}
                            />
                          )}
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
                <div className="log-box-btm">
                  <h5>
                    Already have an Account?<Link to="/login">Login</Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="goto-login">
            <div className="">
              <h5>{msg}</h5>
              <Link to="/login">Go to login</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sign_Up;
