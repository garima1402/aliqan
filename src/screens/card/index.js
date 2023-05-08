import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore, BookmarkBorder } from "@mui/icons-material";
import { useNavigate } from "react-router";
function Card() {
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState([]);
  const [idData, setIdData] = useState([]);
  const [idIndivisualData, setIdIndivisualData] = useState([]);

  const getId = async () => {
    await axios
      .request(
        "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty"
      )
      .then(function (response) {
        setIdData(response.data);
      })
      .catch(function (error) {
      });
  };
  const getData = () => {
    idData &&
      idData.map(
        async (item) =>
          await axios
            .request(
              `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
            )
            .then(function (response) {
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

  const bookmarked = (id) => {
    var index = bookmark.indexOf(id);
    if (bookmark.length) {
      bookmark.forEach(() => {
        if (index > -1) {
          bookmark.slice(index, 1);
          alert("BookMark Removed");
        } else {
          setBookmark((bookmark) => [...bookmark, id]);
          localStorage.setItem("bookmark", JSON.stringify(bookmark));
          alert("BookMark Added");
        }
      });
    } else {
      setBookmark((bookmark) => [...bookmark, id]);
      localStorage.setItem("bookmark", JSON.stringify(bookmark));
      alert("BookMark Added");
    }
  };
  useEffect(() => {
    getId();
    setTimeout(() => {
      getData();
    }, 0);
  }, []);

  useEffect(() => {
    getData();
  }, [idData]);

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
                    expandIcon={<ExpandMore />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>{item.title}</Typography>
                    <span
                      className="icon-span"
                      onClick={() => {
                        bookmarked(item.id);
                      }}
                      style={{ position: "absolute", right: "40px" }}
                    >
                      <BookmarkBorder />
                    </span>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.text}</Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Card;
