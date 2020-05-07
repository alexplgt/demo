import React from "react";
import s from './FriendsBar.module.css'
import FriendsItemContainer from "./Friends/FriendsItemContainer";

const FriendsBar = (props) => {
    return (
        <div className={s.friendsBar}>
            <h3>My Friends</h3>
            <FriendsItemContainer />
        </div>
    )
}

export default FriendsBar;