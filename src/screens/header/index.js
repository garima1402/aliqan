import React, { useState } from "react";
import "./index.css";
function Header() {
  const [selected, setSelected] = useState(false);
  const handleActive = () => {
    setSelected(!selected);
  };
  return (
    <div className="main-wrapper">
      <div className="header-content">
        <h2 className={selected ? "" : "active"} onClick={() => handleActive()}>
          News
        </h2>
        <h2 className={selected ? "active" : ""} onClick={() => handleActive()}>
          Bookmarked
        </h2>
      </div>
    </div>
  );
}
export default Header;
