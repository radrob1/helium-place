import React from "react";
import Switch from "react-switch";
import './SidebarControls.scss'


const closeSidebar = (e) => {
  e.preventDefault()
  const sidebar = document.getElementsByClassName('sidebar')[0]
  sidebar.classList.remove('open')
}

export const SidebarControls = ({
  handleMapStyle, 
  mapstyles,
  locationRedzoneToggle,
  handleLocationRedzoneToggle,
  device,
  locationHexToggle,
  handleLocationHexToggle,
  res4toggle,
  handleRes4Toggle,
  res5toggle,
  handleRes5Toggle,
  res6toggle,
  handleRes6Toggle,
  res7toggle,
  handleRes7Toggle,
  res8toggle,
  handleRes8Toggle,
  res9toggle,
  handleRes9Toggle,
  res10toggle,
  handleRes10Toggle,
}) => (
  <div className="sidebar">
    <div className="content">
      <div className="content-header">
        <h2 id="slide-over-heading">
          Map Options
        </h2>
        <button className="close-button" onClick={closeSidebar}>
          <span className="sr-only">Close panel</span>
          <svg className="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="content-body">
          <div className="option">
            <div className="map-styles" onClick={handleMapStyle}>
              <label htmlFor="mapstyle">
                <input type="radio" value={mapstyles.streets} name="mapstyle" /> Streets
                </label>
              <label htmlFor="mapstyle">
                <input type="radio" value={mapstyles.light} name="mapstyle" /> Light
                </label>
              <label htmlFor="mapstyle">
                <input type="radio" value={mapstyles.dark} name="mapstyle" /> Dark
                </label>
              <label htmlFor="mapstyle">
                <input type="radio" value={mapstyles.satellite} name="mapstyle" /> Satellite
                </label>
            </div>
          </div>
          <div className="option">
            <h3 className="option-header toggle">Location Red Zone
              <label htmlFor="material-switch" data-tip data-for="toocloseTip">
                <Switch
                  checked={locationRedzoneToggle}
                  onChange={handleLocationRedzoneToggle}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={12}
                  uncheckedIcon={false}
                  checkedIcon={true}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={10}
                  width={25}
                  className="react-switch"
                  id="material-switch" />
              </label>
            </h3>
            {
              device === "computer" && (
                <p className="option-description">Hotspots placed in this area will be too close to participate in proof of coverage.</p>
              )
            }
          </div>
          
          <div className="option">
            <h3 className="option-header toggle">HIP 17 Hex Controls</h3>
            <p className="option-description">The following controls help you visualize the h3 hexagons used by HIP-17. To better understand what these are and why they are important be sure to read the <a href="https://engineering.helium.com/2020/12/09/blockchain-release-hip-17.html">engineering post on HIP 17</a></p>
            <div className="res-toggles">
            <div>
                <label htmlFor="material-switch">
                  <Switch
                    checked={locationHexToggle}
                    onChange={handleLocationHexToggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={12}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={10}
                    width={25}
                    className="react-switch"
                    id="material-switch"
                  />
                  <span className="switch-text">Location Hexes</span>
                </label>
              </div>
              <div>
                <label htmlFor="material-switch">
                  <Switch
                    checked={res4toggle}
                    onChange={handleRes4Toggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={12}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={10}
                    width={25}
                    className="react-switch"
                    id="material-switch"
                  />
                  <span className="switch-text">Res 4</span>
                </label>
              </div>
              <div>
                <label htmlFor="material-switch">
                  <Switch
                    checked={res5toggle}
                    onChange={handleRes5Toggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={12}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={10}
                    width={25}
                    className="react-switch"
                    id="material-switch"
                  />
                  <span className="switch-text">Res 5</span>
                </label>
              </div>
              <div>
                <label htmlFor="material-switch">
                  <Switch
                    checked={res6toggle}
                    onChange={handleRes6Toggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={12}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={10}
                    width={25}
                    className="react-switch"
                    id="material-switch"
                  />
                  <span className="switch-text">Res 6</span>
                </label>
              </div>
              <div>
                <label htmlFor="material-switch">
                  <Switch
                    checked={res7toggle}
                    onChange={handleRes7Toggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={12}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={10}
                    width={25}
                    className="react-switch"
                    id="material-switch"
                  />
                  <span className="switch-text">Res 7</span>
                </label>
              </div>
              <div>
                <label htmlFor="material-switch">
                  <Switch
                    checked={res8toggle}
                    onChange={handleRes8Toggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={12}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={10}
                    width={25}
                    className="react-switch"
                    id="material-switch"
                  />
                  <span className="switch-text">Res 8</span>
                </label>
              </div>
              <div>
                <label htmlFor="material-switch">
                  <Switch
                    checked={res9toggle}
                    onChange={handleRes9Toggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={12}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={10}
                    width={25}
                    className="react-switch"
                    id="material-switch"
                  />
                  <span className="switch-text">Res 9</span>
                </label>
              </div>
              <div>
                <label htmlFor="material-switch">
                  <Switch
                    checked={res10toggle}
                    onChange={handleRes10Toggle}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={12}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={10}
                    width={25}
                    className="react-switch"
                    id="material-switch"
                  />
                  <span className="switch-text">Res 10</span>
                </label>
              </div>
            </div>
          </div>
          <a target="_blank" rel="noreferrer" href='https://rakwireless.kckb.st/070fff89' className="ad">
            <div className="ad-content">
              <h4 className="title">Want to improve your earnings?</h4>
              <p className="description">Try an upgraded antenna from RAK Wireless</p>
            </div>
          </a>
          <a target="_blank" rel="noreferrer" href='https://hotspotty.net' className="ad">
            <div className="ad-content">
              <h4 className="title">Hotspotty</h4>
              <p className="description">Try this awesome hotspot planning tool!</p>
            </div>
          </a>
        </div>
    </div>
  </div >
);

export default SidebarControls;