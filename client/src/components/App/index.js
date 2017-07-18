import React from 'react';
import {Route} from 'react-router-dom';

import Header from '../Header';
import NavBar from '../NavBar';
import Home from '../Home';
import Devices from '../Devices';
import AdminPanel from '../AdminPanel';
import './style.css';

const App = () => {
    return (
        <div>
            <Header/>
            <NavBar/>
            <Route exact path="/" component={Home}/>
            <Route path="/devices" component={Devices}/>
            <Route path="/admin" component={AdminPanel}/>
        </div>
    );
};

export default App;
