import React from "react";

export const HexCountLegend = (hexcounts, toggle) => {
  let counts = hexcounts.hexcounts;
  let legendToggle = hexcounts.toggle;
  console.log("locationhexcounts: ", counts)
  if (legendToggle) {
    return (
      <div className="hexcountlegend">
        <h4>Hex Density</h4>
        <div className="key">
          <span></span> Res 10: {counts.res10.count}
        </div>
        <div className="key">
          <span></span> Res 9: {counts.res9.count}
        </div>
        <div className="key">
          <span></span> Res 8: {counts.res8.count}
        </div>
        <div className="key">
          <span></span> Res 7: {counts.res7.count}
        </div>
        <div className="key">
          <span></span> Res 6: {counts.res6.count}
        </div>
        <div className="key">
          <span></span> Res 5: {counts.res5.count}
        </div>
        <div className="key">
          <span></span> Res 4: {counts.res4.count}
        </div>
      </div>
    );
  }
  else {
    return(
    <div></div>
    )
  }
};

export default HexCountLegend;
