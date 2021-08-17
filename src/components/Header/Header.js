import React from "react";
import "./Header.scss";

export const Header = ({ geocoderContainerRef }) => {

  const openSidebar = (e) => {
    e.preventDefault()
    const sidebar = document.getElementsByClassName('sidebar')[0]
    if (sidebar.classList.contains('open')) {
      sidebar.classList.remove('open')
    } else {
      sidebar.classList.add('open')
    }
  }

  const openDonatebar = (e) => {
    e.preventDefault()
    const donatebar = document.getElementsByClassName('donatebar')[0]
    if (donatebar.classList.contains('open')) {
      donatebar.classList.remove('open')
    } else {
      donatebar.classList.add('open')
    }
  }

    return (
      <div className="header">
        <button className="sidebar-toggle" onClick={openSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor">
            <path strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div ref={geocoderContainerRef} className="search-wrap"></div>
        <button className="donatebar-toggle" onClick={openDonatebar}>
          Help support this site!
          </button>
      </div>
    );
};

export default Header;
