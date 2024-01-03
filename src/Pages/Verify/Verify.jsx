import React, { useEffect } from "react";

const Verify = () => {
  useEffect(() => {
    document.title = "Artdevotee | Verify";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="log-page">
        <div className="container">
          <div className="log-page-inr">
            <div className="login-box">
              <div className="log-box-top">
                <div className="loger-top for-got otp-got">
                  <h2>verification Code</h2>
                  <h3>
                    Please enter the verification code sent to your registered
                    email.
                  </h3>
                </div>
                <div className="loger-inr">
                  <form action="" role="form">
                    <h3>Enter your verification code here</h3>
                    <ul>
                      <li>
                        <input
                          name="code1"
                          id="codeBox1"
                          type="text"
                          maxlength="1"
                          value=""
                        />
                      </li>
                      <li>
                        <input
                          name="code2"
                          id="codeBox2"
                          type="text"
                          maxlength="1"
                          value=""
                        />
                      </li>
                      <li>
                        <input
                          name="code3"
                          id="codeBox3"
                          type="text"
                          maxlength="1"
                          value=""
                        />
                      </li>
                      <li>
                        <input
                          name="code4"
                          id="codeBox4"
                          type="text"
                          maxlength="1"
                          value=""
                        />
                      </li>
                      <li>
                        <input
                          name="code5"
                          id="codeBox5"
                          type="text"
                          maxlength="1"
                          value=""
                        />
                      </li>
                      <li>
                        <input
                          name="code6"
                          id="codeBox6"
                          type="text"
                          maxlength="1"
                          value=""
                        />
                      </li>
                    </ul>
                    <button type="submit" className="log-sbmt">
                      {" "}
                      Submit
                    </button>

                    <h4>Did not recieve verification code yet?</h4>
                    <button type="reset" className="otp-reset">
                      <img
                        src={process.env.PUBLIC_URL + "/images/resend.png"}
                        alt=""
                      />
                      Resend verification code
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
