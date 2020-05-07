import React from "react";
import {connect} from "react-redux";
import {getUserProfileThunk, getUserStatusThunk, setUserStatusThunk} from "../../Redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {Profile} from "./Profile";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedId;
            if (!userId){this.props.history.push('/login')}
        }

        this.props.getUserProfileThunk(userId);
        this.props.getUserStatusThunk(userId)
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.userId !== this.props.match.params.userId
            || prevProps.authorizedId !== this.props.authorizedId)
        {this.props.history.push('/login')}
    };



    render() {
        return (
            <div>
                <Profile {...this.props}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authorizedId: state.auth.id,
        isOwner: this.props.match.params.userId
    }
};

export default compose(
    connect(mapStateToProps, {getUserProfileThunk, getUserStatusThunk, setUserStatusThunk, uploadPhoto}),
    withRouter
)(ProfileContainer)

