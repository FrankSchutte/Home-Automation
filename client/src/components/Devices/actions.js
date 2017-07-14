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
    toggleDevice: (id, command) => {
        return (dispatch) => {
            dispatch({type: 'TOGGLE_DEVICE_PENDING', id});

            request.toggleDevice(command, (err, success) => {
                if (err) {
                    return dispatch({type: 'TOGGLE_DEVICE_ERROR', err, id});
                }

                dispatch({type: 'TOGGLE_DEVICE_SUCCESS', success, id});
            });
        };
    }
};

export default actions;
