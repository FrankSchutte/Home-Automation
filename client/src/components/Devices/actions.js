import request from '../../utils/request';

const DevicesActions = {
    addDevice: (device) => {
        return (dispatch) => {
        };
    },
    editDevice: (device) => {
        return (dispatch) => {
        };
    },
    fetchDevice: (id) => {
        return (dispatch) => {
            request.fetchDevice(id, (err, device) => {
                if (err) {
                    return dispatch({type: 'FETCH_DEVICES_ERROR', err});
                }
                const devices = [device];console.log(devices);

                dispatch({type: 'FETCH_DEVICES_SUCCESS', devices: devices});
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
