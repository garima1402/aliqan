import React, { useEffect, useState } from "react";
import "./index.css";
function Card() {

  const data = [1, 2, 3, 4, 5];

  return (
    <div>
      <div className="container">
        <div className="heading-wrapper">
          <h2 className="main-text">News</h2>
        </div>

        <div className="card-box">
          {data?.map((item, index) => {
            return (
              <div key={index} className="row">
                <img
                  className="image"
                  src="https://www.eatthis.com/wp-content/uploads/sites/4/2023/03/Fast-food-signature-burgers-taste-test.jpg?quality=82&strip=1&w=640"
                  alt="No_Image"
                />
                <span className="span">
                  <p className="image-name">Hello</p>
                  <span
                    className="icon-span"
                    onClick={() => {
                      console.log("bookmarked");
                    }}
                  >
                    <img
                      className="icon"
                      src="https://static.vecteezy.com/system/resources/thumbnails/005/200/965/small/bookmark-black-color-icon-vector.jpg"
                      alt="icon"
                    />
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Card;
