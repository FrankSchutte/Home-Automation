import React from 'react';
import {NavLink} from 'react-router-dom';

import './style.css';

const NavMenu = () => {
    return (
        <nav>
            <h1>My nav</h1>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/devices">Devices</NavLink>
        </nav>
    );
};

export default NavMenu;
