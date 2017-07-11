import request from '../../utils/request';

const DevicesActions = {
    fetchDevices: () => {
        return (dispatch) => {
            dispatch({type: 'FETCH_DEVICES_REQUEST'});
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
            dispatch({type: 'TOGGLE_DEVICE_REQUEST'});
            request.toggleDevice(command,
                (err, message) => {
                    if (err) {
                        return dispatch({type: 'TOGGLE_DEVICE_ERROR', err});
                    }

                    dispatch({type: 'TOGGLE_DEVICE_SUCCESS', message});
                });
        }
    }
};

export default DevicesActions;
