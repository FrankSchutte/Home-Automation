import update from 'immutability-helper';

const initialState = {
    devices: [],
    errMessage: ''
};

const DevicesReducer = (state = initialState, action) => {
    const deviceIndex = state.devices.findIndex((device) => (
        device._id === action._id
    ));

    switch (action.type) {
        case 'FETCH_DEVICES_SUCCESS':
            return update(state, {
                devices: {$set: action.devices}
            });
        case 'TOGGLE_DEVICE_ERROR':
            return update(state, {
                errMessage: {$set: JSON.stringify(action.err)},
                devices: {[deviceIndex]: {disabled: {$set: ''}}}
            });
        case 'TOGGLE_DEVICE_PENDING':
            return update(state, {
                devices: {[deviceIndex]: {disabled: {$set: 'disabled'}}}
            });
        case 'TOGGLE_DEVICE_SUCCESS':
            return update(state, {
                devices: {[deviceIndex]: {disabled: {$set: ''}}}
            });
        default:
            return state;
    }
};

export default DevicesReducer;
