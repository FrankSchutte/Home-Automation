import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Comport = (props) => {
    return (
        <div>
            <h2>My comport</h2>
            Com name: {props.comName} <br/>
            Manufacturer: {props.manufacturer} <br/>
            <button onClick={props.setComport}>Set this comport</button>
        </div>
    );
};

Comport.propTypes = {
    comName: PropTypes.string.isRequired,
    manufacturer: PropTypes.string,
    setComport: PropTypes.func.isRequired
};

export default Comport;
