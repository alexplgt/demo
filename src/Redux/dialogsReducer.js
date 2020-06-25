const ADD_MESSAGE = 'ADD-MESSAGE';

export const sendNewMessage = (message) => {
    return {type: ADD_MESSAGE, message}
};

let initialState = {
    userArray: [
        {name: 'Alex', id: 1},
        {name: 'Xenia', id: 2},
        {name: 'John', id: 3},
        {name: 'Stan', id: 4}
    ],
    messageArray: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Good Morning'},
        {id: 4, message: 'How are you?'},
        {id: 5, message: 'It\'s pretty good!'}
    ],
}

export const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: state.messageArray.length + 1,
                message: action.message.newMessage
            };
            return {
                ...state,
                messageArray: [...state.messageArray, newMessage],
            };

        default:
            return state;
    }
};