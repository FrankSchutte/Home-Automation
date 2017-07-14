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
        // case 'TOGGLE_DEVICE_PENDING':
        //     return update(state, {
        //         devices:
        //     });
        // case 'TOGGLE_DEVICE_SUCCESS':
        //     return update(state, {
        //
        //     });
        default:
            return state;
    }
};

export default DevicesReducer;
