import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

const NavMenu = (props) => {
    return (
        <nav>
            <h1>My nav</h1>
            {props.routes.map((route) => (
                <NavLink key={route.path}
                         exact={route.exact}
                         to={route.path}
                         activeClassName="active">
                    {route.description}
                </NavLink>
            ))}
        </nav>
    );
};

NavMenu.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            component: PropTypes.func.isRequired,
            description: PropTypes.string.isRequired
        })
    ).isRequired
};

export default NavMenu;
