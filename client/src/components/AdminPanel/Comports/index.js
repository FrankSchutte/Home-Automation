import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Comport from './Comport';
import actions from './actions';
import './style.css';

class Comports extends Component {

    componentDidMount() {
        this.props.fetchComports();
    }

    setComport = (comName) => {
        this.props.setComport(comName);
    };

    render() {
        const comports = this.props.comports.map((comport) => (
            <Comport key={comport.comName}
                     comName={comport.comName}
                     manufacturer={comport.manufacturer}
                     setComport={this.setComport.bind(this, comport.comName)}
            />
        ));

        return (
            <section>
                <h2>My comports</h2>
                <div>
                    Current com port: {this.props.currentComport.comName}
                </div>
                {comports}
            </section>
        );
    };
}

Comports.propTypes = {
    comports: PropTypes.array.isRequired,
    currentComport: PropTypes.object.isRequired,
    fetchComports: PropTypes.func.isRequired,
    setComport: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    comports: state.ComportsReducer.comports,
    currentComport: state.ComportsReducer.currentComport
});

const mapDispatchToProps = (dispatch) => ({
    fetchComports: () => dispatch(actions.fetchComports()),
    setComport: (comName) => dispatch(actions.setComport(comName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comports);
