import {userApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH = 'SET_AUTH';

export const setAuth = (id, login, email, isAuth) => {
    return {type: SET_AUTH, payload: {id, login, email, isAuth}}
};


let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;


    }
};

export const authMe = () => (dispatch) => {
    return userApi.auth().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuth(id, login, email, true))
        }
    });
};


export const onLogin = (email, password, rememberMe = true) => async (dispatch) => {
    let response = await userApi.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(authMe())
    } else if (response.data.resultCode !== 0) {
        dispatch(stopSubmit('Login', {_error: response.data.messages[0]}))
    }
};

export const onLogout = () => async (dispatch) => {
    let response = await userApi.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuth(null, null, null, false))
    }
};

