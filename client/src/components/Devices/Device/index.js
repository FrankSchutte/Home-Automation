import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Device extends Component {

    toggleDevice = (command) => {
        const commandWrapper = [{}];

        Object.keys(command).forEach((c) => {
            commandWrapper[0][c] = command[c];
        });

        const commandObj = {
            protocol: this.props.protocol,
            command: commandWrapper
        };

        this.props.toggleDevice(commandObj);
    };

    render() {
        const turnDeviceOn = this.props.commands[0]['turnDeviceOn'];
        const turnDeviceOff = this.props.commands[0]['turnDeviceOff'];

        return (
            <div>
                <h2>My device</h2>
                <p>
                    {this.props.label} <br/>
                    {this.props.location} <br/>
                    {this.props.protocol}
                </p>
                <button onClick={this.toggleDevice.bind(this, turnDeviceOn)}>Turn device on</button>
                <button onClick={this.toggleDevice.bind(this, turnDeviceOff)}>Turn device off</button>
            </div>
        );
    };
}

Device.propTypes = {
    label: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    protocol: PropTypes.string.isRequired,
    commands: PropTypes.array.isRequired,
    toggleDevice: PropTypes.func.isRequired
};

export default Device;
