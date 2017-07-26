import {combineReducers} from 'redux';

import DevicesReducer from '../components/Devices/reducer';
import ComportsReducer from '../components/AdminPanel/Comports/reducer';

const reducers = combineReducers({
    DevicesReducer,
    ComportsReducer
});

export default reducers;