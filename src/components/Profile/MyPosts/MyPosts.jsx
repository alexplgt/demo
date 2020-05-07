import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maximumLenght, require} from "../../../utils/validators/validator";
import {Input} from "../../../Common/FormsControl/FormsControl";


export const MyPosts = (props) => {

    let post = props.profilePage.postArray.map(post => <Post message={post.message} likesCount={post.likesCount}/>).reverse();


    return (
        <div className={s.post}>
            <AddPostForm onSubmit={props.addPostActionCreator}/>
            {post}
        </div>
    )
};

const maxLenght15 = maximumLenght(15);

let AddPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field validate={[require, maxLenght15]} placeholder={'Enter your message'} component={Input} name={'newPost'}/>
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>
};

AddPostForm = reduxForm({form: 'newProfilePost'})(AddPostForm);
