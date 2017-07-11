import React from 'react';
import {NavLink} from 'react-router-dom';

import './style.css';

const Device = (props) => {
    return (
        <div>
            <h1>{props.label}</h1>
            <button onClick={props.turnDeviceOn}>Toggle on</button>
            <button onClick={props.turnDeviceOff}>Toggle off</button>
            <NavLink to={'/devices/edit/' + props._id}>Edit device</NavLink>
        </div>
    );
};

export default Device;
