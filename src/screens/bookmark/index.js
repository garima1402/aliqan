import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import "./index.css";
import { Bookmark } from "@mui/icons-material";

function BookMarked() {
  const [bookmarkData, setBookmarkData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("bookmark")));
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [data]);

  function getData() {
    data?.map(
      async (item) =>
        await axios
          .request(
            `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
          )
          .then(function (response) {
            setBookmarkData((bookmarkData) => [...bookmarkData, response.data]);
          })
          .catch(function (error) {
            console.error(error);
          })
    );
  }

  return (
    <div>
      <div className="container">
        <div className="heading-wrapper">
          <h2 className="main-text">Bookmarked</h2>
        </div>
        {bookmarkData.length > 0 ? (
          <div className="card-box">
            {bookmarkData?.map((item, index) => {
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
                        style={{ position: "absolute", right: "40px" }}
                      >
                        <Bookmark />
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
        ) : (
          <div className="data-text">
            <p>No Data Available</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default BookMarked;
