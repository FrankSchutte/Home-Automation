import request from '../../utils/request';

const DevicesActions = {
    editField: (name, value) => {
        return {type: 'EDIT_FIELD', name, value};
    },
    fetchDevice: (id) => {
        return (dispatch) => {
            request.fetchDevice(id, (err, device) => {
                if (err) {
                    return dispatch({type: 'FETCH_DEVICE_ERROR', err});
                }

                dispatch({type: 'FETCH_DEVICE_SUCCESS', device});
            });
        };
    },
    fetchDevices: () => {
        return (dispatch) => {
            request.fetchDevices((err, devices) => {
                if (err) {
                    return dispatch({type: 'FETCH_DEVICES_ERROR', err});
                }

                dispatch({type: 'FETCH_DEVICES_SUCCESS', devices});
            });
        };
    },
    resetDevice: () => {
        return {type: 'RESET_DEVICE'};
    },
    saveDevice: (device) => {
        return (dispatch) => {
            dispatch({type: "SAVE_DEVICE", device});
        };
    },
    toggleDevice: (command) => {
        return (dispatch) => {
            dispatch({type: 'TOGGLE_DEVICE_PENDING'});
            request.toggleDevice(command,
                (err, message) => {
                    if (err) {
                        return dispatch({type: 'TOGGLE_DEVICE_ERROR', err});
                    }

                    dispatch({type: 'TOGGLE_DEVICE_SUCCESS', message});
                });
        };
    }
};

export default DevicesActions;
