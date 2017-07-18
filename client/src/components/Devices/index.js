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

    toggleDevice = (device_id, action) => {
        this.props.toggleDevice(device_id, action);
    };

    render() {
        const devices = this.props.devices.map((device) => (
            <Device key={device._id}
                    _id={device._id}
                    disabled={device.disabled}
                    label={device.label}
                    location={device.location}
                    toggleDevice={this.toggleDevice}
            />
        ));

        return (
            <section>
                <h1>My devices</h1>
                <div>
                    {this.props.errMessage}
                </div>
                {devices}
            </section>
        );
    };
}

Devices.propTypes = {
    devices: PropTypes.array.isRequired,
    errMessage: PropTypes.string.isRequired,
    fetchDevices: PropTypes.func.isRequired,
    toggleDevice: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    devices: state.DevicesReducer.devices,
    errMessage: state.DevicesReducer.errMessage
});

const mapDispatchToProps = (dispatch) => ({
    fetchDevices: () => dispatch(actions.fetchDevices()),
    toggleDevice: (device_id, action) => dispatch(actions.toggleDevice(device_id, action))
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
