import React from 'react';
import {Route} from 'react-router-dom';

import NavBar from './NavBar';
import Comports from './Comports';
import Devices from './Devices';
import './style.css';

const AdminPanel = () => {
    return (
        <section>
            <h1>Admin panel</h1>
            <NavBar/>
            <Route path="/admin/comports" component={Comports}/>
            <Route path="/admin/devices" component={Devices}/>
        </section>
    );
};

export default AdminPanel;
