import React from "react";
import s from './FormsControl.module.css'

export const Input = ({input, meta, ...props}) => {
    return (
        <div className={meta.error && meta.touched && s.error}>
            <input {...input} {...props}/>
            {meta.error && meta.touched && <div className={s.errorMessage}>{meta.error}</div>}
        </div>
    )
};

export const Textarea = ({input, meta, ...props}) => {
    return (
        <div className={meta.error && meta.touched && s.error}>
            <textarea {...input} {...props}/>
            {meta.error && meta.touched && <div className={s.errorMessage}>{meta.error}</div>}
        </div>
    )
};