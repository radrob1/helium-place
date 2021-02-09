import React from "react";

const Legend = (props) => {
    return (
        <div id="hex-legend" class="legend">
            <h4>Hex Color Legend</h4>
            <div>
                <span style={{ background: "#0074D9" }}></span>Searched Location
    </div>
            <div>
                <span style={{ background: "black" }}></span>Helium Hotspot
    </div>
            <div>
                <span style={{ background: "#F66F67" }}></span>Too close to witness
    </div>
            {/*<div><span style={{background: 'green'}}></span>Sweet spot</div>*/}
        </div>
    );
};

export default Legend;