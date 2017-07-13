import React from 'react';
import {Route} from 'react-router-dom';

import Header from '../Header';
import NavMenu from '../NavMenu';
import Home from '../Home';
import Devices from '../Devices';
import './style.css';

const App = () => {
    return (
        <div>
            <Header/>
            <NavMenu/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/devices" component={Devices}/>
        </div>
    );
};

export default App;
