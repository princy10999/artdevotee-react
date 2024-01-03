import React from "react";

const No_Found = () => {
  return (
    <div className="backgound_body">
      <div className="all_error_contents">
        <div className="images">
          <img src={process.env.PUBLIC_URL + "/images/404img.png"} alt=""/>

          <h3>Page Not Found</h3>
          <p>The page you're looking does not seem to exist.</p>
        </div>
      </div>
    </div>
  );
};

export default No_Found;
