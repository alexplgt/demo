import React from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader";
import {StatusWithHooks} from "./StatusWithHooks";
import defaultAvatar from "../../../Assets/Images/defaultAvatar.jpg";


const ProfileInfo = props => {

    const setPhoto = (e) => {
        if (e.target.files.length) {
            props.uploadPhoto(e.target.files[0]);
        }
    };

    return ((!props.profile) ? <Preloader/> :
            <div className={s.profile}>
                <div className={s.profileImgContainer}>
                    <img className={s.profileImg} src={props.profile.photos.large || props.profile.photos.small || defaultAvatar }/>
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

                </div>
            </div>
    )
};

export default ProfileInfo;