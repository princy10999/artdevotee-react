import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ApiGet, getFileImage } from "../../Api/Api";
import Sidemenu from "../../Componets/Sidemenu/Sidemenu";
import { getPosts } from "../../Redux/Apidemo/apiDemoSlice";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currency = useSelector((state) => state?.currency?.currency);
  const userData = JSON.parse(localStorage.getItem("userinfo"));
  const [data, setData] = useState({});
  useEffect(() => {
    // document.title = "Artdevotee | Dashboard";
    window.scrollTo(0, 0);
    if (userData) {
      ApiGet("dashboard", {}).then((res) => {
        if (res?.data) {
          setData(res?.data);
          // dispatch(getPosts());
        }
      });
    }
  }, []);
  return (
    <div>
      <Helmet>
        <title>Dashboard - Artdevotee</title>
        <meta
            name="description"
            content="Dashboard - Artdevotee"
        />
        <meta property="og:title" content="Dashboard - Artdevotee" />
        <meta property="og:description" content="Dashboard - Artdevotee" />
        <meta property="og:image" content="https://artdevotee.com/preview/dev/images/how-bnr.png" />
        <link rel="canonical" href="https://artdevotee.com/dashboard" />
      </Helmet>
      <div className="dashbord_sec">
        <div className="container">
          <div className="dashbord_inr">
            <Sidemenu />
            <div className="dashbord_right">
              <div className="dashbord_right_ir">
                <div className="dash_headings_div">
                  {" "}
                  <h1>Dashboard</h1>
                </div>
                <div className="dashbord_frm">
                  <div className="dasbod_info">
                    <h2>
                      Hi, {userData?.first_name} {userData?.last_name}
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet the consectetur it adipiscing
                      the eiusmod tempor incididunt the caption laibore lorem
                      ipsum dolor aaamet caption consectetur lorem ipsum dolor
                      sit amet consectetur the adipiscing caption.
                    </p>
                  </div>

                  <div className="das_statis">
                    <div className="row">
                      <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                        <div className="das_statis_box">
                          <span>
                            <img
                              src={process.env.PUBLIC_URL + "/images/dasg1.png"}
                              alt=""
                            />
                          </span>
                          <div className="stats_infos pointer"  onClick={() => navigate("/my-order")}>
                            <h2>Total Purchase</h2>
                            <p>{data?.total_order}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                        <div
                          className="das_statis_box pointer"
                          onClick={() => navigate("/my-wishlist")}
                        >
                          <span>
                            <img
                              src={process.env.PUBLIC_URL + "/images/dasg2.png"}
                              alt=""
                            />
                          </span>
                          <div className="stats_infos">
                            <h2>My Wishlist </h2>
                            <p>{data?.wishlist}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                        <div className="das_statis_box">
                          <span>
                            <img
                              src={process.env.PUBLIC_URL + "/images/dasg3.png"}
                              alt=""
                            />
                          </span>
                          <div className="stats_infos">
                            <h2>Last Login</h2>
                            <p>{data?.last_login_date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {data?.total_order !== 0 && (
                    <>
                      <h3 className="das_headingds">Recent Order</h3>
                      <p className="das_headingds44">
                        You can download a product multiple times within 2
                        months from the Order date. The download link would get
                        deactivated after 2 months.{" "}
                      </p>
                      <div className="profile-form meet-page-prof com_pad_tablle payment_areaa">
                        <div className="new-table-mr">
                          <div className="table">
                            <div className="one_row1 hidden-sm-down only_shawo">
                              <div className="cell1 tab_head_sheet">
                                Product Info
                              </div>
                              <div className="cell1 tab_head_sheet">Order on</div>
                              <div className="cell1 tab_head_sheet">Status</div>
                            </div>
                            {/* <div className="one_row1 small_screen31">
                                       <div className="cell1 tab_head_sheet_1 half-boxes">
                                          <span className="W55_1 new_adb">Product Info</span>
                                          <div className="produ_infos">
                                              <span className="squer_boxx">
                                                  <img src={process.env.PUBLIC_URL + "/images/order1.png"} />
                                              </span>
                                              <div className="order_details_dash">
                                                  <h3>Luxura ceramics Sculpture...</h3>
                                                  <p>Order Id : #ABC45000</p>
                                                  <p>Size: 24x16</p>
                                                  <div className="dash_pps"><p>{currency && currency + 1400.00}</p> <h5>{currency && currency + 1000.00}</h5></div>
                                              </div>
                                          </div>
                                       </div>
                                       <div className="cell1 tab_head_sheet_1">
                                          <span className="W55_1">Order on</span>
                                          <p className="add_ttrr">30/07/2022</p>
                                       </div>
                                       
                                       <div className="cell1 tab_head_sheet_1 half-boxes">
                                          <span className="W55_1">Status</span>
                                          <p className="add_ttrr ble_colors">Pending</p>
                                       </div>
                                       
                                    </div>
                                    <div className="one_row1 small_screen31">
                                       <div className="cell1 tab_head_sheet_1 half-boxes">
                                          <span className="W55_1 new_adb">Product Info</span>
                                          <div className="produ_infos">
                                              <span className="squer_boxx">
                                                  <img src={process.env.PUBLIC_URL + "/images/order2.png"} />
                                              </span>
                                              <div className="order_details_dash">
                                                  <h3>Simply dummy product name</h3>
                                                  <p>Product Code: PC08722</p>
                                                  <p>Size: 20x10</p>
                                                  <div className="dash_pps"><p>{currency && currency + 1000.00}</p> <h5>{currency && currency + 900.00}</h5></div>
                                              </div>
                                          </div>
                                       </div>
                                       <div className="cell1 tab_head_sheet_1">
                                          <span className="W55_1">Order on</span>
                                          <p className="add_ttrr">30/07/2022</p>
                                       </div>
                                       
                                       <div className="cell1 tab_head_sheet_1 half-boxes">
                                          <span className="W55_1">Status</span>
                                          <p className="add_ttrr ren_colors">Completed</p>
                                       </div>
                                       
                                    </div> */}
                            {data?.last_order?.map((e) => {
                              return (
                                <div className="one_row1 small_screen31">
                                  <div className="cell1 tab_head_sheet_1 half-boxes">
                                    <span className="W55_1 new_adb">
                                      Product Info
                                    </span>
                                    <div className="produ_infos">
                                      <span
                                        className="squer_boxx pointer"
                                        onClick={() =>
                                          navigate("/order-details", {
                                            state: {
                                              order_master_id: e?.id,
                                            },
                                          })
                                        }
                                      >
                                        <img
                                          src={
                                            e?.get_order_details[0]
                                              ?.get_product_details
                                              ?.get_product_display_images
                                              ?.length !== 0
                                              ? getFileImage(
                                                  e?.get_order_details[0]?.get_product_details?.get_product_display_images
                                                    ?.filter(
                                                      (e) =>
                                                        e?.is_default_display ===
                                                        "1"
                                                    )
                                                    ?.shift()?.thumbnail_image
                                                )
                                              : process.env.PUBLIC_URL +
                                                "/images/default.png"
                                          }
                                          alt=""
                                        />
                                      </span>
                                      <div className="order_details_dash">
                                        <h3
                                          className="pointer"
                                          onClick={() =>
                                            navigate("/order-details", {
                                              state: {
                                                order_master_id: e?.id,
                                              },
                                            })
                                          }
                                        >
                                          {
                                            e?.get_order_details[0]
                                              ?.get_product_details?.title
                                          }
                                        </h3>
                                        <p>Order Id : #{e?.order_number}</p>
                                        <div className="dash_pps">
                                          {e?.get_order_details[0]
                                            ?.unit_price_original &&
                                            e?.get_order_details[0]
                                              ?.unit_price_original !==
                                              e?.get_order_details[0]
                                                ?.total_price && (
                                              <p>
                                                {currency &&
                                                  currency +
                                                    JSON.parse(
                                                      e?.get_order_details[0]
                                                        ?.unit_price_original
                                                    )?.toFixed(2)}
                                              </p>
                                            )}{" "}
                                          <h5>
                                            {currency &&
                                              currency +
                                                (e?.get_order_details[0]
                                                  ?.total_price &&
                                                  JSON.parse(
                                                    e?.get_order_details[0]
                                                      ?.total_price
                                                  )?.toFixed(2))}
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="cell1 tab_head_sheet_1">
                                    <span className="W55_1">Order on</span>
                                    <p className="add_ttrr">{e?.order_date}</p>
                                  </div>

                                  <div className="cell1 tab_head_sheet_1 half-boxes">
                                    <span className="W55_1">Status</span>
                                    {e?.is_paid === "N" && e?.status !== "I" &&(
                                      <p className="add_ttrr red_colors">Failed</p>
                                    )}
                                    {e?.is_paid === "Y" && e?.status !== "I" &&(
                                      <p className="add_ttrr ren_colors">
                                        Complete
                                      </p>
                                    )}
                                    {e?.status === "I" && (
                                      <p className="add_ttrr yel_colors">
                                        Initiated
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
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

export default Dashboard;
