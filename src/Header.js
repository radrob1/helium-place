import React, { useState } from "react";

const Header = (props) => {
  return (
    <div className="header">
        <div
                ref={props.geocoderContainerRef}
                style={{position: 'absolute', left: '50%', zIndex: 1}}
        />
        {props.children}
    </div>
  );
};

export default Header;
