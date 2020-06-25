import React, {useEffect, useState} from "react";

export const StatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(()=>{
        setStatus(props.status)
    }, [props.status]);

    let editModeOn = () => {
        setEditMode(true)
    };

    let editModeOff = () => {
        setEditMode(false);
        props.setUserStatusThunk(status)
    };

    let changeStatus = (e) => {
        setStatus(e.target.value)
    };

    return <div>
        {editMode && <div>
            <input onChange={changeStatus} onBlur={editModeOff} value={status}/>
        </div>}
        {!editMode && <div>
            <span onDoubleClick={editModeOn}>{status || 'Enter your status'}</span>
        </div>}

    </div>
};


