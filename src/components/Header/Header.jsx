import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={s.header}>
                <img className={s.logo} src='https://st.depositphotos.com/1000955/1261/i/450/depositphotos_12612987-stock-photo-vintage-compass-on-white-background.jpg' alt='logo'/>
            <h1 className={s.text}>Foreign Friend</h1>
            <div>
                {(props.isAuth)
                    ? <span>{props.login}<button onClick={props.onLogout}>Logout</button> </span>
                    : <NavLink to='/login'>LOGIN</NavLink>}
            </div>
        </header>
    )
};

export default Header;