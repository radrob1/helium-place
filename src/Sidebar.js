import React from 'react';
import { push as Menu } from 'react-burger-menu';
import Switch from "react-switch";
import QRCode from "react-qr-code";
import ReactTooltip from "react-tooltip";
import { MdInfo } from "react-icons/md"
import "react-responsive-modal/styles.css";

export default props => {
    return (
        <Menu width={250} noOverlay itemListElement="div">
            <div>
                <h2>Map Options</h2>
                <span><b>Map Style</b></span>
                <div onChange={props.handleMapStyle}>
                    <tbody>
                        <tr>
                            <td>
                                <input type="radio" value={props.mapstyles.streets} name="mapstyle" /> Streets
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" value={props.mapstyles.light} name="mapstyle" /> Light
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" value={props.mapstyles.satellite} name="mapstyle" /> Satellite
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" value={props.mapstyles.dark} name="mapstyle" /> Dark
                            </td>
                        </tr>
                    </tbody>
                </div>
                <p></p>
                <div >
                    <span>Sweetspot Area </span>
                    <label htmlFor="material-switch" data-tip data-for="greenzoneTip">
                        <Switch
                            checked={props.sweetspotToggle}
                            onChange={props.handleSweetspotToggle}
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
                            id="material-switch"
                        />
                    </label>
                    <ReactTooltip id="greenzoneTip" place="top" type="light" effect="solid" clickable={true}>
                        Anything in this area should have a high percentage chance of being witnessed with stock setups.
                    </ReactTooltip>
                </div>
                <div>
                    <span>Location Red Zone </span>
                    <label htmlFor="material-switch" data-tip data-for="toocloseTip">
                        <Switch
                            checked={props.locationRedzoneToggle}
                            onChange={props.handleLocationRedzoneToggle}
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
                            id="material-switch"
                        />
                    </label>
                    <ReactTooltip id="toocloseTip" place="top" type="light" effect="solid" clickable={true}>
                        Anything in this area is too close to witness and cannot participate in POC.
                    </ReactTooltip>
                </div>
                <div>
                    <span>All Red Zones </span>
                    <label htmlFor="material-switch" data-tip data-for="redzoneWarning">
                        <Switch
                            checked={props.redzoneToggle}
                            onChange={props.handleRedzoneToggle}
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
                            id="material-switch"
                        />
                        <ReactTooltip id="redzoneWarning" place="top" type="error" effect="solid">
                            Warning: This may slow down the map.
                            <br></br>This will display all nearby hotspot areas that are too close for them to witness.
                            <p>Note: Location must be set first. </p>
                        </ReactTooltip>
                    </label>
                </div>
                <p></p>
                <div>
                    <b data-tip data-for="hip17Tip" data-event="click">Advanced &nbsp;<MdInfo /></b>
                    <ReactTooltip id="hip17Tip" place="top" type="error" effect="solid" clickable={true}>
                        Please read HIP17 in depth before using these options.
                        <p>
                            <a href="https://engineering.helium.com/2020/12/09/blockchain-release-hip-17.html">
                                https://engineering.helium.com/2020/12/09/blockchain-release-hip-17.html
                            </a>
                        </p>

                    </ReactTooltip>
                    <div>
                        <span>Res 6 </span>
                        <label htmlFor="material-switch">
                            <Switch
                                checked={props.res6toggle}
                                onChange={props.handleRes6Toggle}
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
                        </label>
                    </div>
                    <div>
                        <span>Res 7 </span>
                        <label htmlFor="material-switch">
                            <Switch
                                checked={props.res7toggle}
                                onChange={props.handleRes7Toggle}
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
                        </label>
                    </div>
                    <div>
                        <span>Res 8 </span>
                        <label htmlFor="material-switch">
                            <Switch
                                checked={props.res8toggle}
                                onChange={props.handleRes8Toggle}
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
                        </label>
                    </div>
                    <div>
                        <span>Res 9 </span>
                        <label htmlFor="material-switch">
                            <Switch
                                checked={props.res9toggle}
                                onChange={props.handleRes9Toggle}
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
                        </label>
                    </div>
                    <div>
                        <span>Res 10 </span>
                        <label htmlFor="material-switch">
                            <Switch
                                checked={props.res10toggle}
                                onChange={props.handleRes10Toggle}
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
                        </label>
                    </div>
                </div>
            </div>
            <div style={{ position: 'absolute', bottom: 55, justifyContent: 'flex-end', flex: 1, textAlign: 'center' }}>
                Help support this site
                <p>
                    <QRCode size={80} value="139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp" />
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
                </p>
            </div>
        </Menu>
    );
};