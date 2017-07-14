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

    toggleDevice = (id, command) => {
        this.props.toggleDevice(id, command);
    };

    render() {
        const devices = this.props.devices.map((device) => (
            <Device key={device._id}
                    commands={device.commands}
                    disabled={device.disabled}
                    id={device._id}
                    label={device.label}
                    location={device.location}
                    protocol={device.protocol}
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
    toggleDevice: (id, command) => dispatch(actions.toggleDevice(id, command))
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
