import request from '../../utils/request';

const actions = {
    fetchDevices: () => {
        return (dispatch) => {
            request.fetchDevices((err, devices) => {
                if (err) {
                    return dispatch({type: 'FETCH_DEVICES_SUCCESS', err});
                }

                dispatch({type: 'FETCH_DEVICES_SUCCESS', devices});
            });
        }
    },
    toggleDevice: (command) => {
        return (dispatch) => {
            request.toggleDevice(command, (err, success) => {
                if (err) {
                    return dispatch({type: 'TOGGLE_DEVICE_ERROR', err});
                }

                dispatch({type: 'TOGGLE_DEVICE_SUCCESS', success});
            });
        };
    }
};

export default actions;
