import {userApi} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SET_PHOTO = 'SET_PHOTO';

export const addPostActionCreator = (text) => {
    return {type: ADD_POST, text}
};

export const setUserProfile = (profile) => {
    return {type: SET_USER_PROFILE, profile}
};

export const setPhoto = (photo) => {
    return {type: SET_PHOTO, photo}
};

export const getUserProfileThunk = userId => async (dispatch) => {

    let response = await userApi.getUserProfile(userId);
            dispatch(setUserProfile(response))
};

export const setUserStatus = (status) => {
    return {type: SET_USER_STATUS, status: status}
};

export const getUserStatusThunk = userId => async (dispatch) => {

    let response = await userApi.getUserStatus(userId);
    dispatch(setUserStatus(response.data))
};

export const uploadPhoto = photo => async (dispatch) => {

    let response = await userApi.uploadPhoto(photo);
    if (response.data.resultCode === 0){
    dispatch(setPhoto(response.data.data.photos))}
};

export const saveProfileData = formData => async (dispatch, getState) => {
    let userId = getState().auth.id;
    let response = await userApi.saveProfileData(formData);
    if (response.data.resultCode === 0){
        dispatch(setUserProfile(userId))}
};

export const setUserStatusThunk = (status) => {
    return (dispatch) => {
        userApi.setUserStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        })
    }
};

let initialState = {
    postArray: [
        {id: 1, message: 'How are you?', likesCount: 5},
        {id: 2, message: 'I\'m fine', likesCount: 10},
        {id: 3, message: 'It\'s cool', likesCount: 15},
        {id: 4, message: 'Yeah', likesCount: 2}
    ],
    profile: null,
    status: ''
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let postPush = {
                id: state.postArray.length + 1,
                message: action.text.newPost,
                likesCount: 0,
            };
            return {
                ...state,
                postArray: [...state.postArray, postPush],
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };

        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SET_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photo}
            };


        default:
            return state;
    }
};