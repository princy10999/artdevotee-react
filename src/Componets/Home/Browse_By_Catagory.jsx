import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import { getFileImage } from "../../Api/Api";
import No_Data_Found from "../No_data_found/No_Data_Found";

const Browse_By_Catagory = ({about,category}) => {
  const navigate = useNavigate();
  return (
    <section className="catagory">
      <div className="container">
        <div className="recnt-head">
          <h2>Browse by catagory</h2>
          <Link to="/search-product">
            View All
            <img src={process.env.PUBLIC_URL + "/images/btn-r8-arw.png"} alt=""/>
          </Link>
        </div>
        <div className="cat-inr">
          {category?.length !== 0 && (
            <div className="cat-row row">
              {category?.map((e, i) => {
                return (
                  <>
                    <div className="col-6 col-sm-3">
                      <a
                        className="cat-box"
                        onClick={() =>
                          navigate("/search-product", {
                            state: {
                              categoryId: e?.id,
                            },
                          })
                        }
                      >
                        <LazyLoadImage 
                        className="filter_img "
                        src={
                          e?.image
                            ? getFileImage(e?.image)
                            : process.env.PUBLIC_URL + "/images/cat-2.png"
                        }
                          loading="lazy"
        alt="Image Alt"
      />
                        <div className="hov-box hov-box-1"></div>
                        <div className="hov-box hov-box-2"></div>
                        <div className="hov-box hov-box-3"></div>
                        <div className="hov-box hov-box-4"></div>
                        <h3>{e?.name}</h3>
                      </a>
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
        {category?.length === 0 && <No_Data_Found />}
        <div className="about">
          <h2>About Artdevotee</h2>
          <p dangerouslySetInnerHTML={{ __html: about }} />
          <Link to="/about-us" className="bnr-btn">
            Read More
            <img src={process.env.PUBLIC_URL + "/images/bnr-btn-arw.png"} alt=""/>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Browse_By_Catagory;
