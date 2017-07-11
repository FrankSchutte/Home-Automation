import update from 'immutability-helper';

const initialState = {
    devices: []
};

const DevicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DEVICES_SUCCESS':
            return update(state, {
                devices: {$set: action.devices}
            });
        case 'FETCH_DEVICES_ERROR':
            console.error(action.err);
            return state;
        case 'TOGGLE_DEVICE_SUCCESS':
            console.log(action.message);
            return state;
        case 'TOGGLE_DEVICE_ERROR':
            console.error(action.err);
            return state;
        default:
            return state;
    }
};

export default DevicesReducer;
