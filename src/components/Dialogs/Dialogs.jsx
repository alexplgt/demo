import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../Common/FormsControl/FormsControl";
import {maximumLenght, require} from "../../utils/validators/validator";


export const Dialogs = (props) => {

    let userDialog = props.MessagePage.userArray.map(user => <DialogItem id={user.id} name={user.name}/>);
    let userMessage = props.MessagePage.messageArray.map(message => <Message id={message.id} message={message.message}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {userDialog}
            </div>
            <div className={s.messages}>
                {userMessage}
                <DialogForm onSubmit={props.sendNewMessage}/>
            </div>
        </div>
    )
};

const maxLenght8 = maximumLenght(8);

let DialogForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field validate={[require, maxLenght8]} placeholder='Enter your message' component={Textarea} name={'newMessage'}/>
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>
}

DialogForm = reduxForm({form: 'dialogMessage'})(DialogForm);
