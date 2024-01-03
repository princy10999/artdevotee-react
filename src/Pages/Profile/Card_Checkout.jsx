import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { ApiGet, ApiPost } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";
import No_Data_Found from "../../Componets/No_data_found/No_Data_Found";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import FormikErrorFocus from "formik-error-focus";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const Gift_Card_Checkout = () => {
  const navigate = useNavigate();
  const currency = useSelector((state) => state?.currency?.currency);
  const calling_code = useSelector((state) => state?.currency?.calling_code);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState({
  //   phonecode: "",
  // });
const [phoneStore, setPhoneStore] = useState("");
  const [addressCheckbox, setAddressCheckbox] = useState(false);
  // const [errors, setError] = useState({});
  const [country, setCountry] = useState([]);
  const [selectBox, setSelectBox] = useState(0);
  const [address, setAddress] = useState([]);
  const [radio, setRadio] = useState("1");
  // var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [show, setShow] = useState(false);
  const [deleteAdd, setDeleteAddress] = useState("");

  const openModal = (e) => {
    setShow(true);
    setDeleteAddress(e);
  };
  const closeModal = () => {
    setShow(false);
    setDeleteAddress({});
  };
  // const validateForm = () => {
  //   let errors = {};
  //   let formIsValid = true;
    // if (!data?.first_name) {
    //   formIsValid = false;
    //   errors["first_name"] = "Please enter your first name";
    // }
    // if (!data?.last_name) {
    //   formIsValid = false;
    //   errors["last_name"] = "Please enter your last name";
    // }
    // if (!data?.email) {
    //   formIsValid = false;
    //   errors["email"] = "Please enter email";
    // } else if (!data?.email.match(validRegex)) {
    //   formIsValid = false;
    //   errors["emails"] = "Invalid email address!";
    // }
    // if (!data?.phone) {
    //   formIsValid = false;
    //   errors["phone"] = "Please enter your phone number";
    // } else if (data?.phone?.length > 11) {
    //   formIsValid = false;
    //   errors["phone_number"] = "Invalid phone number";
    // } else if (data?.phone?.length < 6) {
    //   formIsValid = false;
    //   errors["phone_number2"] = "Invalid phone number";
    // }
    // if (!data?.address) {
    //   formIsValid = false;
    //   errors["address"] = "Please enter your full address";
    // }
    // if (!data?.postcode) {
    //   formIsValid = false;
    //   errors["postcode"] = "Please enter your postcode";
    // }
    // if (!data?.city) {
    //   formIsValid = false;
    //   errors["city"] = "Please enter your city";
    // }
    // if (!data?.state) {
    //   formIsValid = false;
    //   errors["state"] = "Please enter your state";
    // }
    // if (!data?.phonecode) {
    //   formIsValid = false;
    //   errors["phonecode"] = "Please Select your country";
    // }
    // if (!data?.rfname && radio_check === "1") {
    //   formIsValid = false;
    //   errors["rfname"] = "Please enter receiver first name";
    // }
    // if (!data?.rlname && radio_check === "1") {
    //   formIsValid = false;
    //   errors["rlname"] = "Please enter receiver last name";
    // }
    // if (!data?.remail && radio_check === "1") {
    //   formIsValid = false;
    //   errors["remail"] = "Please enter receiver email";
    // } else if (!data?.remail.match(validRegex) && radio_check === "1") {
    //   formIsValid = false;
    //   errors["remails"] = "Invalid email address!";
    // }
  //   setError(errors);

  //   return formIsValid;
  // };
  const getAddress = () => {
    ApiGet("address-list")
      .then((res) => {
        if (res?.data?.details) {
          setAddress(res?.data?.details);
          setInitialValues({
            ...initialValues,
            first_name:res?.data?.details[0]?.first_name,
            last_name:res?.data?.details[0]?.last_name,
            phone:res?.data?.details[0]?.mobile,
            email:res?.data?.details[0]?.email,
            country:country?.filter(e => e?.id === +res?.data?.details[0]?.country)[0]?.name,
            city:res?.data?.details[0]?.city ? res?.data?.details[0]?.city :"",
            postcode:res?.data?.details[0]?.postcode,
            address:res?.data?.details[0]?.address,
            state:res?.data?.details[0]?.state,
          })
        }
      })
      .catch(async (err) => {});
  };
  
  const deleteAddress = () => {
    const body = {
      params: {
        address_id: deleteAdd,
      },
    };
    ApiPost("address-delete", body)
      .then((res) => {
        if (res?.data?.result?.status) {
          closeModal();
          swal({
            title: "Success",
            text: res?.data?.result?.status,
            icon: "success",
          });
          ApiGet("address-list")
            .then((res) => {
              if (res?.data?.details) {
                setAddress(res?.data?.details);
              }
            })
            .catch(async (err) => {});
        }
      })
      .catch(async (err) => {});
  };
  useEffect(() => {
    // document.title = "Artdevotee | Checkout";
    window.scrollTo(0, 0);
    ApiPost("country-list", {})
      .then((res) => {
        if (res?.data?.result) {
          setCountry(res?.data?.result?.country_with_code);
        }
      })
      .catch(async (err) => {});
    }, []);
    useEffect(() => {
      getAddress();
    }, [country]);
  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    postcode: "",
    address: "",
    country: "",
    save: false,
    radios: "1",
    radio_check: false,
  })
console.log("initialValues",initialValues);
  //Subarna 19-10-22
  // const initialValues = {
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   phone: "",
  //   state: "",
  //   city: "",
  //   postcode: "",
  //   address: "",
  //   country: "",
  //   save: false,
  //   radios: "1",
  // };
  // const validationSchema = Yup.object({
  //   radios: Yup.string(),
  //   first_name: Yup.string().when("radios", {
  //     is: "1",
  //     then: Yup.string().required("Please enter your first name!"),
  //   }),
  //   last_name: Yup.string().when("radios", {
  //     is: "1",
  //     then: Yup.string().required("Please enter your last name!"),
  //   }),
  //   email: Yup.string().when("radios", {
  //     is: "1",
  //     then: Yup.string()
  //       .required("Please enter your email address!")
  //       .email("Please enter a valid email address!")
  //       .nullable(),
  //   }),
  //   phone: Yup.string().when("radios", {
  //     is: "1",
  //     then: Yup.string()
  //       .required("Please enter your phone number!")
  //       .matches(/^([0-9\s\-+()]*)$/, "Invalid phone number!")
  //       .min(7, "Phone number must be at least 7 characters!")
  //       .max(15, "Phone number contains maximum 15 characters!"),
  //   }),
  //   country: Yup.string().when("radios", {
  //     is: "1",
  //     then: Yup.string().required("Please select your country!"),
  //   }),
  //   state: Yup.string().when("radios", {
  //     is: "1",
  //     then: Yup.string().required("Please enter your state!"),
  //   }),
  //   city: Yup.string().when("radios", {
  //     is: "1",
  //     then: Yup.string().required("Please enter your city!"),
  //   }),
  //   postcode: Yup.string().when("radios", {
  //     is: "1",
  //     then: Yup.string().required("Please enter your post code!"),
  //   }),
  //   address: Yup.string().when("radios", {
  //     is: "1",
  //     then: Yup.string().required("Please enter your full address!"),
  //   }),
  // });

  const onSubmit = (values, actions) => {
      console.log("values",values,country);
      if(!values?.first_name || !values?.last_name || !values?.address || !values?.state || !values?.country || !values?.postcode || !values?.email || !values?.phone){
        Swal.fire({
          title: "<strong>Warning</strong>",
          icon: "warning",
          html:
            "Please fill up all details from edit profile page " +
            "<a>Click process button</a>" +
            " to open edit profile page.",
          showCancelButton: true,
          confirmButtonText: "Process",
        }).then((result) => {
         if(result.isConfirmed){
          navigate("/edit-profile")
         }
        });
      }else if (values.radios === "1") {
      setLoading(true);
      let formData = new FormData();
      formData.append("billing_fname", values?.first_name);
      formData.append("billing_lname", values?.last_name);
      formData.append("billing_email", values?.email);
      formData.append("billing_phone", values?.phone);
      formData.append("billing_country", country?.filter((e) => e?.name === values?.country)[0]?.id);
      formData.append("billing_state", values?.state);
      formData.append("billing_city", values?.city);
      formData.append("billing_postcode", +values?.postcode);
      formData.append("billing_street_address", values?.address);
      formData.append("is_saved_billing_address", "N");
      formData.append("cart_id", location?.state?.data?.id);
      formData.append("is_saved_address", values?.save ? "Y" : "N");
      formData.append("total_amount", location?.state?.data?.total_amount);
      formData.append("currency_code", calling_code);
      ApiPost("giftcard-order-place", formData)
        .then((res) => {
          // if (res?.data?.message) {
          //   swal({
          //     title: "Success",
          //     text: res?.data?.message,
          //     icon: "success",
          //   });
          //   getAddress();
          //   actions.resetForm();
          //   navigate("/gift-card");
          // }
          if (res?.data?.order && res?.data?.order?.order_number) {
            navigate(`/payment/${res.data.order.order_number}/G`);
          }
          setLoading(false);
        })
        .catch(async (err) => {
          setLoading(false);
        });
      }
    else {
      if (selectBox === 0 && address?.length !== 0 && radio === "2") {
        swal({
          title: "Warning",
          text: "Please Select Address",
          icon: "warning",
        });
      } else if (selectBox !== 0 && address?.length !== 0) {
        setLoading(true);
        let formData = new FormData();
        formData.append("address_book_id", selectBox);
        formData.append("is_saved_billing_address", "Y");
        formData.append("cart_id", location?.state?.data?.id);
        formData.append("is_saved_address", values?.save ? "Y" : "N");
        formData.append("total_amount", location?.state?.data?.total_amount);
        formData.append("currency_code", calling_code);
        ApiPost("giftcard-order-place", formData)
          .then((res) => {
            // if (res?.data?.message) {
            //   swal({
            //     title: "Success",
            //     text: res?.data?.message,
            //     icon: "success",
            //   });
            //   navigate("/gift-card");
            // }
            if (res?.data?.order && res?.data?.order?.order_number) {
              navigate(`/payment/${res.data.order.order_number}/G`);
            }
            setLoading(false);
          })
          .catch(async (err) => {
            setLoading(false);
          });
      } else if (address?.length === 0) {
        swal({
          title: "Warning",
          text: "You currently have no addresses saved.",
          icon: "warning",
        });
        actions.resetForm();
      }
    }
  };
  const selecttedBox = (e) => {
    setSelectBox(selectBox !== e ? e : 0);
  };
  const changeCheckbox = (e, y) => {
    setSelectBox(y?.target?.checked ? e : 0);
    setAddressCheckbox(y?.target?.checked);
  };
  const bbb = country.map((e) => e?.name);
  const bbbb = bbb.filter((e) => {
    if (e?.toLowerCase()?.includes(phoneStore.toLowerCase())) {
      return e;
    }
  });


  return (
    <div>
      <Helmet>
        <title>Gift Card Checkout - Artdevotee</title>
        <meta
            name="description"
            content="Gift Card Checkout - Artdevotee"
        />
        <meta property="og:title" content="Gift Card Checkout - Artdevotee" />
        <meta property="og:description" content="Gift Card Checkout - Artdevotee" />
        <meta property="og:image" content="https://artdevotee.com/preview/dev/images/how-bnr.png" />
        <link rel="canonical" href="https://artdevotee.com/checkout-gift-card" />
      </Helmet>
      {loading && <Loader />}
      <section className="breadcums_section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="bread_uls">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Card Checkout</li>
              </ul>
            </div>
          </div>
          <div className="container"></div>
        </div>
      </section>
      <section className="product-section new_en_sec">
        <div className="container">
          <div className="row no-gutters">
            <div className="check_out_lefts ">
              <div className="product_checkout_infos">
                <div className="checkout_headings">
                  <h2>Payment Details</h2>
                </div>
                <div className="check_subtotal_sec">
                  <div className="sub_total_check">
                    <p>Total Number of Cards</p>
                    <h6>
                      {location?.state?.data?.total_card_quantity
                        ? location?.state?.data?.total_card_quantity
                        : 1}
                    </h6>
                  </div>
                </div>

                {/* {data && ( */}
                {location?.state?.data2 && (
                  <>
                    <ul>
                      {location?.state?.data2?.map((e) => {
                        return (
                          <li>
                            {/* <div className=""> */}
                            <div className="produ_infos border-top py-2 pl-0">
                              <div className="order_details_dash pl-0">
                                <h3 className="pointer">
                                  {e?.get_product_details?.title}{" "}
                                </h3>
                                <div className="dash_pps">
                                  <h5>
                                    {currency &&
                                      currency +
                                        e?.get_gift_card_details?.price}
                                  </h5>
                                </div>
                                <p>
                                  card number:{" "}
                                  {e?.get_gift_card_details?.card_number}
                                </p>
                                <p>
                                  validity days:{" "}
                                  {e?.get_gift_card_details?.validity_days}
                                </p>
                                  <p className="dash_pps">
                                    <h5>
                                      This gift card is a gift for {e?.name}
                                    </h5>
                                  </p>
                              </div>
                            </div>
                            {/* </div> */}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
                {/* {!loading && !data && <No_Data_Found type="gift-cart" />} */}
                {!loading && !location?.state?.data2 && (
                  <No_Data_Found type="gift-cart" />
                )}

                <div className="check_total_sec">
                  <div className="check_pro_totals">
                    <h4>Total Payable Amount : </h4>
                    <p>
                      {currency &&
                        currency + location?.state?.data?.total_amount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="check_out_rights ">
              <div className="product_checkout_infos">
                <div className="checkout_headings">
                  <h2>Billing Information</h2>
                </div>
                <div className="enquiry_forms mt-0">
                  <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                  >
                    {({ values, setFieldValue }) => (
                      <Form>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="input_froms_radio">
                        <label className="text-center w-100 d-block">
                              To update billing information <Link to="/edit-profile">click here </Link>
                            </label>
                              {/* <label
                                className="radio"
                                onClick={() => setRadio("1")}
                              >
                                <input
                                  id="radio1"
                                  type="radio"
                                  name="radios"
                                  value="1"
                                  // onChange={handlerChange}
                                  // checked={data?.radios === "1"}
                                  checked={radio === "1"}
                                  onClick={() => setFieldValue("radios", "1")}
                                />
                                <span className="outer">
                                  <span className="inner"></span>
                                </span>
                                Create New Address
                              </label>
                              <label
                                className="radio"
                                onClick={() => setRadio("2")}
                              >
                                <input
                                  id="radio2"
                                  type="radio"
                                  name="radios"
                                  value="2"
                                  // onChange={handlerChange}
                                  onClick={() => setFieldValue("radios", "2")}
                                />
                                <span className="outer">
                                  <span className="inner"></span>
                                </span>
                                Use Saved Address
                              </label> */}
                            </div>
                            {radio === "2" && address?.length !== 0 && (
                              <label className="mb-3 Note">
                                Note: Select from below
                              </label>
                            )}
                          </div>
                          {radio === "1" && (
                            <>
                              <div className="col-sm-6">
                                <div className="input_froms">
                                  <label>First Name</label>
                                  <Field
                                    type="text"
                                    placeholder="Enter here"
                                    name="first_name"
                                    disabled
                                    //   value={data?.first_name}
                                    //   onChange={handlerChange}
                                  />
                                  {/* <span className="errorInput">
                                {data?.first_name?.length > 0
                                  ? ""
                                  : errors["first_name"]}
                              </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="first_name" />
                                  </span>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input_froms">
                                  <label>Last Name </label>
                                  <Field
                                    type="text"
                                    placeholder="Enter here"
                                    name="last_name"
                                    disabled
                                    //   value={data?.last_name}
                                    //   onChange={handlerChange}
                                  />
                                  {/* <span className="errorInput">
                                {data?.last_name?.length > 0
                                  ? ""
                                  : errors["last_name"]}
                              </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="last_name" />
                                  </span>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input_froms">
                                  <label>Email address </label>
                                  <Field
                                    type="text"
                                    placeholder="Enter here"
                                    name="email"
                                    disabled
                                    //   value={data?.email}
                                    //   onChange={handlerChange}
                                  />
                                  {/* <span className="errorInput">
                                {data?.email?.length > 0 ? "" : errors["email"]}
                              </span>
                              <span className="errorInput">
                                {data?.email.match(validRegex)
                                  ? ""
                                  : errors["emails"]}
                              </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="email" />
                                  </span>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input_froms">
                                  <label>Phone Number</label>
                                  <Field
                                    type="number"
                                    placeholder="Enter here"
                                    name="phone"
                                    disabled
                                    //   value={data?.phone}
                                    //   onChange={handlerChange}
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
                              </div>
                              <div className="col-sm-6">
                                <div className="input_froms">
                                  <label>Country </label>
                                  <Field
                                    type="text"
                                    placeholder="Enter here"
                                    name="country"
                                    disabled
                                    //   value={data?.city}
                                    //   onChange={handlerChange}
                                  />
                                  {/* <a className="sort_open country_input">
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
                                  <ul className="sort_open show_phone_code_list">
                                    {phoneStore &&
                                      [...new Set(bbbb)]?.map((e) => (
                                        <li>
                                          <a
                                            onClick={() => setFieldValue("country", e)}
                                          >
                                            +{e}
                                          </a>
                                        </li>
                                      ))}
                                    {!phoneStore &&
                                      [...new Set(bbb)]?.map((e) => (
                                        <li>
                                          <a
                                            onClick={() => setFieldValue("country", e)}
                                          >
                                            +{e}
                                          </a>
                                        </li>
                                      ))}
                                  </ul>
                                </div> */}
                                  {/* <span className="errorInput">
                                {data?.country?.length > 0
                                  ? ""
                                  : errors["country"]}
                              </span> */}
                                  {/* <span className="errorInput extra_error">
                                  {data?.phonecode?.length > 0 ? "" : errors["phonecode"]}
                                  </span> */}
                                  <span className="errorInput extra_error">
                                    <ErrorMessage name="country" />
                                  </span>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input_froms">
                                  <label>State</label>
                                  <Field
                                    type="text"
                                    placeholder="Enter here"
                                    name="state"
                                    disabled
                                    //   value={data?.state}
                                    //   onChange={handlerChange}
                                  />
                                  {/* <span className="errorInput">
                                {data?.state?.length > 0 ? "" : errors["state"]}
                              </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="state" />
                                  </span>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input_froms">
                                  <label>City</label>
                                  <Field
                                    type="text"
                                    placeholder="Enter here"
                                    name="city"
                                    disabled
                                    //   value={data?.city}
                                    //   onChange={handlerChange}
                                  />
                                  {/* <span className="errorInput">
                                {data?.city?.length > 0 ? "" : errors["city"]}
                              </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="city" />
                                  </span>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input_froms">
                                  <label>Post Code</label>
                                  <Field
                                    type="number"
                                    placeholder="Enter here"
                                    name="postcode"
                                    disabled
                                    //   value={data?.postcode}
                                    //   onChange={handlerChange}
                                  />
                                  {/* <span className="errorInput">
                                {data?.postcode?.length > 0
                                  ? ""
                                  : errors["postcode"]}
                              </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="postcode" />
                                  </span>
                                </div>
                              </div>
                              <div className="col-sm-12">
                                <div className="input_froms">
                                  <label>Full Address</label>
                                  <Field
                                    type="text"
                                    placeholder="Enter here"
                                    name="address"
                                    disabled
                                    //   value={data?.address}
                                    //   onChange={handlerChange}
                                  />
                                  {/* <span className="errorInput">
                                {data?.address?.length > 0
                                  ? ""
                                  : errors["address"]}
                              </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="address" />
                                  </span>
                                </div>
                              </div>

                              {/* <div className="col-sm-12">
                                <div className="forget signer-forget new_check_uls">
                                  <label className="tick">
                                    Save this billing address
                                    <Field
                                      type="checkbox"
                                      name="save"
                                      //  value={data?.save}
                                      //  onChange={handlerChange}
                                    />
                                    <span className="tickmark"></span>
                                  </label>
                                </div>
                              </div> */}
                            </>
                          )}

                          {radio === "2" && (
                            <>
                              {address?.length !== 0 ? (
                                address.map((e) => {
                                  return (
                                    <div className="col-sm-6">
                                      <label
                                        className="tick"
                                        style={{
                                          position: "absolute",
                                          top: "28px",
                                          left: "25px",
                                        }}
                                      >
                                        <input
                                          type="checkbox"
                                          value={addressCheckbox}
                                          onChange={(y) =>
                                            changeCheckbox(e?.id, y)
                                          }
                                          checked={e?.id === selectBox && true}
                                        />
                                        <span className="tickmark address_checkbox"></span>{" "}
                                      </label>
                                      <div
                                        className={`use_saved_box ${
                                          selectBox === e?.id && "selected"
                                        }`}
                                        onClick={() => selecttedBox(e?.id)}
                                      >
                                        <table className="mt-4">
                                          <tr>
                                            <td>Name</td>
                                            <td>
                                              {e?.first_name} {e?.last_name}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>Address</td>
                                            <td>
                                              {e?.address && e?.address + ","}{" "}
                                              {e?.city && e?.city + ","}{" "}
                                              {e?.state}
                                              {e?.postcode && "-" + e?.postcode}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>Phone</td>
                                            <td>{e?.mobile}</td>
                                          </tr>
                                          <tr>
                                            <td>Email</td>
                                            <td>{e?.email}</td>
                                          </tr>
                                        </table>
                                      </div>
                                      <a
                                        className="css-tooltip-top color-blue meet-rvw uu0 prod-del"
                                        onClick={() => openModal(e?.id)}
                                        style={{
                                          position: "absolute",
                                          top: "10px",
                                          right: "25px",
                                        }}
                                      >
                                        {" "}
                                        <span>Delete</span>
                                        <img
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/images/rejectt.png"
                                          }
                                          className="blue-show"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                  );
                                })
                              ) : (
                                <No_Data_Found />
                              )}
                            </>
                          )}
                          {((radio === "2" && address?.length !== 0) ||
                            radio === "1") && (
                            <div className="col-sm-12">
                              <div className="checkout_btns crd-chck-btn">
                                <button
                                  type="submit"
                                  // onClick={radio === "1" ? submitData : submitData2}
                                >
                                  Confirm and Pay
                                </button>
                                {/* <!-- <button  type="submit" className="border_btns">Continue shopping</button>  --> */}
                              </div>
                            </div>
                          )}
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
          </div>
        </div>
      </section>
      <div
        className={`modal fade ${show && "show"}`}
        style={{ display: show ? "block" : "none" }}
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="log-page">
                <div className="container">
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div className="log-page-inr">
                    <div className="login-box">
                      <div className="log-box-top">
                        <div className="loger-top for-got">
                          <h2>Remove Address</h2>
                        </div>
                        <div className="loger-inr">
                          <form action="" role="form">
                            <h3>
                              Are you sure you want to remove this address from
                              the address-list?
                            </h3>
                            <div className="d-flex">
                              <button
                                type="button"
                                className="log-sbmt bg-white text-dark border mt-4 mr-3"
                                onClick={closeModal}
                              >
                                {" "}
                                Cancle
                              </button>
                              <button
                                type="button"
                                className="log-sbmt mt-4"
                                onClick={deleteAddress}
                              >
                                {" "}
                                Remove
                              </button>
                            </div>
                          </form>
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
    </div>
  );
};

export default Gift_Card_Checkout;
