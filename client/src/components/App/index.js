import React from 'react';
import {Route} from 'react-router-dom';

import Header from '../Header';
import NavMenu from '../NavMenu';
import Home from '../Home';
import Devices from '../Devices';
import Add from '../Devices/Device/Add';
import Edit from '../Devices/Device/Edit';
import './style.css';

const App = () => {
    return (
        <div>
            <Header/>
            <NavMenu/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/devices" component={Devices}/>
            <Route path="/devices/add" component={Add}/>
            <Route path="/devices/edit/:id?" component={Edit}/>
        </div>
    );
};

export default App;
