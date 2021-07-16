import React from "react";

export const RewardLegend = () => (
  <div className="rwlegend">
    <h4>Reward Scale</h4>
    <div className="key">
      <span style={{ background: "#1C1AAF" }}></span> 1.0
    </div>
    <div className="key">
      <span style={{ background: "#0066E7" }}></span> 0.9
    </div>
    <div className="key">
      <span style={{ background: "#00FFFF" }}></span> 0.8
    </div>
    <div className="key">
      <span style={{ background: '#FFDA13' }}></span> 0.5
    </div>
    <div className="key">
      <span style={{ background: '#F18009' }}></span> 0.3
    </div>
    <div className="key">
      <span style={{ background: '#D4070F' }}></span> 0.1
    </div>
  </div>
);

export default RewardLegend;