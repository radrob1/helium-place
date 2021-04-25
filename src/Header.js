import React from "react";

export default class Header extends React.Component {

  openSidebar = (e) => {
    e.preventDefault()
    const sidebar = document.getElementsByClassName('sidebar')[0]
    if (sidebar.classList.contains('open')) {
      sidebar.classList.remove('open')
    } else {
      sidebar.classList.add('open')
    }
  }

  openDonatebar = (e) => {
    e.preventDefault()
    const donatebar = document.getElementsByClassName('donatebar')[0]
    if (donatebar.classList.contains('open')) {
      donatebar.classList.remove('open')
    } else {
      donatebar.classList.add('open')
    }
  }

  render() {
    return (
      <div className="header">
        <button className="sidebar-toggle" onClick={this.openSidebar}>
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
        <div ref={this.props.geocoderContainerRef} className="search-wrap"></div>
        <button className="donatebar-toggle" onClick={this.openDonatebar}>
          Help support this site!
          </button>
      </div>
    );
  }
};

