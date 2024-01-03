import React, { useEffect, useState } from "react";
import { ApiPost } from "../../Api/Api";
import Banner from "../../Componets/Home/Banner";
import Browse_By_Catagory from "../../Componets/Home/Browse_By_Catagory";
import Limited_Offer from "../../Componets/Home/Limited_Offer";
import Popular_Products from "../../Componets/Home/Popular_Products";
import Recently_Added_Product from "../../Componets/Home/Recently_Added_Product";
import { Helmet } from "react-helmet";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [about, setAbout] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    ApiPost("get-home-content", {}).then(async (res) => {
      if (res?.data?.result) {
        setData(res?.data?.result?.home);
        setCategory(res?.data?.result?.category_list);
        setAbout(res?.data?.result?.about);
      }
    });
  }, []);
  useEffect(() => {
    // document.title = "Artdevotee";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <Helmet>
        <title>Artdevotee</title>
        <meta
            name="description"
            content="Visit Artdevotee and Buy unique hand painted wallpapers for your smart phone and laptop at a very affordable price."
        />
        <meta property="og:title" content="Artdevotee" />
        <meta property="og:description" content="Visit Artdevotee and Buy unique hand painted wallpapers for your smart phone and laptop at a very affordable price." />
        <meta property="og:image" content="https://artdevotee.com/preview/dev/images/how-bnr.png" />
        <link rel="canonical" href="https://artdevotee.com/" />
      </Helmet>
      <Banner data={data}/>
      <Recently_Added_Product />
      <Browse_By_Catagory about={about} category={category}/>
      <Popular_Products />
      <Limited_Offer data={data} />
    </>
  );
};

export default Home;
