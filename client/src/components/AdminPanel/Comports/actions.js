import request from '../../../utils/request';

const actions = {
    fetchComports: () => {
        return (dispatch) => {
            request.fetchComports((err, comports) => {
                if (err) {
                    return console.log(err);
                }

                dispatch({type: 'FETCH_COMPORTS_SUCCESS', comports: comports});
            })
        };
    },
    setComport: (comName) => {
        return (dispatch) => {
            request.setComport(comName, (err, success) => {
                dispatch({type: 'SET_COMPORT_SUCCESS', success: success, comport: {comName}});
            });
        };
    }
};

export default actions;
