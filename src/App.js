import React, {Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
/*import News from "./components/News/News";*/
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {getInitializeApp} from "./Redux/appReducer";
import Preloader from "./components/common/Preloader";
import {compose} from "redux";

const News = React.lazy(() => import('./components/News/News') )


class App extends React.Component {

    componentDidMount() {
        this.props.getInitializeApp()
    }

    render() {

        if (!this.props.isInitialized) {
            return <Preloader/>
        }
        return (
            <section className='background-land'>
                <div className='app-Wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-Wrapper-Content'>
                        <Route path='/profile/:userId?'
                               render={() => <ProfileContainer/>}/>
                        <Route path='/messages'
                               render={() => <DialogsContainer/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Suspense fallback={<Preloader/>}>
                            <Route path='/news' render={() => <News/>}/>
                        </Suspense>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                    </div>
                </div>
            </section>
        )
    }

}

let mapStateToProps = (state) => ({
    isInitialized: state.app.isInitialized
});

export default compose(
    connect(mapStateToProps, {getInitializeApp})
) (App);
