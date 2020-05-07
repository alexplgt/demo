import React from "react";
import s from './Users.module.css'
import defaultAvatar from '../../Assets/Images/defaultAvatar.jpg'
import {NavLink, Redirect} from "react-router-dom";
import Pagination from "../../Common/Pagination/Pagination";


const Users = (props) => {

    if (!props.isAuth) return <Redirect to='/login'/>;

    return <div>
        <Pagination totalCount={props.totalCount} pageSize={props.pageSize}
                    currentPage={props.currentPage} onPageChange={props.onPageChange}/>
        {
            props.users.map(u => <div className={s.users} key={u.id}>
               <span>
                   <div>
                       <NavLink to={`/profile/${u.id}`}>
                   <img
                       src={u.photos.small != null ? u.photos.small : defaultAvatar}
                       alt="ava"/>
                       </NavLink>
                   </div>
                   <div>
                       {u.followed ? <button disabled={props.disabledButtons.some(p => p === u.id)}
                                             onClick={() => {
                                                 props.unfollowThunk(u.id)
                                             }}>Unfollow</button> :
                           <button disabled={props.disabledButtons.some(p => p === u.id)}
                                   onClick={() => {
                                       props.followThunk(u.id)
                                   }}>Follow</button>}
                   </div>
                   <div>
                       {u.name}
                   </div>
               </span>
            </div>)
        }

    </div>

};


export default Users;