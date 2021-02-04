import React, {
    useState,
    useCallback
} from "react";
import Switch from "react-switch";


const hotspotPaint = {
    "fill-color": "#001f3f",
    "fill-opacity": 1,
    //'background': 'purple'
};

const ResToggle = (props) => {
    const [res8toggle, setRes8Toggle] = useState(false);
    const [res7toggle, setRes7Toggle] = useState(false);
    const [res9toggle, setRes9Toggle] = useState(false);
    const [res10toggle, setRes10Toggle] = useState(false);
    const [sweetspotToggle, setSweetSpotToggle] = useState(false);

    const handleRes7Toggle = useCallback(
        (checked) => {
            setRes7Toggle(checked);
            console.log(res7toggle);
        },
        [res7toggle]
    );

    const handleRes8Toggle = useCallback(
        (checked) => {
            setRes8Toggle(checked);
        },
        [res8toggle]
    );

    const handleRes9Toggle = useCallback(
        (checked) => {
            setRes9Toggle(checked);
        },
        [res9toggle]
    );

    const handleRes10Toggle = useCallback(
        (checked) => {
            setRes10Toggle(checked);
        },
        [res10toggle]
    );

    const handleSweetspotToggle = useCallback(
        (checked) => {
            setSweetSpotToggle(checked);
        },
        [sweetspotToggle]
    );

    return (
        <div
            id="hex-toggle-legend"
            class="toggle-legend"
            containerRef={props.toggleswitchContainerRef}
        >
            <h4>Hex Resolution Toggle</h4>
            <div>
                <span>res 7</span>
                <label htmlFor="material-switch">
                    <Switch
                        checked={res7toggle}
                        onChange={handleRes7Toggle}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={10}
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
                <span>res 8</span>
                <label htmlFor="material-switch">
                    <Switch
                        checked={res8toggle}
                        onChange={handleRes8Toggle}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={10}
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
                <span>res 9</span>
                <label htmlFor="material-switch">
                    <Switch
                        checked={res9toggle}
                        onChange={handleRes9Toggle}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={10}
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
                <span>res 10</span>
                <label htmlFor="material-switch">
                    <Switch
                        checked={res10toggle}
                        onChange={handleRes10Toggle}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={10}
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
                <span>sweetspot</span>
                <label htmlFor="material-switch">
                    <Switch
                        checked={sweetspotToggle}
                        onChange={handleSweetspotToggle}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={10}
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
    );
};

export default ResToggle;