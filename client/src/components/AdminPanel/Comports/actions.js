import request from '../../../utils/request';

const actions = {
    fetchComports: () => {
        return (dispatch) => {
            request.fetchComports((err, comports) => {
                if (err) {
                    return console.error(err);
                }

                dispatch({type: 'FETCH_COMPORTS_SUCCESS', comports: comports});
            })
        };
    },
    fetchCurrentComport: () => {
        return (dispatch) => {
            request.fetchCurrentComport((err, comport) => {
                if (err) {
                    return dispatch({type: 'FETCH_CURRENT_COMPORT_ERROR', err: err});
                }

                dispatch({type: 'FETCH_CURRENT_COMPORT_SUCCESS', comport: comport});
            });
        };
    },
    setComport: (comName) => {
        return (dispatch) => {
            request.setComport(comName, (err, success) => {
                if (err) {
                    return console.error(err);
                }

                dispatch({type: 'SET_COMPORT_SUCCESS', success: success, comport: {comName}});
            });
        };
    }
};

export default actions;
