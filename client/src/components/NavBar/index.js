import React from 'react';
import {NavLink} from 'react-router-dom';

import './style.css';

const NavBar = () => {
    return (
        <nav>
            <h1>My nav bar</h1>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/devices">Devices</NavLink>
            <NavLink to="/admin">Admin panel</NavLink>
        </nav>
    );
};

export default NavBar;
