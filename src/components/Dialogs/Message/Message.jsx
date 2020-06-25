import React from "react";
import s from './../Dialogs.module.css'




const Message = (props) => {
    return (
        <div className={s.message}>
            <div>Message number {props.id}</div>
            {props.message}
        </div>
    )
};

export default Message;