import React from "react";
import Switch from "react-switch";
import QRCode from "react-qr-code";
export default class Sidebar extends React.Component {

  closeSidebar = (e) => {
    e.preventDefault()
    const sidebar = document.getElementsByClassName('sidebar')[0]
    sidebar.classList.remove('open')
  }

  render() {
    return (
      <div className="sidebar">
        <div className="wrap">
          <section aria-labelledby="slide-over-heading">
            <div className="wrap">
              <div className="content">
                <div className="content-header-wrap">
                  <div className="content-header">
                    <h2 id="slide-over-heading">
                      Map Options
                      </h2>
                    <div className="close-wrap">
                      <button onClick={this.closeSidebar}>
                        <span className="sr-only">Close panel</span>
                        <svg className="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="content-body-wrap">
                  <div className="content-body">
                    <div className="option">
                      <div className="map-styles" onClick={this.props.handleMapStyle}>
                        <label htmlFor="mapstyle">
                          <input type="radio" value={this.props.mapstyles.streets} name="mapstyle" /> Streets
                          </label>
                        <label htmlFor="mapstyle">
                          <input type="radio" value={this.props.mapstyles.light} name="mapstyle" /> Light
                          </label>
                        <label htmlFor="mapstyle">
                          <input type="radio" value={this.props.mapstyles.dark} name="mapstyle" /> Dark
                          </label>
                        <label htmlFor="mapstyle">
                          <input type="radio" value={this.props.mapstyles.satellite} name="mapstyle" /> Satellite
                          </label>
                      </div>
                    </div>
                    <div className="option">
                      <h3 className="option-header toggle">
                        Sweetspot
                          <label htmlFor="material-switch" data-tip data-for="greenzoneTip">
                          <Switch
                            checked={this.props.sweetspotToggle}
                            onChange={this.props.handleSweetspotToggle}
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
                        this.props.device === "computer" && (
                          <p className="option-description">Toggle a green zone that represents an area that should have high chance of being a witness for basic hotspot placement.</p>
                        )
                      }
                    </div>
                    <div className="option">
                      <h3 className="option-header toggle">Location Red Zone
                        <label htmlFor="material-switch" data-tip data-for="toocloseTip">
                          <Switch
                            checked={this.props.locationRedzoneToggle}
                            onChange={this.props.handleLocationRedzoneToggle}
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
                        this.props.device === "computer" && (
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
                              checked={this.props.res6toggle}
                              onChange={this.props.handleRes6Toggle}
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
                              checked={this.props.res7toggle}
                              onChange={this.props.handleRes7Toggle}
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
                              checked={this.props.res8toggle}
                              onChange={this.props.handleRes8Toggle}
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
                              checked={this.props.res9toggle}
                              onChange={this.props.handleRes9Toggle}
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
                              checked={this.props.res10toggle}
                              onChange={this.props.handleRes10Toggle}
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
                    <a target="_blank" rel="noreferrer" href='https://www.nebra.com/?ref=8gcilh0jjjdv' className="ad">
                      <div className="ad-content">
                        <h4 className="title">Want to buy a hotspot?</h4>
                        <p className="description">Try a Nebra Helium Miner</p>
                      </div>
                    </a>
                    <div className="donate">
                      <h4 className="title">Donate Today</h4>
                      {
                        this.props.device === "computer" && (
                          <div>
                            <p>Helium.place is open source. Scan the QR code below or send HNT to <a style={{ color: "blue" }} onClick={() => { navigator.clipboard.writeText("139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp") }}>139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp</a> to support development efforts.</p>
                            <QRCode size={80} value="139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp" style="margin-bottom:1rem;" />
                            <p>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    "139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp"
                                  );
                                }}
                              >
                                Copy address
                              </button>
                            </p>
                          </div>
                        )
                      }
                      {
                        this.props.device === "mobile" && (
                          <div>
                            <p></p>
                            HNT:
                            <a style={{ color: "blue", fontSize: "10px" }} onClick={() => { navigator.clipboard.writeText("139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp") }}>
                              139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp
                            </a>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div >
    );
  }
}
