import React from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader";
import {StatusWithHooks} from "./StatusWithHooks";
import defaultAvatar from "../../../Assets/Images/defaultAvatar.jpg";


const ProfileInfo = React.memo(props => {

    const setPhoto = (e) => {
        if (e.target.length) {
            props.uploadPhoto(e.target[0])
        }
    };

    return ((!props.profile) ? <Preloader/> :
            <div className={s.profile}>
                <div className={s.profileImgContainer}>
                    <img className={s.profileImg}
                         src='https://avatars.mds.yandex.net/get-pdb/1366634/4fe35daf-c4a8-4400-94b2-057b9d8c46a0/s1200'/>
                </div>
                <div>
                    <img src={props.profile.photos.large || props.profile.photos.small || defaultAvatar }/>
                    {props.isOwner && <input type={'file'} onChange={setPhoto}/>}
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
});

export default ProfileInfo;