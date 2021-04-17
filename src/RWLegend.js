import React from "react";

export default class RWLegend extends React.Component {
  render() {
    return (
      <div className="rwlegend">
        <h4>Reward Scale</h4>
        <div className="key">
          <span style={{ background: "#09B851" }}></span> 1.0
        </div>
        <div className="key">
          <span style={{ background: "#0521EB" }}></span> 0.9
        </div>
        <div className="key">
          <span style={{ background: "#00FFFF" }}></span> 0.8
        </div>
        <div className="key">
          <span style={{ background: '#F1C40F' }}></span> 0.5
        </div>
        <div className="key">
          <span style={{ background: '#FFA500' }}></span> 0.3
        </div>
        <div className="key">
          <span style={{ background: '#CA0926' }}></span> 0.1
        </div>
      </div>
    )
  }
};
