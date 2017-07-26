import update from 'immutability-helper';

const initialState = {
    comports: [],
    currentComport: {}
};

const ComportsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_COMPORTS_SUCCESS':
            return update(state, {
                comports: {$set: action.comports}
            });
        case 'SET_COMPORT_SUCCESS':
            return update(state, {
                  currentComport: {$set: action.comport}
            });
        default:
            return state;
    }
};

export default ComportsReducer;
