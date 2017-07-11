import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import actions from '../../actions';
import './style.css';

class Add extends Component {

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

        this.props.addDevice(device);
        event.preventDefault();
    };

    render() {
        return (
            <section>
                <h1>Add device</h1>
                <form onSubmit={this.submitForm.bind(this)}>
                    <label>
                        Label
                        <input type="text"
                               name="label"
                               onChange={this.handleChange.bind(this)}
                        />
                    </label>
                    <label>
                        Location
                        <input type="text"
                               name="location"
                               onChange={this.handleChange.bind(this)}
                        />
                    </label>
                    <label>
                        Protocol
                        <input type="text"
                               name="protocol"
                               onChange={this.handleChange.bind(this)}
                        />
                    </label>
                    <label>
                        Turn device on
                        <input type="text"
                               name="turnDeviceOn"
                               onChange={this.handleChange.bind(this)}
                        />
                    </label>
                    <label>
                        Turn device off
                        <input type="text"
                               name="turnDeviceOff"
                               onChange={this.handleChange.bind(this)}
                        />
                    </label>
                    <input type="submit" value="Add"/>
                </form>
            </section>
        );
    };
}

Add.propTypes = {
    addDevice: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    addDevice: (device) => dispatch(actions.addDevice(device))
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
