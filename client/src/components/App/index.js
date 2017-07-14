import React from 'react';
import {Route} from 'react-router-dom';

import Header from '../Header';
import NavMenu from '../NavMenu/index';
import routes from '../../routes';
import './style.css';

const App = () => {
    return (
        <div>
            <Header/>
            <NavMenu routes={routes}/>

            {routes.map((route) => (
                <Route key={route.path}
                       exact={route.exact}
                       path={route.path}
                       component={route.component}
                />
            ))}
        </div>
    );
};

export default App;
