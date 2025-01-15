const initialState = {
    isLoggedIn: false,
};

const loggedInReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default loggedInReducer;