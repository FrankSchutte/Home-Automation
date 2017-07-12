import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import NewRemoteActions from '../NewRemoteActions';
import actions from '../../actions';
import './style.css';

class Add extends Component {

    componentDidMount() {
        this.props.resetDevice();
    };

    editField = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.props.editField(name, value);
    };

    editAction = (action, name, value) => {
        this.props.editAction(action, name, value);
    };

    submitForm = (event) => {
        const device = this.props.device;
        this.props.saveDevice(device);

        event.preventDefault();
    };

    render() {
        const device = this.props.device;

        return (
            <section>
                <h1>Add device</h1>
                <form onSubmit={this.submitForm}>
                    <label>
                        Label
                        <input type="text"
                               name="label"
                               onChange={this.editField}
                               value={device.label}
                        />
                    </label>
                    <label>
                        Location
                        <input type="text"
                               name="location"
                               onChange={this.editField}
                               value={device.location}
                        />
                    </label>
                    <label>
                        Protocol
                        <input type="text"
                               name="protocol"
                               onChange={this.editField}
                               value={device.protocol}
                        />
                    </label>
                    {(device.protocol === 'NEW_REMOTE') ?
                        <NewRemoteActions turnDeviceOn={device.actions.turnDeviceOn}
                                          turnDeviceOff={device.actions.turnDeviceOff}
                                          editAction={this.editAction}
                        /> :
                        ''
                    }
                    <input type="submit" value="Add"/>
                </form>
            </section>
        );
    };
}

Add.propTypes = {
    device: PropTypes.object.isRequired,
    editAction: PropTypes.func.isRequired,
    editField: PropTypes.func.isRequired,
    resetDevice: PropTypes.func.isRequired,
    saveDevice: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    device: state.DevicesReducer.device
});

const mapDispatchToProps = (dispatch) => ({
    editAction: (action, name, value) => dispatch(actions.editAction(action, name, value)),
    editField: (name, value) => dispatch(actions.editField(name, value)),
    resetDevice: () => dispatch(actions.resetDevice()),
    saveDevice: (device) => dispatch(actions.saveDevice(device))
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
