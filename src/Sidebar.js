import React from 'react';
import { scaleDown as Menu } from 'react-burger-menu';
import Switch from "react-switch";



export default props => {
    return (
        <Menu>
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
                    </tbody>
                </div>
            </div>
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
                <p>
                    <br></br>
                    <b>Advanced Usage</b>
                </p>
                <div style={{ textAlign: 'right' }}>
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
                <div style={{ textAlign: 'right' }}>
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
                <div style={{ textAlign: 'right' }}>
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
                <div style={{ textAlign: 'right' }}>
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
                <div style={{ textAlign: 'right' }}>
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
        </Menu>
    );
};