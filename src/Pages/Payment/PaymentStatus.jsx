import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPosts } from "../../Redux/Apidemo/apiDemoSlice";

function PaymentStatus() {
  const params = useParams();
  const dispatch = useDispatch()
  const getUserData = JSON.parse(localStorage.getItem("userinfo"));

  useEffect(() => {
    document.title = "Artdevotee | Payment Status";
    window.scrollTo(0, 0);
    // getUserData && dispatch(getPosts());
  }, []);
  return (
    <div className="log-page">
      <div className="goto-login">
        <div className="">
          {params.stat === "F" ? (
            <div className="paystat">
              <img
                src={process.env.PUBLIC_URL + "/images/failure.png"}
                alt=""
              />
              <h2>Error</h2>
              <h5>Your Payment is failed. Please try again later.</h5>
              <Link to={params.type==="O"?"/my-order":"/gift-card"}>{params.type==="O"?"View your Orders":"View your gift cards"}</Link>
            </div>
          ) : (
            <div className="paystat">
              <img
                src={process.env.PUBLIC_URL + "/images/success.png"}
                alt=""
              />
              <h2>Success !</h2>
              <h5>Your Payment is Successfull.</h5>
              <Link to={params.type==="O"?"/my-order":"/gift-card"}>{params.type==="O"?"View your Orders":"View your gift cards"}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentStatus;
