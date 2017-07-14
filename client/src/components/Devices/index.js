import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Device from './Device';
import actions from './actions';
import './style.css';

class Devices extends Component {

    componentDidMount() {
        this.props.fetchDevices();
    };

    toggleDevice = (command) => {
        this.props.toggleDevice(command);
    };

    render() {
        const devices = this.props.devices.map((device) => (
            <Device key={device._id}
                    label={device.label}
                    location={device.location}
                    protocol={device.protocol}
                    commands={device.commands}
                    toggleDevice={this.toggleDevice}
            />
        ));

        return (
            <section>
                <h1>My devices</h1>
                {devices}
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
