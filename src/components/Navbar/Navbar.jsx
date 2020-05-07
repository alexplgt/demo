import React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import FriendsBar from "./FriendsBar/FriendsBar";

const NavWay = (props) => {
    return (
        <div className={s.item}>
            <NavLink to={props.way} activeClassName={s.activeLink}> {props.name} </NavLink>
        </div>
    )
}

const Navbar = (props) => {
    return (
        <nav className={s.nav}>
            <NavWay way='/profile' name='Profile'/>
            <NavWay way='/users' name='Users'/>
            <NavWay way='/messages' name='Messages'/>
            <NavWay way='/news' name='News'/>
            <NavWay way='/music' name='Music'/>
            <NavWay way='/settings' name='Settings'/>
        </nav>
    )
};

export default Navbar;