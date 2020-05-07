import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {sidebarReducer} from "./sidebarReducer";

let store = {
    _state: {
        profilePage: {
            postArray: [
                {id: 1, message: 'How are you?', likesCount: 5},
                {id: 2, message: 'I\'m fine', likesCount: 10},
                {id: 3, message: 'It\'s cool', likesCount: 15},
                {id: 4, message: 'Yeah', likesCount: 2}
            ],
            newPostText: '',
        },
        messagePage: {
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
            newMessageText: ''
        },
        sidebar: {}
    },

    dispatch(action) {
        profileReducer(this._state.profilePage, action);
        dialogsReducer(this._state.messagePage, action);
        sidebarReducer(this._state.sidebar, action);
        this._rerenderAppTree(this._state);
    },


    subscribe(observer) {
        this._rerenderAppTree = observer
    },

    _rerenderAppTree() {
    },

    getState() {
        return this._state
    }

}






export default store;