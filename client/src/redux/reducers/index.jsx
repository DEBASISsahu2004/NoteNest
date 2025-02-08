import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import loggedInReducer from './loggedInReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: loggedInReducer,
    user: userReducer,
});

export default rootReducer;