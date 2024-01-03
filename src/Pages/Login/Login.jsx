import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiPost, ApiPostNoAuth } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";
import GoogleLogin from "react-google-login";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import FormikErrorFocus from "formik-error-focus";
import { Helmet } from "react-helmet";
import { gapi } from 'gapi-script';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [errors, setError] = useState({});
  // const [data, setData] = useState({
  //     name: "user",
  //     email: localStorage.getItem("email") ? localStorage.getItem("email") :"",
  //     password: localStorage.getItem("password") ? localStorage.getItem("password"):"",
  //     rememberme: localStorage.getItem("rememberme") ?  localStorage.getItem("rememberme") : false
  // })
  // const handlerChange = (e) => {
  //     const { name, value } = e.target;
  //     if(name === "rememberme"){
  //         setData({
  //             ...data,
  //             rememberme:e?.target?.checked
  //         })
  //     }else{
  //         setData({
  //             ...data,
  //             [name]: value
  //         })
  //     }
  // }
  // var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // const validateForm = () => {

  //     let errors = {};
  //     let formIsValid = true;
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
  //     else if (data?.password?.length < 6) {
  //         formIsValid = false;
  //         errors["passwords"] = "The password must be at least 6 characters.";
  //     }
  //     setError(errors);

  //     return formIsValid;
  // };
  // const loginUser = () => {
  //     if(validateForm()){
  //         setLoading(true)
  //         if (data?.rememberme) {
  //             localStorage.setItem("email", data?.email);
  //             localStorage.setItem("password", data?.password);
  //             localStorage.setItem("rememberme", data?.rememberme);
  //           } else {
  //             localStorage.removeItem("email");
  //             localStorage.removeItem("password");
  //             localStorage.removeItem("rememberme");
  //           }
  //     const body = {
  //         params: {
  //             email: data?.email,
  //             password: data?.password
  //         }
  //     }
  //     ApiPost("auth/login", body).then((res) => {

  //         if (res?.data?.error) {
  //             seterrorMsg(res?.data?.error?.meaning)
  //             setMsg(res?.data?.result?.status?.meaning)
  //         } else if (res?.data?.result) {
  //             localStorage.setItem("access_tocken", JSON.stringify(res?.data?.result?.token))
  //             localStorage.setItem("userinfo", JSON.stringify(res?.data?.result?.userdata))
  //             if(!res?.data?.result?.userdata?.phone){
  //                 navigate("/edit-profile")
  //             }else{
  //                 navigate("/dashboard")
  //             }
  //         }
  //         setLoading(false)
  //     })
  //         .catch(async (err) => {

  //             setLoading(false)
  //         });
  //     }
  // }
  const responseGoogle = (response) => {
    if(!response?.error){
      setLoading(true);
    const body = {
      params: {
        social_id: response?.googleId,
        type: "google",
        accessToken: response?.accessToken,
        first_name: response?.profileObj?.givenName,
        last_name: response?.profileObj?.familyName,
        email: response?.profileObj?.email,
        image: response?.profileObj?.imageUrl,
        action_type: "L",
      },
    };
    ApiPostNoAuth("socialLogin", body)
      .then((res) => {
        if (res?.data?.error) {
          seterrorMsg(res?.data?.error?.meaning);
        } else if (res?.data?.result) {
          localStorage.setItem(
            "userinfo",
            JSON.stringify(res?.data?.result?.userData)
          );
          localStorage.setItem(
            "access_tocken",
            JSON.stringify(res?.data?.result?.token)
          );
          if (!res?.data?.result?.userData?.phone) {
            navigate("/edit-profile");
          } else {
            navigate("/dashboard");
          }
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
    }
  };
  useEffect(() => {
    // document.title = "Artdevotee | Login";
    window.scrollTo(0, 0);
    localStorage.clear();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      seterrorMsg("");
    }, 10000);
  }, [errorMsg]);

  //Subarna 19-10-22
  const initialValues = {
    email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
    password: localStorage.getItem("password")
      ? localStorage.getItem("password")
      : "",
    rememberme: localStorage.getItem("rememberme")
      ? localStorage.getItem("rememberme")
      : false,
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Please enter your email address!")
      .email("Please enter a valid email address!")
      .nullable(),
    password: Yup.string()
      .required("Please enter a password!")
      .min(6, "Password must be atleast 6 character!")
      .nullable(),
  });
  const onSubmit = (values, actions) => {
    setLoading(true);
    if (values?.rememberme) {
      localStorage.setItem("email", values?.email);
      localStorage.setItem("password", values?.password);
      localStorage.setItem("rememberme", values?.rememberme);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberme");
    }
    const body = {
      params: {
        email: values?.email,
        password: values?.password,
      },
    };
    ApiPost("auth/login", body)
      .then((res) => {
        if (res?.data?.error) {
          seterrorMsg(res?.data?.error?.meaning);
          setMsg(res?.data?.result?.status?.meaning);
        } else if (res?.data?.result) {
          localStorage.setItem(
            "access_tocken",
            JSON.stringify(res?.data?.result?.token)
          );
          localStorage.setItem(
            "userinfo",
            JSON.stringify(res?.data?.result?.userdata)
          );
          if (!res?.data?.result?.userdata?.phone) {
            navigate("/edit-profile");
          } else {
            navigate("/dashboard");
          }
        }
        setLoading(false);
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
        <title>Login - Artdevotee</title>
        <meta
            name="description"
            content="Login - Artdevotee"
        />
        <meta property="og:title" content="Login - Artdevotee" />
        <meta property="og:description" content="Login - Artdevotee" />
        <meta property="og:image" content="https://artdevotee.com/preview/dev/images/how-bnr.png" />
        <link rel="canonical" href="https://artdevotee.com/login" />
      </Helmet>
    <div className="log-page">
      {loading && <Loader />}
      {msg ? (
        <div className="goto-login">
          <div className="">
            <h5>{msg}</h5>
            <Link to="" onClick={() => setMsg("")}>
              Go to login
            </Link>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="log-page-inr">
            <div className="login-box">
              <div className="log-box-top">
                {errorMsg && <h6 className="errorMsg">{errorMsg}</h6>}
                <div className="loger-top">
                  <h2>Login</h2>
                  <h3>Please enter your login info to continue</h3>
                </div>
                <div className="loger-inr">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                  >
                    {({ values, setFieldValue }) => (
                      <Form action="" role="form">
                        <div className="log-inpt inpt-1">
                          <label for="exampleInputEmail1">Email address</label>
                          <Field
                            type="email"
                            className="form-control"
                            placeholder="Enter here..."
                            name="email"
                            // value={data?.email}
                            // onChange={handlerChange}
                          />
                          {/* <span className="errorInput">
                        {data?.email?.length > 0 ? "" : errors["email"]}
                      </span> */}
                          {/* <span className="errorInput">
                        {data?.email.match(validRegex) ? "" : errors["emails"]}
                      </span> */}
                          <span className="errorInput">
                            <ErrorMessage name="email" />
                          </span>
                        </div>
                        <div className="log-inpt">
                          <label for="exampleInputEmail1">Password</label>
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            autocomplete="current-password"
                            // required
                            id="id_password"
                            placeholder="Enter here..."
                            // value={data?.password}
                            // onChange={handlerChange}
                          />
                          <i
                            className={`${
                              showPassword && "fa-eye-slash"
                            } fa fa-eye pointer`}
                            id="togglePassword"
                            onClick={() => setShowPassword(!showPassword)}
                          ></i>
                          {/* <span className="errorInput">
                        {data?.password?.length > 0 ? "" : errors["password"]}
                      </span>
                      <span className="errorInput">
                        {data?.password?.length > 5 ? "" : errors["passwords"]}
                      </span> */}
                          <span className="errorInput">
                            <ErrorMessage name="password" />
                          </span>
                        </div>
                        <div className="forget">
                          <label className="tick">
                            Remember me
                            <Field
                              type="checkbox"
                              name="rememberme"
                              //   value={data?.rememberme}
                              //   onChange={handlerChange}
                              //   checked={data?.rememberme}
                            />
                            <span className="tickmark"></span>
                          </label>
                          <Link to="/forgot-password">Forgot password?</Link>
                        </div>
                        <button
                          type="submit"
                          className="log-sbmt"
                          // onClick={loginUser}
                        >
                          {" "}
                          Submit
                        </button>
                        <GoogleLogin
                          clientId="774931894790-na1l9qv8n3crfids6c6ij51aa074nisd.apps.googleusercontent.com"
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
                  Don't have an Account? <Link to="/sign-up">Register Now</Link>
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Login;
