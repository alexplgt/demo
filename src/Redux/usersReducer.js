import {userApi} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_IS_LOADING = 'SET_IS_LOADING';
const ON_FOLLOW_BUTTON_DISABLE = 'ON_FOLLOW_BUTTON_DISABLE';

export const follow = (userId) => {
    return {type: FOLLOW, id: userId}
};

export const unfollow = (id) => {
    return {type: UNFOLLOW, id}
};

export const setUsers = (users) => {
    return {type: SET_USERS, users}
};

export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
};

export const setTotalCount = (totalCount) => {
    return {type: SET_TOTAL_COUNT, totalCount}
};

export const setIsLoading = (isLoading) => {
    return {type: SET_IS_LOADING, isLoading}
};

export const onFollowButtonDisable = (isDisabled, userId) => {
    return {type: ON_FOLLOW_BUTTON_DISABLE, isDisabled, userId}
};


let initialState = {
    users: [],
    currentPage: 1,
    totalCount: 0,
    pageSize: 100,
    isLoading: false,
    disabledButtons: []
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: false}
                    }
                    return u
                })
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount,
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case ON_FOLLOW_BUTTON_DISABLE:
            return {
                ...state,
                disabledButtons: action.isDisabled
                    ? [...state.disabledButtons, action.userId]
                    : state.disabledButtons.filter(userId => userId !== action.userId),

            };

        default:
            return state;
    }
};

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setIsLoading(true));
    let response = await userApi.getUsers(currentPage, pageSize);
    dispatch(setUsers(response.items));
    dispatch(setIsLoading(false));
    dispatch(setCurrentPage(currentPage));
    dispatch(setTotalCount(response.totalCount));
};


const FollowUnfollowToggle = async (dispatch, userId, apiMethod, method) => {
    dispatch(onFollowButtonDisable(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(method(userId))
    }
    dispatch(onFollowButtonDisable(false, userId))
};


export const followThunk = (userId) => {
    return async (dispatch) => {
        FollowUnfollowToggle(dispatch, userId, userApi.follow.bind(userApi), follow)
    }
};


export const unfollowThunk = (userId) => {
    return async (dispatch) => {
        FollowUnfollowToggle(dispatch, userId, userApi.unfollow.bind(userApi), unfollow)
    }
};
