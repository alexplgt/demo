const SET_FOLLOWED_USERS = 'SET_FOLLOWED_USERS';

export const setFollowedUsers = (data) => {
    return {type: SET_FOLLOWED_USERS, data }
}

let initialState = {
    users: []
};

export const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case (SET_FOLLOWED_USERS):
            let followedUsers = [];
            for (let i = 1; i <= action.data.totalCount; i++)
            if (action.data.items.followed === true) {
                followedUsers.push(action.data.items);
                return {
                    ...state,
                    users: [...state.users, ...followedUsers]

                }
            };
            default:
            return state;
    }

}