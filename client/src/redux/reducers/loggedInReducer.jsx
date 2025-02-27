const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
};

const loggedInReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem("isLoggedIn", true);
            return {
                ...state,
                isLoggedIn: true,
            };
        case 'LOGOUT':
            localStorage.removeItem("isLoggedIn");
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default loggedInReducer;