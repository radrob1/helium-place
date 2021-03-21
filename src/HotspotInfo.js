import * as React from "react";
import { PureComponent } from "react";

export default class HotSpotInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const displayName = `${info.properties.name}`;
    const rewardScale = `${info.properties.rewardScale}`;
    const hotspotLink = `https://explorer.helium.com/hotspots/${info.properties.address}`;
    const distance = `${info.properties.distance}`;
    const status = `${info.properties.status}`;
    console.log(info);
    return (
        <div className="hotspot-info">
          <a className="name" href={hotspotLink} target="_blank" rel="noreferrer">{displayName}</a>
          <dl classname="metadata">
            <div>
              <dt>Status:</dt>
              <dd>{status}</dd>
            </div>
            <div>
              <dt>Reward Scale:</dt>
              <dd>{rewardScale}</dd>
            </div>
            <div>
              <dt>Distance:</dt>
              <dd>{distance}m</dd>
            </div>
          </dl>
        </div>
    );
  }
}
