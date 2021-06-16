import * as React from "react";
import { PureComponent } from "react";
import Loader from "react-loader-spinner";
import { distance as turfDistance, point as turfPoint } from '@turf/turf'


let hotspotInfo = {};
let loading = true;

export default class HotSpotInfo extends PureComponent {

  hotspotData = (hotspot, location) => {
    fetch("https://api.helium.io/v1/hotspots/" + hotspot.properties.address, {cache:"force-cache"})
      .then((response) => response.json())
      .then((hotspot_data) => {
        //console.log("location: ", location);
        let relayed = true;
        let ipAddrs = hotspot_data.data.status.listen_addrs;
        //console.log(ipAddrs);

        if (ipAddrs === undefined || ipAddrs === null) {
          relayed = true;
        }
        else{
          var matches = ipAddrs.filter(s => s.includes('ip4'));
          if (matches.length) {
            relayed = false;
          }
        }

        const from = turfPoint([
          location.longitude,
          location.latitude,
        ])
        const to = turfPoint([hotspot_data.data.lng, hotspot_data.data.lat])
        let distance = Math.trunc(turfDistance(from, to, { units: 'meters' }))

        hotspotInfo = {
          name: hotspot_data.data.name,
          address: hotspot_data.data.address,
          owner: hotspot_data.data.owner,
          reward_scale: hotspot_data.data.reward_scale.toFixed(2),
          status: hotspot_data.data.status.online,
          relayed: relayed,
          distance: distance
        }
        loading = false;
      });
  };

  render() {
    const { info, location } = this.props;
    this.hotspotData(info, location);
    //console.log("loading:", loading);
    //console.log(hotspotInfo);
    const displayName = `${hotspotInfo.name}`;
    const rewardScale = `${hotspotInfo.reward_scale}`;
    const hotspotLink = `https://explorer.helium.com/hotspots/${hotspotInfo.address}`;
    const distance = `${hotspotInfo.distance}`;
    let status = null;
    //const relayed = `${hotspotInfo.relayed}`;
    if (hotspotInfo.relayed && hotspotInfo.status !== 'offline') {
      status = `${hotspotInfo.status}, Relayed`;
    }
    else {
      status = `${hotspotInfo.status}`;
    }

    //console.log(info);
    if (loading) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Loader type="ThreeDots" color="#162646" height={30} width={30} />
        </div>
      )
    }
    else {
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
              <dd>{distance} meters</dd>
            </div>
          </dl>
        </div>
      );
    }
  }
}
