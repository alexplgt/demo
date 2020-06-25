import React from "react";
import s from "./Post.module.css"

const Post = (props) => {
    return (
        <div className={s.post}>
            <img className={s.avaImg} src='https://im0-tub-ru.yandex.net/i?id=1ee5224756ea8cb23805dce375bbb030&n=13'/>
            {props.message}
            <div>
            Like {props.likesCount}
            </div>
        </div>
    )
}

export default Post;