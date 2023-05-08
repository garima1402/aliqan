import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

function BookMarked() {
  const [bookmarkData, setBookmarkData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(localStorage.getItem("bookmark"));
    console.log(data);
    getData();
  }, []);

  function getData() {
    data?.map((item) =>
      axios
        .request(
          `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
        )
        .then(function (response) {
          console.log({ bookmarkData });
          console.log(response.data, "bookmarkDataaaaaaaaaa");
          setBookmarkData((bookmarkData) => [...bookmarkData, response.data]);
        })
        .catch(function (error) {
          console.error(error);
        })
    );
  }
  console.log({ bookmarkData });

  return (
    <div>
      <div className="container">
        <div className="heading-wrapper">
          <h2 className="main-text">Bookmarked</h2>
        </div>
        <div className="card-box">
          {bookmarkData?.map((item,index) => {
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
export default BookMarked;
