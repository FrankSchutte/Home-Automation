import React, {Component} from 'react';
import {connect} from 'react-redux';

import Device from './Device';
import actions from './actions';
import './style.css';

class Devices extends Component {

    componentDidMount = () => {
        this.props.fetchDevices();
    };

    toggleDevice = (protocol, action) => {
        const command = {
            protocol,
            action
        };

        this.props.toggleDevice(command);
    };

    render = () => {
        const devices = this.props.devices.map((device) => (
            <Device key={device._id}
                    label={device.label}
                    turnDeviceOn={this.toggleDevice.bind(this, device.protocol, device.actions.turnDeviceOn)}
                    turnDeviceOff={this.toggleDevice.bind(this, device.protocol, device.actions.turnDeviceOff)}
            />
        ));

        return (
            <div>
                <h1>My devices</h1>
                {devices}
            </div>
        );
    };
}

const mapStateToProps = (state) => ({
    devices: state.DevicesReducer.devices
});

const mapDispatchToProps = (dispatch) => ({
    fetchDevices: () => dispatch(actions.fetchDevices()),
    toggleDevice: (command) => dispatch(actions.toggleDevice(command))
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
