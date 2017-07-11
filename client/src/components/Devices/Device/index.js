import React from 'react';

import './style.css';

const Device = (props) => {
    return (
        <div>
            <h1>{props.label}</h1>
            <button onClick={props.turnDeviceOn}>Toggle on</button>
            <button onClick={props.turnDeviceOff}>Toggle off</button>
        </div>
    );
};

export default Device;
