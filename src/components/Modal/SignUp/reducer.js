// reducer.js

export const initialState = {
    username: '',
    password: '',
    repeatpassword: '',
    fullname: '',
    date: '',
    gender: 0,
    isShowPassword: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return { ...state, username: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'SET_REPEAT_PASSWORD':
            return { ...state, repeatpassword: action.payload };
        case 'SET_FULL_NAME':
            return { ...state, fullname: action.payload };
        case 'SET_DATE':
            return { ...state, date: action.payload };
        case 'SET_GENDER':
            return { ...state, gender: action.payload };
        default:
            return state;
    }
};

export default reducer;
