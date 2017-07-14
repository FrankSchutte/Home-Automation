// App
import AdminPanel from './components/AdminPanel/index';
import Devices from './components/Devices/index';
import Home from './components/Home/index';

// Admin panel
import AdminComports from './components/AdminPanel/Comports';
import AdminDevices from './components/AdminPanel/Devices';

export default [{
    path: '/',
    component: Home,
    description: 'Home',
    exact: true
}, {
    path: '/devices',
    component: Devices,
    description: 'Devices'
}, {
    path: '/admin',
    component: AdminPanel,
    description: 'Admin panel',
    routes: [{
        path: '/admin/comports',
        component: AdminComports,
        description: 'Comports'
    }, {
        path: '/admin/devices',
        component: AdminDevices,
        description: 'Devices'
    }]
}];
