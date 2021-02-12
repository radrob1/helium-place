import React from "react";

const Header = (props) => {
  return (
    <div className="header">
        <div
                ref={props.geocoderContainerRef}
                style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}
        />
        {props.children}
    </div>
  );
};

export default Header;
