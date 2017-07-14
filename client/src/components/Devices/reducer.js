import update from 'immutability-helper';

const initialState = {
    devices: [],
};

const DevicesReducer = (state = initialState, action) => {
    const deviceIndex = state.devices.findIndex((device) => {
        return device._id === action.id;
    });

    switch (action.type) {
        case 'FETCH_DEVICES_SUCCESS':
            return update(state, {
                devices: {$set: action.devices}
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
