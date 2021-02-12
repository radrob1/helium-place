import * as React from "react";
import { PureComponent } from "react";

export default class HotSpotInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const displayName = `${info.properties.name}`;
    const rewardScale = `${info.properties.rewardScale}`;
    const hotspotLink = `https://explorer.helium.com/hotspots/${info.properties.address}`;
    return (
        <div className="hotspot-info">
          <h4><a href={hotspotLink} target="_blank">{displayName}</a></h4>
          Reward Scale: {rewardScale}
        </div>
    );
  }
}
