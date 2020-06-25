import React from "react";
import {connect} from "react-redux";
import {
    followThunk, getUsers, onFollowButtonDisable,
    setCurrentPage,
    setIsLoading,
    setTotalCount,
    unfollowThunk
} from "../../Redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getCurrentPage, getTotalCount} from "../../Redux/usersSelectors";



class UsersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize)
    };

    componentWillUnmount() {
        this.props.setCurrentPage(1)
    }

    onPageChange = (activePage) => {
        const {pageSize} = this.props;
        this.props.getUsers(activePage, pageSize)
    };

    render() {
        return <>
            {this.props.isLoading ? <Preloader/> : null}
            <Users
                totalCount={this.props.totalCount}
                pageSize={this.props.pageSize}
                users={this.props.users}
                currentPage={this.props.currentPage}
                onPageChange={this.onPageChange}
                disabledButtons={this.props.disabledButtons}
                followThunk={this.props.followThunk}
                unfollowThunk={this.props.unfollowThunk}
                isAuth={this.props.isAuth}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        currentPage: getCurrentPage(state), //refactor to selectors for example
        totalCount: getTotalCount(state), //refactor to selectors for example
        pageSize: state.usersPage.pageSize,
        disabledButtons: state.usersPage.disabledButtons,
    }
}

export default compose(
    connect(mapStateToProps,
        {
            setCurrentPage,
            setIsLoading,
            setTotalCount,
            onFollowButtonDisable,
            getUsers,
            followThunk,
            unfollowThunk
        }),
    withAuthRedirect
)(UsersContainer)




