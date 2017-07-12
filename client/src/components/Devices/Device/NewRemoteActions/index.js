import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './style.css';

class NewRemoteActions extends Component {

    editAction = (action, event) => {
        const name = event.target.name;
        const value = event.target.value;

        console.log(action, name, value);
        this.props.editAction(action, name, value);
    };

    render() {
        return (
            <div>
                <h2>Actions</h2>
                <div>
                    <h3>Turn device on</h3>
                    <label>
                        Transmitter address
                        <input type="text"
                               name="transmitterAddress"
                               onChange={this.editAction.bind(this, 'turnDeviceOn')}
                               value={this.props.turnDeviceOn.transmitterAddress}
                        />
                    </label>
                    <label>
                        Unit
                        <input type="text"
                               name="transmitterAddress"
                               onChange={this.editAction.bind(this, 'turnDeviceOn')}
                               value={this.props.turnDeviceOn.unit}
                        />
                    </label>
                    <label>
                        Switch on
                        <input type="text"
                               name="transmitterAddress"
                               onChange={this.editAction.bind(this, 'turnDeviceOn')}
                               value={this.props.turnDeviceOn.switchOn}
                        />
                    </label>
                </div>
                <div>
                    <h3>Turn device off</h3>
                    <label>
                        Transmitter address
                        <input type="text"
                               name="transmitterAddress"
                               onChange={this.editAction.bind(this, 'turnDeviceOff')}
                               value={this.props.turnDeviceOff.transmitterAddress}
                        />
                    </label>
                    <label>
                        Unit
                        <input type="text"
                               name="transmitterAddress"
                               onChange={this.editAction.bind(this, 'turnDeviceOff')}
                               value={this.props.turnDeviceOff.unit}
                        />
                    </label>
                    <label>
                        Switch on
                        <input type="text"
                               name="transmitterAddress"
                               onChange={this.editAction.bind(this, 'turnDeviceOff')}
                               value={this.props.turnDeviceOff.switchOn}
                        />
                    </label>
                </div>
            </div>
        );
    };
}

NewRemoteActions.propTypes = {
    turnDeviceOn: PropTypes.object.isRequired,
    turnDeviceOff: PropTypes.object.isRequired,
    editAction:PropTypes.func.isRequired
};

export default NewRemoteActions;
