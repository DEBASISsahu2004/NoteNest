import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import loggedInReducer from './loggedInReducer';

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: loggedInReducer,
});

export default rootReducer;