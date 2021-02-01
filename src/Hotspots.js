import * as React from 'react';
import { PureComponent } from 'react';
import { Popup } from 'react-map-gl';
import HotspotInfo from "./HotspotInfo";



// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class Hotspots extends PureComponent {
  onClick(hotspot) {
    console.log("marker click: ", hotspot);
    this.setState({popupname: hotspot})
  }

  render() {
    const { data } = this.props;
    const state = {
      popupname: null
    }
    console.log(data);
    return data.map(
      (hotspot, index) =>
      <div className={hotspot.properties.name} onClick={this.onClick(hotspot.properties.name)}>
        {this.state.popupname  != null  && (
          <Popup
            tipSize={8}
            anchor="top"
            longitude={hotspot.properties.longitude}
            latitude={hotspot.properties.latitude}
            closeButton={true}
            closeOnClick={true}
          >
            <HotspotInfo info={hotspot} />
          </Popup>
        )}
        </div>
    );
  }
}