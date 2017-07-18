import React from 'react';
import {NavLink} from 'react-router-dom';

import './style.css';

const NavBar = () => {
    return (
        <nav>
            <h1>My nav bar</h1>
            <NavLink to="/admin/comports">Comports</NavLink>
            <NavLink to="/admin/devices">Devices</NavLink>
        </nav>
    );
};

export default NavBar;
