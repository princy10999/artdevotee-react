import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { ApiGet, ApiPost, getFileImage } from "../../Api/Api";
import Loader from "../../Componets/Loader/Loader";
import No_Data_Found from "../../Componets/No_data_found/No_Data_Found";
import { getPosts } from "../../Redux/Apidemo/apiDemoSlice";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import FormikErrorFocus from "formik-error-focus";
import Swal from "sweetalert2";

const Checkout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currency = useSelector((state) => state?.currency?.currency);
    // const [data, setData] = useState({
    //   phonecode: "",
    // });
  const [phoneStore, setPhoneStore] = useState("");
  const [addressCheckbox, setAddressCheckbox] = useState(false)
  const [radio, setRadio] = useState("1");
  // const [errors, setError] = useState({});
  const [country, setCountry] = useState([]);
  const [selectBox, setSelectBox] = useState(0);
  const calling_code = useSelector((state) => state?.currency?.calling_code);
  const [address, setAddress] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteAdd, setDeleteAddress] = useState("");
  // const [radio_check, setRadio_check] = useState("");
  const openModal = (e) => {
    setShow(true);
    setDeleteAddress(e);
  };
  const closeModal = () => {
    setShow(false);
    setDeleteAddress({});
  };
    var validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
  //   const validateForm2 = () => {
  //     let errors = {};
  //     let formIsValid = true;
  //     if (!data?.rfname && radio_check === "1") {
  //       formIsValid = false;
  //       errors["rfname"] = "Please enter receiver first name";
  //     }
  //     if (!data?.rlname && radio_check === "1") {
  //       formIsValid = false;
  //       errors["rlname"] = "Please enter receiver last name";
  //     }
  //     if (!data?.remail && radio_check === "1") {
  //       formIsValid = false;
  //       errors["remail"] = "Please enter receiver email";
  //     } else if (!data?.remail.match(validRegex) && radio_check === "1") {
  //       formIsValid = false;
  //       errors["remails"] = "Invalid email address!";
  //     }
  //     setError(errors);

  //     return formIsValid;
  //   };
  //   const handlerChange = (e) => {
  //     const { name, value } = e?.target;
  //     if (name === "save") {
  //       setData({
  //         ...data,
  //         save: e?.target?.checked,
  //       });
  //     } else if (name === "radio_check") {
  //       if (e?.target?.checked) {
  //         setRadio_check("1");
  //       } else {
  //         setRadio_check("");
  //       }
  //     } else {
  //       setData({
  //         ...data,
  //         [name]: value,
  //       });
  //     }
  //   };
  var totalPrice = location?.state?.coupon?.total_price_after_deduction
    ? location?.state?.coupon?.total_price_after_deduction
    : location?.state?.coupon?.total_price_after_deduction === 0
      ? 0
      : location?.state?.data?.total_after_discount;
  //   const submitData = () => {
  //     window.scrollTo(0, 0);
  //     if (validateForm()) {
  //       setLoading(true);
  //       var formData = new FormData();
  //       formData.append("is_save_address", data?.save ? "Y" : "N");
  //       formData.append("is_saved_billing_address", "N");
  //       formData.append("billing_fname", data?.first_name);
  //       formData.append("billing_lname", data?.last_name);
  //       formData.append("billing_street_address", data?.address);
  //       formData.append("billing_country", data?.country);
  //       formData.append("billing_address_line2", data?.state);
  //       formData.append("billing_city", data?.city);
  //       formData.append("billing_postcode", data?.postcode);
  //       formData.append("billing_email", data?.email);
  //       formData.append("billing_phone", data?.phone);
  //       formData.append("total_amount", totalPrice);
  //       formData.append("is_gift", radio_check === "1" ? "Y" : "N");
  //       {
  //         radio_check === "1" && formData.append("gift_fname", data?.rfname);
  //       }
  //       {
  //         radio_check === "1" && formData.append("gift_lname", data?.rlname);
  //       }
  //       {
  //         radio_check === "1" && formData.append("gift_email", data?.remail);
  //       }
  //       formData.append("currency_code", calling_code);
  //       formData.append(
  //         "total_payable_amount",
  //         location?.state?.data?.total_after_discount
  //       );
  //       formData.append(
  //         "gift_card_id",
  //         location?.state?.coupon?.gcard_details?.id
  //           ? location?.state?.coupon?.gcard_details?.id
  //           : ""
  //       );
  //       formData.append(
  //         "coupon_code",
  //         location?.state?.coupon?.coupon_details?.id
  //           ? location?.state?.coupon?.coupon_details?.id
  //           : ""
  //       );
  //       ApiPost("order-place", formData)
  //         .then((res) => {
  //           if (res?.data?.order) {
  //             swal({
  //               title: "Success",
  //               text: res?.data?.message,
  //               icon: "success",
  //             });
  //             dispatch(getPosts());
  //             navigate("/my-order");
  //           }
  //           setLoading(false);
  //         })
  //         .catch(async (err) => {
  //           setLoading(false);
  //         });
  //     }
  //   };
  //   const submitData2 = () => {
  //     window.scrollTo(0, 0);
  //     if (selectBox === 0 && address?.length !== 0) {
  //       swal({
  //         title: "Warning",
  //         text: "Please Select Address",
  //         icon: "warning",
  //       });
  //       setData({
  //         ...data,
  //         radios: "1",
  //       });
  //     } else if (selectBox !== 0 && address?.length !== 0 && validateForm2()) {
  //       setLoading(true);
  //       var formData = new FormData();
  //       formData.append("is_saved_billing_address", "Y");
  //       formData.append("address_book_id", selectBox);
  //       formData.append("total_amount", totalPrice);
  //       formData.append("currency_code", calling_code);
  //       formData.append("is_gift", radio_check === "1" ? "Y" : "N");
  //       {
  //         radio_check === "1" && formData.append("gift_fname", data?.rfname);
  //       }
  //       {
  //         radio_check === "1" && formData.append("gift_lname", data?.rlname);
  //       }
  //       {
  //         radio_check === "1" && formData.append("gift_email", data?.remail);
  //       }
  //       formData.append(
  //         "total_payable_amount",
  //         location?.state?.data?.total_after_discount
  //       );
  //       formData.append(
  //         "gift_card_id",
  //         location?.state?.coupon?.gcard_details?.id
  //           ? location?.state?.coupon?.gcard_details?.id
  //           : ""
  //       );
  //       formData.append(
  //         "coupon_code",
  //         location?.state?.coupon?.coupon_details?.id
  //           ? location?.state?.coupon?.coupon_details?.id
  //           : ""
  //       );
  //       ApiPost("order-place", formData)
  //         .then((res) => {
  //           if (res?.data?.order) {
  //             swal({
  //               title: "Success",
  //               text: res?.data?.message,
  //               icon: "success",
  //             });
  //             dispatch(getPosts());
  //             navigate("/my-order");
  //           }
  //           setLoading(false);
  //         })
  //         .catch(async (err) => {
  //           setLoading(false);
  //         });
  //     } else if (address?.length === 0) {
  //       swal({
  //         title: "Warning",
  //         text: "Address not available",
  //         icon: "warning",
  //       });
  //       setData({
  //         ...data,
  //         radios: "1",
  //       });
  //     }
  //   };
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
            .catch(async (err) => { });
        }
      })
      .catch(async (err) => { });
  };
  useEffect(() => {
    document.title = "Artdevotee | Checkout";
    window.scrollTo(0, 0);
    setLoading(true);
   
    ApiGet("address-list")
      .then((res) => {
        setLoading(false);

        if (res?.data?.details) {
          setAddress(res?.data?.details);
          setInitialValues({
            ...initialValues,
            first_name:res?.data?.details[0]?.first_name,
            last_name:res?.data?.details[0]?.last_name,
            mobile:res?.data?.details[0]?.mobile,
            email:res?.data?.details[0]?.email,
            country:country?.filter(e => JSON.stringify(e?.id) === res?.data?.details?.[0]?.country)?.[0]?.name,
            city:res?.data?.details[0]?.city ? res?.data?.details[0]?.city :"",
            postcode:res?.data?.details[0]?.postcode,
            address:res?.data?.details[0]?.address,
            state:res?.data?.details[0]?.state,
          })
        }
      })
      .catch(async (err) => {
        setLoading(false);
      });
  }, [country]);
  useEffect(() => {
    ApiPost("country-list", {})
    .then((res) => {
      setLoading(false);
      if (res?.data?.result) {
        setCountry(res?.data?.result?.country_with_code)
        //  setCountry(res?.data?.result?.country_list);
      }
    })
    .catch(async (err) => {
      setLoading(false);
    });
  }, []);
  const openDetailsPage = (e) => {
    navigate(`/product-detail/${e?.get_product_details?.slug}`, {
      state: { image: e?.get_product_details?.get_product_display_images },
    });
  };
  //Subarna 19-10-22
  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    state: "",
    city: "",
    postcode: "",
    address: "",
    country: "",
    save: false,
    radios: "1",
    radio_check: false,
    rfname: "",
    remail: "",
    rlname: "",
  })
  console.log("initialValues",initialValues);
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
  //   radio_check: false,
  //   rfname: "",
  //   remail: "",
  //   rlname: "",
  // };

  const validationSchema = Yup.object({
    // radios: Yup.string(),
    // first_name: Yup.string().when("radios", {
    //   is: "1",
    //   then: Yup.string().required("Please enter your first name!"),
    // }),
    // last_name: Yup.string().when("radios", {
    //   is: "1",
    //   then: Yup.string().required("Please enter your last name!"),
    // }),
    // email: Yup.string().when("radios", {
    //   is: "1",
    //   then: Yup.string()
    //     .required("Please enter your email address!")
    //     .email("Please enter a valid email address!")
    //     .nullable(),
    // }),
    // mobile: Yup.string().when("radios", {
    //   is: "1",
    //   then: Yup.string()
    //     .required("Please enter your phone number!")
    //     .matches(/^([0-9\s\-+()]*)$/, "Invalid phone number!")
    //     .min(7, "Phone number must be at least 7 characters!")
    //     .max(15, "Phone number contains maximum 15 characters!"),
    // }),
    // country: Yup.string().when("radios", {
    //   is: "1",
    //   then: Yup.string().required("Please select your country!"),
    // }),
    // state: Yup.string().when("radios", {
    //   is: "1",
    //   then: Yup.string().required("Please enter your state!"),
    // }),
    // city: Yup.string().when("radios", {
    //   is: "1",
    //   then: Yup.string().required("Please enter your city!"),
    // }),
    // postcode: Yup.string().when("radios", {
    //   is: "1",
    //   then: Yup.string().required("Please enter your post code!"),
    // }),
    // address: Yup.string().when("radios", {
    //   is: "1",
    //   then: Yup.string().required("Please enter your full address!"),
    // }),
    // radio_check: Yup.boolean(),
    rfname: Yup.string().when("radio_check", {
      is: true,
      then: Yup.string().required("Please enter receiver first name!"),
    }),
    remail: Yup.string().when("radio_check", {
      is: true,
      then: Yup.string()
        .required("Please enter your receiver email address!")
        .email("Please enter a valid email address!")
        .nullable(),
    }),
    rlname: Yup.string().when("radio_check", {
      is: true,
      then: Yup.string().required("Please enter receiver last name!"),
    }),
  });
  const onSubmit = async (values, actions) => {
    console.log("values",values);
    if(!values?.first_name || !values?.last_name || !values?.address || !values?.state || !values?.country || !values?.postcode || !values?.email || !values?.mobile){
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
      formData.append("is_save_address", values?.save ? "Y" : "N");
      formData.append("is_saved_billing_address", "N");
      formData.append("billing_fname", values?.first_name);
      formData.append("billing_lname", values?.last_name);
      formData.append("billing_street_address", values?.address);
      formData.append("billing_country", country?.filter((e) => e?.name === values?.country)[0]?.id);
      formData.append("billing_address_line2", values?.state);
      formData.append("billing_city", values?.city);
      formData.append("billing_postcode", values?.postcode);
      formData.append("billing_email", values?.email);
      formData.append("billing_phone", values?.mobile);
      formData.append("total_amount", totalPrice);
      formData.append("is_gift", values.radio_check === true ? "Y" : "N");
      {
        values.radio_check === true &&
          formData.append("gift_fname", values?.rfname);
      }
      {
        values.radio_check === true &&
          formData.append("gift_lname", values?.rlname);
      }
      {
        values.radio_check === true &&
          formData.append("gift_email", values?.remail);
      }
      formData.append("currency_code", calling_code);
      formData.append(
        "total_payable_amount",
        location?.state?.data?.total_after_discount
      );
      formData.append(
        "gift_card_id",
        location?.state?.coupon?.gcard_details?.id
          ? location?.state?.coupon?.gcard_details?.id
          : ""
      );
      formData.append(
        "coupon_code",
        location?.state?.coupon?.coupon_details?.id
          ? location?.state?.coupon?.coupon_details?.id
          : ""
      );
      ApiPost("order-place", formData)
        .then((res) => {
          if (res?.data?.order && res?.data?.order?.order_number) {
            dispatch(getPosts());
            navigate(`/payment/${res.data.order.order_number}/O`);
          }
          setLoading(false);
        })
        .catch(async (err) => {
          setLoading(false);
        });
    }else if (selectBox === 0 && address?.length !== 0 && radio === "2") {
      swal({
        title: "Warning",
        text: "Please Select Address",
        icon: "warning",
      });
      // actions.resetForm();
    } else if (selectBox !== 0 && address?.length !== 0) {
      setLoading(true);
      let formData = new FormData();
      formData.append("is_saved_billing_address", "Y");
      formData.append("address_book_id", selectBox);
      formData.append("total_amount", totalPrice);
      formData.append("currency_code", calling_code);
      formData.append("is_gift", values.radio_check === true ? "Y" : "N");
      {
        values.radio_check === true &&
          formData.append("gift_fname", values?.rfname);
      }
      {
        values.radio_check === true &&
          formData.append("gift_lname", values?.rlname);
      }
      {
        values.radio_check === true &&
          formData.append("gift_email", values?.remail);
      }
      formData.append(
        "total_payable_amount",
        location?.state?.data?.total_after_discount
      );
      formData.append(
        "gift_card_id",
        location?.state?.coupon?.gcard_details?.id
          ? location?.state?.coupon?.gcard_details?.id
          : ""
      );
      formData.append(
        "coupon_code",
        location?.state?.coupon?.coupon_details?.id
          ? location?.state?.coupon?.coupon_details?.id
          : ""
      );

      ApiPost("order-place", formData)
        .then((res) => {
          if (res?.data?.order && res?.data?.order?.order_number) {
            dispatch(getPosts());
            navigate(`/payment/${res.data.order.order_number}/O`);
          }
          setLoading(false);
        })
        .catch(async (err) => {
          setLoading(false);
        });
      }
    else if (address?.length === 0) {
      swal({
        title: "Warning",
        text: "You currently have no addresses saved.",
        icon: "warning",
      });
      actions.resetForm();
    }
  };
  //Subarna 19-10-22
  const selecttedBox = (e) => {
    setSelectBox(selectBox !== e ? e : 0)
  }
  const changeCheckbox = (e,y) => {
    setSelectBox(y?.target?.checked ? e : 0)
    setAddressCheckbox(y?.target?.checked)
  }
  const bbb = country.map((e) => e?.name);
  const bbbb = bbb.filter((e) => {
    if (e?.toLowerCase()?.includes(phoneStore.toLowerCase())) {
      return e;
    }
  });

  return (
    <div>
      {loading && <Loader />}
      <section className="breadcums_section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="bread_uls">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="product-section new_en_sec">
        <div className="container">
          <div className="row no-gutters">
            <div className="check_out_lefts">
              <div className="product_checkout_infos">
                <div className="checkout_headings">
                  <h2>Product Information</h2>
                </div>
                <div className="details_order_prod_info">
                  {location?.state?.data?.get_cart_details?.length !== 0 ? (
                    location?.state?.data?.get_cart_details?.map((e) => {
                      return (
                        <div className="produ_infos">
                          <span className="squer_boxx">
                            <img
                              className="pointer"
                              src={
                                e?.get_product_details
                                  ?.get_product_display_images?.length !== 0
                                  ? getFileImage(
                                    e?.get_product_details?.get_product_display_images
                                      ?.filter(
                                        (e) => e?.is_default_display === "1"
                                      )
                                      ?.shift()?.thumbnail_image
                                  )
                                  : process.env.PUBLIC_URL +
                                  "/images/default.png"
                              }
                              onClick={() => openDetailsPage(e)}
                              alt=""
                            />
                          </span>
                          <div className="order_details_dash">
                            <h3
                              className="pointer"
                              onClick={() => openDetailsPage(e)}
                            >
                              {e?.get_product_details?.title}
                              {/* {e?.get_product_details?.get_product_display_images?.filter(e => e?.is_default_display === "1")?.shift()?.get_size?.size} */}
                            </h3>
                            <p>
                              Product Code: {e?.get_product_details?.product_id}
                            </p>
                            {/* <p>Size: {e?.get_product_details?.get_product_display_images?.filter(e => e?.is_default_display === "1")?.shift()?.get_size?.size}</p> */}
                            <div className="dash_pps">
                              <p>
                                {currency &&
                                  e?.get_product_details?.get_product_price?.filter(
                                    (e) => e?.get_currency?.symbol === currency
                                  )[0]?.global_offer_applied === "Y"
                                  ? currency &&
                                  currency +
                                  e?.get_product_details?.get_product_price?.filter(
                                    (e) =>
                                      e?.get_currency?.symbol === currency
                                  )[0]?.price
                                  : e?.get_product_details?.get_product_price?.filter(
                                    (e) =>
                                      e?.get_currency?.symbol === currency
                                  )[0]?.discount &&
                                  currency +
                                  e?.get_product_details?.get_product_price?.filter(
                                    (e) =>
                                      e?.get_currency?.symbol === currency
                                  )[0]?.price}
                              </p>
                              <h5>
                                {currency &&
                                  currency +
                                  (e?.get_product_details?.get_product_price?.filter(
                                    (e) =>
                                      e?.get_currency?.symbol === currency
                                  )[0]?.global_offer_applied === "Y"
                                    ? e?.get_product_details?.get_product_price?.filter(
                                      (e) =>
                                        e?.get_currency?.symbol === currency
                                    )[0]?.after_discount_price
                                    : e?.get_product_details?.get_product_price?.filter(
                                      (e) =>
                                        e?.get_currency?.symbol === currency
                                    )[0]?.discount
                                      ? e?.get_product_details?.get_product_price?.filter(
                                        (e) =>
                                          e?.get_currency?.symbol === currency
                                      )[0]?.after_discount_price
                                      : e?.get_product_details?.get_product_price?.filter(
                                        (e) =>
                                          e?.get_currency?.symbol === currency
                                      )[0]?.price
                                        ? e?.get_product_details?.get_product_price?.filter(
                                          (e) =>
                                            e?.get_currency?.symbol === currency
                                        )[0]?.price
                                        : 0)}
                              </h5>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <No_Data_Found />
                  )}
                </div>
              </div>

              <div className="product_checkout_infos">
                <div className="checkout_headings">
                  <h2>Payment Details</h2>
                </div>
                <div className="check_subtotal_sec">
                  <div className="sub_total_check">
                    <p>Subtotal</p>
                    <h6>
                      {currency &&
                        currency + location?.state?.data?.total_before_discount}
                    </h6>
                  </div>
                  <div className="sub_total_check">
                    <p>Discount</p>
                    <h6>
                      {currency &&
                        currency +
                        (
                          location?.state?.data?.total_before_discount -
                          totalPrice
                        )?.toFixed(2)}
                    </h6>
                  </div>
                </div>
                <div className="check_total_sec">
                  <div className="check_pro_totals">
                    <h4>Total Payable Amount : </h4>
                    <p>
                      {currency &&
                        currency + JSON.parse(totalPrice)?.toFixed(2)}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="check_out_rights">
              <div className="product_checkout_infos">
                <div className="checkout_headings">
                  <h2>Billing Information</h2>
                </div>
                <div className="enquiry_forms mt-0">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                  >
                    {({ values, setFieldValue }) => (
                      <Form>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="input_froms_radio ">
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
                                  onClick={() => setFieldValue("radios", "1")}
                                  checked={radio === "1"}
                                />
                                <span className="outer">
                                  <span className="inner"></span>
                                </span>
                                Create New Address
                              </label> */}
                              {/* <label
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
                            {radio === "2" && address?.length !== 0 && <label className="mb-3 Note">Note: Select from below</label>}
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
                                    name="mobile"
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
                                    <ErrorMessage name="mobile" />
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
                                  />
                                  {/* <a className="sort_open country_input">
                                  {values?.country ? values?.country : "select"}
                                </a>
                                      <div className="sort_lst show_phone_code show_checkout_code ">
                                  <input
                                  disabled
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
                              {/* {radio === "1" && (
                                <div className="col-sm-12">
                                  <div className="forget signer-forget new_check_uls">
                                    <label className="tick">
                                      Save this billing address
                                      <Field
                                        type="checkbox"
                                        name="save"
                                      // value={data?.save}
                                      // onChange={handlerChange}
                                      />
                                      <span className="tickmark"></span>
                                    </label>
                                  </div>
                                </div>
                              )} */}
                            </>
                          )}

                          {radio === "2" && (
                            <>
                              {address?.length !== 0 ? (
                                address.map((e) => {
                                  return (
                                    <div className="col-sm-6">

                                        <label className="tick" style={{
                                          position: "absolute",
                                          top: "28px",
                                          left: "25px",
                                        }}>
                                          <input
                                            type="checkbox"
                                            value={addressCheckbox}
                                            onChange={(y) => changeCheckbox(e?.id,y)}
                                            checked={e?.id === selectBox && true}
                                          />
                                          <span className="tickmark address_checkbox" ></span> </label>
                                      <div
                                        className={`use_saved_box ${selectBox === e?.id && "selected"
                                          }`}
                                        onClick={() => selecttedBox(e?.id)}
                                      >
                                        
                                        <table className="mt-4">
                                          <tr>
                                            <td>Name</td>
                                            <td
                                              style={{ paddingRight: "34px" }}
                                            >
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
                         {(!location?.state?.coupon?.gcard_details?.id && !location?.state?.coupon?.coupon_details?.id) && <>
                          {(radio === "1" ||
                            (radio === "2" && address?.length !== 0)) && (
                              <div className="col-sm-12">
                                <div className="forget signer-forget new_check_uls">
                                  <label className="tick">
                                    Gift to Other
                                    <Field
                                      type="checkbox"
                                      name="radio_check"
                                      //   value="3"
                                      //   onChange={handlerChange}
                                      onChange={() => {
                                        setFieldValue(
                                          "radio_check",
                                          !values.radio_check
                                        );
                                        if (values.radio_check == false) {
                                          setFieldValue("rfname", "");
                                          setFieldValue("rlname", "");
                                          setFieldValue("remail", "");
                                        }
                                      }}
                                    />
                                    <span className="tickmark"></span>
                                  </label>
                                </div>
                              </div>
                            )}
                            </>}
                          {values.radio_check === true && (
                            <>
                              <div className="col-sm-6">
                                <div className="input_froms">
                                  <label>Receiver first name</label>
                                  <Field
                                    type="text"
                                    placeholder="Enter here"
                                    name="rfname"
                                  //   value={data?.rfname}
                                  //   onChange={handlerChange}
                                  />
                                  {/* <span className="errorInput">
                                {data?.rfname?.length > 0
                                  ? ""
                                  : errors["rfname"]}
                              </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="rfname" />
                                  </span>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input_froms">
                                  <label>Receiver last name</label>
                                  <Field
                                    type="text"
                                    placeholder="Enter here"
                                    name="rlname"
                                  //   value={data?.rlname}
                                  //   onChange={handlerChange}
                                  />
                                  {/* <span className="errorInput">
                                {data?.rlname?.length > 0
                                  ? ""
                                  : errors["rlname"]}
                              </span> */}
                                  <span className="errorInput">
                                    <ErrorMessage name="rlname" />
                                  </span>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="input_froms">
                                  <label>Receiver email</label>
                                  <Field
                                    type="text"
                                    placeholder="Enter here"
                                    name="remail"
                                  //   value={data?.remail}
                                  //   onChange={handlerChange}
                                  />
                                   {values?.remail?.match(validRegex) && <h6 className="">Is the recipient’s email id please entered correct</h6>}
                                  {/* <span className="errorInput h_20check">
                                {data?.remail?.length > 0
                                  ? ""
                                  : errors["remail"]}
                              </span>
                              <span className="errorInput h_20check">
                                {data?.remail.match(validRegex)
                                  ? ""
                                  : errors["remails"]}
                              </span> */}
                                  <span className="errorInput h_20check">
                                    <ErrorMessage name="remail" />
                                  </span>
                                </div>
                              </div>
                            </>
                          )}
                          <div className="col-sm-12">
                            <div className="checkout_btns">
                              <button
                                type="submit"
                              //  onClick={radio === "1" ? submitData : submitData2}
                              >
                                Confirm and Pay
                              </button>
                              {/* <Link to="/search-product"> */}
                              <button
                                className="border_btns"
                                onClick={() => navigate("/search-product")}
                              >
                                Continue shopping
                              </button>
                              {/* </Link>  */}
                            </div>
                          </div>
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

export default Checkout;
