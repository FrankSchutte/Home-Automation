import React from 'react';
import {Route} from 'react-router-dom';

import NavMenu from '../NavMenu';
import routes from '../../routes';
import './style.css';

const AdminPanel = () => {
    const adminPanelRoutes = routes.find((route) => (
        route.path === '/admin'
    ));

    return (
        <nav>
            <h1>Admin panel</h1>
            <NavMenu routes={adminPanelRoutes.routes}/>
            {adminPanelRoutes.routes.map((route) => (
                <Route key={route.path}
                       exact={route.exact}
                       path={route.path}
                       component={route.component}
                />
            ))}
        </nav>
    );
};

export default AdminPanel;
