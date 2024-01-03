import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { ApiPost } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({ otp: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({});
  const [errorMsg, seterrorMsg] = useState("");
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (data?.otp === "") {
      console.log(1);
      formIsValid = false;
      errors["otp"] = "Please enter otp";
    } else if (data?.otp?.length < 5) {
      console.log(2);
      formIsValid = false;
      errors["otps"] = "Please enter otp";
    }
    setError(errors);

    return formIsValid;
  };
  const resetPassword = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true);
      const body = {
        params: {
          email: location?.state?.email,
          otp: data?.otp,
        },
      };
      ApiPost("verify-otp", body)
        .then((res) => {
          if (res?.data?.error) {
            seterrorMsg(res?.data?.error?.meaning);
          } else if (res?.data?.result) {
            swal({
              title: "Success",
              text: res?.data?.result?.status?.meaning,
              icon: "success",
            });
            navigate("/update-password", { state: { otp: data?.otp } });
          }
          setLoading(false);
        })
        .catch(async (err) => {
          setLoading(false);
        });
    }
  };
  const resetOtp = () => {
    setLoading(true);
    const body = {
      params: {
        email: location?.state?.email,
      },
    };
    ApiPost("reset-password", body)
      .then((res) => {
        if (res?.data?.error) {
          seterrorMsg(res?.data?.error?.meaning);
        } else if (res?.data?.result) {
          swal({
            title: "Success",
            text: res?.data?.result?.status?.meaning,
            icon: "success",
          });
        }
        setLoading(false);
      })
      .catch(async (err) => {
        setLoading(false);
      });
  };
  const handleChange = (otp) => {
    setData({ otp });
  };
  console.log("data",data);
  useEffect(() => {
    document.title = "Artdevotee | Login";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="log-page">
      {loading && <Loader />}
      <div className="container">
        <div className="log-page-inr">
          <div className="login-box">
            <div className="log-box-top">
              {errorMsg && <h6 className="errorMsg">{errorMsg}</h6>}
              <div className="loger-top for-got otp-got">
                <h2>OTP Verifiction</h2>
                <h3>Please enter the OTP sent to your registered email.</h3>
              </div>
              <div className="loger-inr">
                <form action="" role="form" onSubmit={resetPassword}>
                  <h3>Enter your OTP here</h3>
                  <div className="otp">
                    <OtpInput
                      name="otp"
                      value={data?.otp}
                      onChange={handleChange}
                      numInputs={6}
                    />
                  <span className="errorInput">
                      {data?.otp?.length > 0 ? "" : errors["otp"]}
                    </span>
                    <span className="errorInput">
                      {data?.otp?.length > 5 ? "" : errors["otps"]}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="log-sbmt mt-4"
                  >
                    {" "}
                    Submit
                  </button>

                  <h4>Did not recieve verification code yet?</h4>
                  <button type="button" className="otp-reset" onClick={resetOtp}>
                    <img src={process.env.PUBLIC_URL + "/images/resend.png"} alt=""/>
                    Resend OTP
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
