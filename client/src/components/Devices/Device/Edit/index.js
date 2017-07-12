import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import actions from '../../actions';
import './style.css';

class Edit extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;

        this.props.fetchDevice(id);
    };

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.props.editField(name, value);
    };

    submitForm = (event) => {
        const d = this.props.device;
        const device = {
            label: d.label,
            location: d.location,
            protocol: d.protocol,
            actions: d.actions
        };

        this.props.saveDevice(device);

        event.preventDefault();
    };

    render() {
        const device = this.props.device;

        return (
            <section>
                <h1>Edit device</h1>
                <form onSubmit={this.submitForm.bind(this)}>
                    <label>
                        Label
                        <input type="text"
                               name="label"
                               onChange={this.handleChange.bind(this)}
                               value={device.label}
                        />
                    </label>
                    <label>
                        Location
                        <input type="text"
                               name="location"
                               onChange={this.handleChange.bind(this)}
                               value={device.location}
                        />
                    </label>
                    <label>
                        Protocol
                        <input type="text"
                               name="protocol"
                               onChange={this.handleChange.bind(this)}
                               value={device.protocol}
                        />
                    </label>
                    <input type="submit" value="Edit"/>
                </form>
            </section>
        );
    };
}

Edit.propTypes = {
    device: PropTypes.object.isRequired,
    editField: PropTypes.func.isRequired,
    fetchDevice: PropTypes.func.isRequired,
    saveDevice: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    device: state.DevicesReducer.device
});

const mapDispatchToProps = (dispatch) => ({
    editField: (name, value) => dispatch(actions.editField(name, value)),
    fetchDevice: (id) => dispatch(actions.fetchDevice(id)),
    saveDevice: (device) => dispatch(actions.saveDevice(device))
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
