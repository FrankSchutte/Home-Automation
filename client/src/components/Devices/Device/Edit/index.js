import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import actions from '../../actions';
import './style.css';

class Edit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            label: '',
            location: '',
            protocol: '',
            turnDeviceOn: '',
            turnDeviceOff: ''
        };
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchDevice(id);
    };

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    submitForm = (event) => {
        const device = {
            label: this.state.label,
            location: this.state.location,
            protocol: this.state.protocol,
            actions: {
                turnDeviceOn: this.state.turnDeviceOn,
                turnDeviceOff: this.state.turnDeviceOff
            }
        };

        this.props.editDevice(device);
        event.preventDefault();
    };

    render() {
        const device = this.props.device;
        
        return (
            <section>
                <h1>Add device</h1>
                <form onSubmit={this.submitForm.bind(this)}>
                    <label>
                        Label
                        <input type="text"
                               name="label"
                               onChange={this.handleChange.bind(this)}
                               value={(device) ? device.label : ''}
                        />
                    </label>
                    <label>
                        Location
                        <input type="text"
                               name="location"
                               onChange={this.handleChange.bind(this)}
                               value={(device) ? device.location : ''}
                        />
                    </label>
                    <label>
                        Protocol
                        <input type="text"
                               name="protocol"
                               onChange={this.handleChange.bind(this)}
                               value={(device) ? device.protocol : ''}
                        />
                    </label>
                    <label>
                        Turn device on
                        <input type="text"
                               name="turnDeviceOn"
                               onChange={this.handleChange.bind(this)}
                               value={(device) ? JSON.stringify(device.actions.turnDeviceOn) : ''}
                        />
                    </label>
                    <label>
                        Turn device off
                        <input type="text"
                               name="turnDeviceOff"
                               onChange={this.handleChange.bind(this)}
                               value={(device) ? JSON.stringify(device.actions.turnDeviceOff) : ''}
                        />
                    </label>
                    <input type="submit" value="Edit"/>
                </form>
            </section>
        );
    };
}

Edit.propTypes = {
    device: PropTypes.any,
    fetchDevice: PropTypes.func.isRequired,
    editDevice: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    device: state.DevicesReducer.device
});

const mapDispatchToProps = (dispatch) => ({
    fetchDevice: (id) => dispatch(actions.fetchDevice(id)),
    editDevice: (device) => dispatch(actions.addDevice(device))
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
