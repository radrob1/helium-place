import React from "react";

export default class Legend extends React.Component {
  render() {
    return (
      <div className="legend">
        <h4>Color Legend</h4>
        <div className="key">
          <span style={{ background: "darkslategray" }}></span> Searched location
        </div>
        <div className="key">
          <span style={{ background: "grey" }}></span> Hotspot Parent Hexes
        </div>
        <div className="key">
          <span style={{ background: "black" }}></span> Offline hotspot
        </div>
        <div className="key">
          <span style={{ background: "#F66F67" }}></span> Invalid witness zone
        </div>
        <div className="key">
          <span style={{ background: '#A8C686' }}></span> Sweetspot
        </div>
      </div>
    )
  }
};
