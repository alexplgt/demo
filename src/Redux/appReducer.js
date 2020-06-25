import {authMe} from "./authReducer";

const INITIALIZING = 'INITIALIZING';

export const appInitialize = () => {
    return {type: INITIALIZING}
};


let initialState = {
    isInitialized: false
};

export const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZING:
            return {
                ...state,
                isInitialized: true,
            };

        default:
            return state;


    }
};

export const getInitializeApp = () => async (dispatch) => {
    let promise = dispatch(authMe());
     await Promise.all([promise]);
        dispatch(appInitialize())
};



