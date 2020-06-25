import {addPostActionCreator, profileReducer} from "./profileReducer";

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

it(`new message id should be length+1`, () => {

    let action = addPostActionCreator('hey');

    let newState = profileReducer(initialState, action);

    expect(newState.postArray[4].id).toBe(5);

});

