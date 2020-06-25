import React from "react";
import {connect} from "react-redux";
import FriendsItem from "./FriendsItem";
import * as axios from "axios";
import {setFollowedUsers} from "../../../../Redux/sidebarReducer";


class FriendsItemContainer extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users', {
            withCredentials: true,
            headers: {"API-KEY": "555f1dc9-2d34-4e28-a34a-1b143ab048bf"}
        }).then(response => {
            if (response.data.resultCode === 0){
            this.props.setFollowedUsers(response.data)}
        })
    }
    render() {
        return <FriendsItem users={this.props.users}/>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.sidebar.users
    }
}


export default connect(mapStateToProps, {setFollowedUsers})(FriendsItemContainer);


