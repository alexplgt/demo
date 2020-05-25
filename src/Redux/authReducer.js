import {userApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH = 'SET_AUTH';
const SET_CAPTCHA = 'SET_CAPTCHA';

export const setAuth = (id, login, email, isAuth) => {
    return {type: SET_AUTH, payload: {id, login, email, isAuth}}
};
export const setCaptcha = (captchaUrl) => {
    return {type: SET_CAPTCHA, payload: {captchaUrl}}
};


let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_AUTH:
        case SET_CAPTCHA:
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


export const onLogin = (email, password, rememberMe = true, captcha) => async (dispatch) => {
    let response = await userApi.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(authMe())
    } else if (response.data.resultCode !== 0) {
        if(response.data.resultCode === 10){
           dispatch(getCaptcha());
        }
        dispatch(stopSubmit('Login', {_error: response.data.messages[0]}))
    }
};

export const getCaptcha = () => async (dispatch) => {
    let response = await userApi.getCaptchaUrl();
    dispatch(setCaptcha(response.data.url));
};

export const onLogout = () => async (dispatch) => {
    let response = await userApi.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuth(null, null, null, false))
    }
};

