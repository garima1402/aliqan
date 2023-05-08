import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
function Card() {
  const navigate = useNavigate();
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
            console.log(response.data,'response');
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
    console.log(id, "idddddddddddd", bookmark);
    // if (bookmark.length) {
    //   bookmark.forEach(() => {
    //     let index = bookmark.indexOf(id);
    //     if (index > -1) {
    //       bookmark.slice(index, 1);
    //       console.log("Bookmark removed");
    //     }
    //   });
    // } else {
      setBookmark((bookmark) => [...bookmark, id]);
      console.log("Bookmark addedd");
      localStorage.setItem("bookmark", bookmark);
    // }
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
          <h2
            className="main-text"
            style={{ marginLeft: "35px", textDecoration: "underline" }}
          >
            News
          </h2>
          <h2 className="main-text" onClick={() => navigate("/bookmarked")}>
            Bookmarked
          </h2>
        </div>

        <div className="card-box">
          {idIndivisualData?.map((item, index) => {
            return (
              <div key={index} className="row">
                <Accordion className="accordian">
                  <AccordionSummary
                    className="sub-text"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>{item.title}</Typography>
                    <span
                      className="icon-span"
                      onClick={() => {
                        bookmarked(item.id);
                        console.log("called");
                      }}
                      style={{ position: "absolute", right: "40px" }}
                    >
                      <BookmarkBorderIcon />
                    </span>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.text}</Typography>
                  </AccordionDetails>
                </Accordion>
                {/* <p className="image-name">{item.title}</p>
                  <p className="image-name">{item.text}</p> */}

                {/* </span> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Card;
