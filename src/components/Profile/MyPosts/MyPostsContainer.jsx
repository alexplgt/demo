import React from "react";
import {addPostActionCreator} from "../../../Redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
    }
};

class MyPostsContainer extends React.Component {
    render() {
        return <div>
            <MyPosts {...this.props}/>
        </div>
    }
}

export default connect (mapStateToProps, {addPostActionCreator})(MyPostsContainer)
