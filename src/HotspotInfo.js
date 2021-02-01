import * as React from 'react';
import { PureComponent } from 'react';

export default class HotSpotInfo extends PureComponent {
    render() {
        const { info } = this.props;
        const displayName = `${info.properties.name}`;
        const rewardScale = `${info.properties.rewardScale}`
        return (
            <div>
                <div className="hotspot-info">
                    <h4>{displayName}</h4>
                    Reward Scale: {rewardScale}
                </div>
            </div>
        );
    }
}