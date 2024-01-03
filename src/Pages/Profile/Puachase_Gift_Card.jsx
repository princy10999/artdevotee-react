import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidemenu from "../../Componets/Sidemenu/Sidemenu";
import { ApiPost } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";
import { useSelector } from "react-redux";
import No_Data_Found from "../../Componets/No_data_found/No_Data_Found";
import swal from "sweetalert";
import { Helmet } from "react-helmet";

// const arrayData = [
//   {
//     id: 1,
//     price: 100,
//   },
//   {
//     id: 2,
//     price: 200,
//   },
//   {
//     id: 3,
//     price: 300,
//   },
//   {
//     id: 4,
//     price: 400,
//   },
//   {
//     id: 5,
//     price: 500,
//   },
// ];
const Puachase_Gift_Card = () => {
  const currency = useSelector((state) => state?.currency?.currency);
  const calling_code = useSelector((state) => state?.currency?.calling_code);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [curr, setCurr] = useState("");

  const countPlus = (e, i) => {
    let dummy = data?.map((y) => {
      if (e?.id === y?.id) {
        return { ...e, qua: JSON.parse(e?.qua ? e?.qua : 1) + 1 };
      }
      return y;
    });
    setData(dummy);
  };
  const countMinus = (e) => {
    let dummy = data?.map((y) => {
      if (e?.id === y?.id) {
        return { ...e, qua: JSON.parse(e?.qua ? e?.qua : 1) - 1 };
      }
      return y;
    });
    setData(dummy);
  };
  const add_to_cart_gift = (e) => {
    const body = {
      params: {
        giftcard_id: e?.id,
        no_of_cards: e?.qua ? e?.qua : 1,
        price: e?.price,
        currency_code: calling_code,
      },
    };
    ApiPost("add-gcard-to-cart", body)
      .then((res) => {
        if (res?.data?.result) {
          swal({
            title: "Success",
            text: res?.data?.result?.status?.meaning,
            icon: "success",
          });
          navigate("/gift-card-cart");
        }
        setLoading(false);
      })
      .catch(async (err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    // document.title = "Artdevotee | Gift Card";
    window.scrollTo(0, 0);
    const body = {
      params: {
        currency_code: calling_code,
      },
    };
    ApiPost("all-giftcard", body)
      .then((res) => {
        if (res?.data?.result) {
          setData(res?.data?.result?.all_gift_cards);
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
        <title>Purchase Gift Cards - Artdevotee</title>
        <meta
            name="description"
            content="Purchase Gift Cards - Artdevotee"
        />
        <meta property="og:title" content="Purchase Gift Cards - Artdevotee" />
        <meta property="og:description" content="Purchase Gift Cards - Artdevotee" />
        <meta property="og:image" content="https://artdevotee.com/preview/dev/images/how-bnr.png" />
        <link rel="canonical" href="https://artdevotee.com/purchase-gift-card" />
      </Helmet>
      {loading && <Loader />}
      <div className="dashbord_sec">
        <div className="container">
          <div className="dashbord_inr">
            <Sidemenu />
            <div className="dashbord_right">
              <div className="dashbord_right_ir">
                <div className="dash_headings_div hd-wt-btn">
                  <h1>Purchase Gift Cards</h1>
                  <Link className="ml-1" to="/gift-card-cart">
                    View Cart
                  </Link>
                </div>
                <div className="gft-crd-outr">
                  <div className="row">
                    {data?.map((e) => {
                      return (
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                          <div className="gft-crd">
                            <img
                              src={
                                process.env.PUBLIC_URL + "/images/card-bg.PNG"
                              }
                              alt=""
                            />

                            <h5>
                              Card Price: <span>{e?.price}</span>
                            </h5>
                            <div className="d-flex">
                              <div className="counter">
                                <span
                                  className="down"
                                  onClick={() => countMinus(e)}
                                >
                                  -
                                </span>
                                <input
                                  type="text"
                                  value={e?.qua ? e?.qua : 1}
                                />
                                <span className="up" onClick={() => countPlus(e)}>
                                  +
                                </span>
                              </div>
                            </div>
                            <a onClick={() => add_to_cart_gift(e)}>Buy Now</a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {data?.length === 0 && <No_Data_Found />}
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
};

export default Puachase_Gift_Card;
