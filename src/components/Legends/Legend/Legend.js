import React from "react";

export const Legend = () =>(
  <div className="legend">
    <h4>Color Legend</h4>
    <div className="key">
      <span style={{ background: "darkslategray" }}></span> Searched location
    </div>
    <div className="key">
      <span style={{ background: "grey" }}></span> Location Parent Hexes
    </div>
    <div className="key">
      <span style={{ background: "black" }}></span> Offline hotspot
    </div>
    <div className="key">
      <span style={{ background: "#F66F67" }}></span> Invalid witness zone
    </div>
  </div>
);

export default Legend;