import React, {
  useState,
  useEffect
} from "react";
import axios from 'axios';

import Loader from "react-loader-spinner";
import { distance as turfDistance, point as turfPoint } from '@turf/turf'

const HOTSPOT_URL = 'https://explorer.helium.com/hotspots/'

const fetchData = async (info, location) => {
  // TODO Promise.all these?
  const response = await axios(
    "https://api.helium.io/v1/hotspots/" + info.properties.address
  );
  const rewardsResp = await axios(
    "https://api.helium.io/v1/hotspots/" + info.properties.address + "/rewards/sum?min_time=-1%20day"
  );
  let relayed = true;

  let hotspot_data = response.data;
  let rewards_data = rewardsResp.data;
  let ipAddrs = hotspot_data.data.status.listen_addrs;

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
    location.longitude,
    location.latitude
  ])
  const to = turfPoint([hotspot_data.data.lng, hotspot_data.data.lat])
  let distance = Math.trunc(turfDistance(from, to, { units: 'meters' }))

  return {
    name: hotspot_data.data.name,
    address: hotspot_data.data.address,
    owner: hotspot_data.data.owner,
    reward_scale: hotspot_data.data.reward_scale?.toFixed(2) || 0,
    status: hotspot_data.data.status.online,
    relayed: relayed,
    distance: distance,
    rewards: rewards_data.data.total.toFixed(2)
  }
};

const HotSpotInfo = ({info, location}) => {
  const [dataLoading, setDataloading] = useState(true);
  const [hotspotInfo, setHotspotInfo] = useState(true);

 
  useEffect(async () => {
    setDataloading(true)
    const updatedInfo = await fetchData(info, location);
    setHotspotInfo(updatedInfo);
    setDataloading(false);
  }, [info]);

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
        <a className="name" href={`${HOTSPOT_URL}${hotspotInfo.address}`} target="_blank" rel="noreferrer">{hotspotInfo.name}</a>
        <dl className="metadata">
          <div>
            <dt>Status:</dt>
            <dd>
              {
              (hotspotInfo.relayed && hotspotInfo.status !== 'offline' )
                ? `${hotspotInfo.status}, Relayed` 
                : hotspotInfo.status 
              }
            </dd>
          </div>
          <div>
            <dt>Transmit Scale:</dt>
            <dd>{hotspotInfo.reward_scale}</dd>
          </div>
          <div>
            <dt>24hr Rewards:</dt>
            <dd>{hotspotInfo.rewards}</dd>
          </div>
          <div>
            <dt>Distance:</dt>
            <dd>{hotspotInfo.distance} meters</dd>
          </div>
        </dl>
      </div>
    );
  }
};

export default HotSpotInfo;
