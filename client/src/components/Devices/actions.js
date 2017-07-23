import request from '../../utils/request';

const actions = {
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
    toggleDevice: (device_id, action) => {
        const command = {
            type: 'SEND_COMMAND',
            _id: device_id,
            action: action
        };

        return (dispatch) => {
            dispatch({type: 'TOGGLE_DEVICE_PENDING', _id: device_id});

            request.toggleDevice(command, (err, success) => {
                if (err) {
                    return dispatch({type: 'TOGGLE_DEVICE_ERROR', err, _id: device_id});
                }

                dispatch({type: 'TOGGLE_DEVICE_SUCCESS', success, _id: device_id});
            });
        };
    }
};

export default actions;
