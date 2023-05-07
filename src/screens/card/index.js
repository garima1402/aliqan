import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
// import { useNavigate } from "react-router";
function Card() {
  //   const navigate = useNavigate();
  //   const [title, setTitle] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [bookmark, setBookmark] = useState([]);
  const [idData, setIdData] = useState([]);
  const [idIndivisualData, setIdIndivisualData] = useState([]);

  const getId = () => {
    axios
      .request(
        "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty"
      )
      .then(function (response) {
        console.log(response.data);
        setIdData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const getData = () => {
    idData &&
      idData.map((item) =>
        axios
          .request(
            `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
          )
          .then(function (response) {
            console.log(response.data);
            setIdIndivisualData((idIndivisualData) => [
              ...idIndivisualData,
              response.data,
            ]);
          })
          .catch(function (error) {
            console.error(error);
          })
      );
  };
  console.log(idIndivisualData);

  const bookmarked = (id) => {
    bookmark.forEach(() => {
      let index = bookmark.indexOf(id);
      if (index > -1) {
        bookmark.slice(index, 1);
        console.log("Bookmark removed");
      } else {
        setBookmark((bookmark) => [...bookmark, id]);
        localStorage.setItem("bookmark", bookmark);
        console.log("Bookmark addedd");
      }
    });
  };
  useEffect(() => {
    getId();
    setTimeout(() => {
      getData();
    }, 0);
  }, []);

  return (
    <div>
      <div className="container">
        <div className="heading-wrapper">
          <h2 className="main-text">News</h2>
        </div>

        <div className="card-box">
          {idIndivisualData?.map((item) => {
            return (
              <div key={item.id} className="row">
                <span className="span">
                  <p className="image-name">{item.title}</p>
                  <p className="image-name">{item.text}</p>

                  <span
                    className="icon-span"
                    onClick={() => {
                      bookmarked(item.id);
                      console.log('called');
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
