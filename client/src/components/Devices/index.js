import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Device from './Device';
import actions from './actions';
import './style.css';

class Devices extends Component {

    componentDidMount() {
        this.props.fetchDevices();
    };

    toggleDevice = (protocol, action) => {
        const command = {
            protocol,
            action
        };

        this.props.toggleDevice(command);
    };

    render() {
        const devices = this.props.devices.map((device) => (
                <Device key={device._id}
                        _id={device._id}
                        label={device.label}
                        turnDeviceOn={this.toggleDevice.bind(this, device.protocol, device.actions.turnDeviceOn)}
                        turnDeviceOff={this.toggleDevice.bind(this, device.protocol, device.actions.turnDeviceOff)}
                />
        ));

        return (
            <section>
                <h1>My devices</h1>
                {devices}
                <NavLink to="/devices/add">Add device</NavLink>
            </section>
        );
    };
}

Devices.propTypes = {
    devices: PropTypes.array.isRequired,
    fetchDevices: PropTypes.func.isRequired,
    toggleDevice: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    devices: state.DevicesReducer.devices
});

const mapDispatchToProps = (dispatch) => ({
    fetchDevices: () => dispatch(actions.fetchDevices()),
    toggleDevice: (command) => dispatch(actions.toggleDevice(command))
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
