import React, {useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader";
import {StatusWithHooks} from "./StatusWithHooks";
import defaultAvatar from "../../../Assets/Images/defaultAvatar.jpg";
import {Field, reduxForm} from "redux-form";


const ProfileInfo = props => {

    let [editMode, setEditMode] = useState(false);

    let onSubmit = (formData) => {
        props.saveProfileData(formData).then(() => setEditMode(false))
    };

    const setPhoto = (e) => {
        if (e.target.files.length) {
            props.uploadPhoto(e.target.files[0]);
        }
    };

    return ((!props.profile) ? <Preloader/> :
            <div className={s.profile}>
                <div className={s.profileImgContainer}>
                    <img className={s.profileImg} src={props.profile.photos.large || props.profile.photos.small || defaultAvatar } alt={'avatar'}/>
                    {props.isOwner && <input className={s.imageSetButton} type={'file'} onChange={setPhoto}/>}
                </div>
                <div>
                        <div>
                        {props.profile.fullName}
                    </div>
                    <div>
                        {props.profile.aboutMe}
                    </div>
                    <div>
                        <StatusWithHooks {...props}/>
                    </div>
                    <div>
                        {editMode? <ProfileFormEdit initialValues={props.profile} onSubmit={onSubmit} profile={props.profile}/>
                        : <ProfileForm isOwner={props.isOwner} turnOnEditMode={() => setEditMode(true)} profile={props.profile}/>}
                    </div>

                </div>
            </div>
    )
};

const ProfileForm = (props) => {
    debugger
    return <>
        <div><b>Name:</b>{props.profile.fullName} </div>
        <div><b>About Me:</b>{props.profile.aboutMe} </div>
        <div><b>Looking for a job:</b>{props.profile.lookingForAJob ? 'yes' : 'no'} </div>
        <div><b>Job description:</b>{props.profile.lookingForAJobDescription} </div>
        <div>
            <b>Contacts:</b>{Object.keys(props.profile.contacts).map(key => {
            return <div className={s.contacts} key={key}>
                <b>{key}:</b>{props.profile.contacts[key]}
                </div>
        })}
        </div>
        {props.isOwner && <button onClick={props.turnOnEditMode}>Edit</button>}
    </>
};

const EditForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <b>Name:</b>
            <Field name={'fullName'} component={'input'} placeholder={'Name'}/>
        </div>
        <div>
            <b>About Me:</b>
            <Field name={'aboutMe'} component={'input'} placeholder={'About me'}/>
        </div>
        <div>
            <b>Looking for a job:</b>
            <Field name={'lookingForAJob'} component={'input'} type={'checkbox'}/>
        </div>
        <div>
            <b>Job description:</b>
            <Field name={'lookingForAJobDescription'} component={'input'} placeholder={'Job description'}/>
        </div>
        <div>
            <b>Contacts:</b>{Object.keys(props.profile.contacts).map(key => {
            return <div className={s.contacts} key={key}>
                <b>{key}:</b>
                <Field placeholder={key} name={'contacts.'+key} component={'input'}/>
            </div>
        })}
        </div>
        <button>Submit</button>
    </form>
};

let ProfileFormEdit = reduxForm({form: 'profile'})(EditForm);

export default ProfileInfo;
