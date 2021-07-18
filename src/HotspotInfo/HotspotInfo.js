import React, {
  useState,
  useEffect
} from "react";
import axios from 'axios';

import Loader from "react-loader-spinner";
import { distance as turfDistance, point as turfPoint } from '@turf/turf'


const HotSpotInfo = (props) => {
  const [dataLoading, setDataloading] = useState(true);
  const [hotspotInfo, setHotspotInfo] = useState(true);
  const [location, setLocation] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(
        "https://api.helium.io/v1/hotspots/" + props.info.properties.address
      );
      const rewardsResp = await axios(
        "https://api.helium.io/v1/hotspots/" + props.info.properties.address + "/rewards/sum?min_time=-1%20day"
      );
      let relayed = true;
      console.log(rewardsResp);
      let hotspot_data = response.data;
      let rewards_data = rewardsResp.data;
      let ipAddrs = hotspot_data.data.status.listen_addrs;
      //console.log(ipAddrs);

      if (ipAddrs === undefined || ipAddrs === null) {
        relayed = true;
      }
      else {
        var matches = ipAddrs.filter(s => s.includes('ip4'));
        if (matches.length) {
          relayed = false;
        }
      }

      const from = turfPoint([
        props.location.longitude,
        props.location.latitude,
      ])
      const to = turfPoint([hotspot_data.data.lng, hotspot_data.data.lat])
      let distance = Math.trunc(turfDistance(from, to, { units: 'meters' }))

      setHotspotInfo({
        name: hotspot_data.data.name,
        address: hotspot_data.data.address,
        owner: hotspot_data.data.owner,
        reward_scale: hotspot_data.data.reward_scale?.toFixed(2) || 0,
        status: hotspot_data.data.status.online,
        relayed: relayed,
        distance: distance,
        rewards: rewards_data.data.total.toFixed(2)
      });
      setDataloading(false);
    };
    fetchData();
  }, [props.info]);

  //hotspotData(info, location);
  //console.log("loading:", loading);
  //console.log(hotspotInfo);
  const displayName = `${hotspotInfo.name}`;
  const rewardScale = `${hotspotInfo.reward_scale}`;
  const hotspotLink = `https://explorer.helium.com/hotspots/${hotspotInfo.address}`;
  const distance = `${hotspotInfo.distance}`;
  const rewards = `${hotspotInfo.rewards}`;
  let status = null;
  //const relayed = `${hotspotInfo.relayed}`;
  if (hotspotInfo.relayed && hotspotInfo.status !== 'offline') {
    status = `${hotspotInfo.status}, Relayed`;
  }
  else {
    status = `${hotspotInfo.status}`;
  }

  //console.log(info);
  if (dataLoading) {
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
        <dl className="metadata">
          <div>
            <dt>Status:</dt>
            <dd>{status}</dd>
          </div>
          <div>
            <dt>Reward Scale:</dt>
            <dd>{rewardScale}</dd>
          </div>
          <div>
            <dt>24hr Rewards:</dt>
            <dd>{rewards}</dd>
          </div>
          <div>
            <dt>Distance:</dt>
            <dd>{distance} meters</dd>
          </div>
        </dl>
      </div>
    );
  }
};

export default HotSpotInfo;
