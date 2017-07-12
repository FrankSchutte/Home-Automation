import update from 'immutability-helper';

const initialState = {
    devices: [],
    device: {
        label: '',
        location: '',
        protocol: '',
        actions: {
            turnDeviceOn: {
                transmitterAddress: '',
                unit: '',
                switchOn: true
            },
            turnDeviceOff: {
                transmitterAddress: '',
                unit: '',
                switchOn: false
            }
        }
    }
};

const DevicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_ACTION':
            return update(state, {
                device: {actions: {[action.action]: {[action.name]: {$set: action.value}}}}
            });
        case 'EDIT_FIELD':
            return update(state, {
                device: {[action.name]: {$set: action.value}}
            });
        case 'FETCH_DEVICE_SUCCESS':
            return update(state, {
                device: {$set: action.device}
            });
        case 'FETCH_DEVICE_ERROR':
            console.error(action.err);
            return state;
        case 'FETCH_DEVICES_SUCCESS':
            return update(state, {
                devices: {$set: action.devices}
            });
        case 'FETCH_DEVICES_ERROR':
            console.error(action.err);
            return state;
        case 'RESET_DEVICE':
            return update(state, {
                device: {$set: initialState.device}
            });
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
