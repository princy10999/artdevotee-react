import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { ApiPost } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";

const Forgot_Password = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [errors, setError] = useState({});
  const [errorMsg, seterrorMsg] = useState("");
  var validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!data) {
      formIsValid = false;
      errors["email"] = "Please enter email";
    } else if (!data.match(validRegex)) {
      formIsValid = false;
      errors["emails"] = "Invalid email address!";
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
          email: data,
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
            navigate("/otp", { state: { email: data } });
          }
          setLoading(false);
        })
        .catch(async (err) => {
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    document.title = "Artdevotee | Forgot Password";
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      seterrorMsg("");
    }, 10000);
  }, [errorMsg]);
  return (
    <div className="log-page">
      {loading && <Loader />}
      <div className="container">
        <div className="log-page-inr">
          <div className="login-box">
            <div className="log-box-top">
              {errorMsg && <h6 className="errorMsg">{errorMsg}</h6>}
              <div className="loger-top for-got">
                <h2>Forgot Password</h2>
                <h3>
                  Please enter your registered email address to recieve OTP to
                  reset your password
                </h3>
              </div>
              <div className="loger-inr">
                <form action="" role="form" onSubmit={resetPassword}>
                  <div className="log-inpt">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                    />
                    <span className="errorInput">
                      {data?.length > 0 ? "" : errors["email"]}
                    </span>
                    <span className="errorInput">
                      {data.match(validRegex) ? "" : errors["emails"]}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="log-sbmt mt-2"
                  >
                    Submit
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

export default Forgot_Password;
