import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Device extends Component {

    toggleDevice = (command) => {
        this.props.toggleDevice(this.props._id, command);
    };

    render() {
        return (
            <div>
                <h2>My device</h2>
                <p>
                    {this.props.label} <br/>
                    {this.props.location}
                </p>
                <button onClick={this.toggleDevice.bind(this, 'turnDeviceOn')}
                        disabled={this.props.disabled}>
                    Turn device on
                </button>
                <button onClick={this.toggleDevice.bind(this, 'turnDeviceOff')}
                        disabled={this.props.disabled}>
                    Turn device off
                </button>
            </div>
        );
    };
}

Device.propTypes = {
    _id: PropTypes.string.isRequired,
    disabled: PropTypes.string,
    label: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    toggleDevice: PropTypes.func.isRequired
};

export default Device;
