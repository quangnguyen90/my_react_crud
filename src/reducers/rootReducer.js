import {combineReducers} from 'redux';
import casts from './catReducer';

const rootReducer = combineReducers({
    // short hand property names
    cats
});

export default rootReducer;