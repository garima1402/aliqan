import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function BookMarked() {
  const [bookmark, setBookmark] = useState([]);

  let bookmarkedData;
  useEffect(() => {
    bookmarkedData = localStorage.getItem("bookmark");
  }, [bookmarkedData]);
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
  return (
    <div>
      <div className="container">
        <div className="heading-wrapper">
          <h2 className="main-text">Bookmarked</h2>
        </div>
        <div className="card-box">
          {bookmarkedData?.map((item, index) => {
            return (
              <div key={item.id} className="row">
                {/* <span className="span"> */}
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
                    >
                      <img
                        className="icon"
                        src="https://static.vecteezy.com/system/resources/thumbnails/005/200/965/small/bookmark-black-color-icon-vector.jpg"
                        alt="icon"
                      />
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
export default BookMarked;
