import React from "react";

export class Status extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    };

    editModeOn = () => {
        this.setState ({editMode: true})
    };

    editModeOff = () => {
        this.setState ({editMode: false});
        this.props.setUserStatusThunk(this.state.status)
    };

    changeLocalStatus = (e) => {
        this.setState({status: e.target.value})
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }


    render(){
        return <div>
            {this.state.editMode && <div>
                <input onChange={this.changeLocalStatus} onBlur={this.editModeOff} value={this.state.status}/>
                </div> }
            {!this.state.editMode && <div>
                <span onDoubleClick={this.editModeOn}>{this.state.status || 'Enter your status'}</span>
            </div>}

        </div>
    }

}
