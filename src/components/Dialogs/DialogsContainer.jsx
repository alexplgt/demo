import React from "react";
import {sendNewMessage} from "../../Redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        MessagePage: state.messagePage,

    }
};

class DialogsContainer extends React.Component {
    render() {
        return <Dialogs {...this.props}/>
    }
}

export default compose(
    connect(mapStateToProps, {sendNewMessage}),
    withAuthRedirect
)(DialogsContainer)


