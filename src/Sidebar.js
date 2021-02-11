import React from 'react';
import { push as Menu } from 'react-burger-menu';
import Switch from "react-switch";
import QRCode from "react-qr-code";
import "react-responsive-modal/styles.css";

export default props => {
    return (
        <Menu>
            <div>
                <span>Sweetspot Area </span>
                <label htmlFor="material-switch">
                    <Switch
                        checked={props.sweetspotToggle}
                        onChange={props.handleSweetspotToggle}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={12}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={12}
                        width={30}
                        className="react-switch"
                        id="material-switch"
                    />
                </label>
            </div>
            <div>
                Map Style
                <div onChange={props.handleMapStyle}>
                    <tbody>
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
            </div>
            <div style={{ textAlign: 'center' }}>
                <p>
                    <br></br>
                    <b>Advanced Usage</b>
                </p>
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
                            height={12}
                            width={30}
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
                            height={12}
                            width={30}
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
                            height={12}
                            width={30}
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
                            height={12}
                            width={30}
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
                            height={12}
                            width={30}
                            className="react-switch"
                            id="material-switch"
                        />
                    </label>
                </div>  
            </div>
            <div style={{ position: 'absolute', bottom: 55, justifyContent:'flex-end', flex:1, textAlign: 'center' }}>
                Help support this site
                <p>
                    <QRCode size={60} value="139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp" />
                    <p>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(
                                "139PpQDPxiAYo37iiXKaGVV1FM3qVPnyUFJbvGNpTwBrAx8B4hp"
                            );
                        }}
                    >
                        Copy addr
                    </button>
                    </p>
                </p>
            </div>
        </Menu>
    );
};