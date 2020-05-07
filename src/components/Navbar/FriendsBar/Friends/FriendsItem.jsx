import React from "react";
import s from './FriendsItem.module.css'

const FriendsItem = (props) => {
        return <div className={s.friendsBarContainer}>
                {props.users.map(f => (f.followed) ? (
                    <div>
                        <img className={s.avalogo}
                             src={f.photos.small}
                             alt='ava'/>
                        <div>{f.name}</div>
                    </div>) : null)}
            </div>

    }


export default FriendsItem;