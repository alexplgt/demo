import React from "react";
import {Field, reduxForm} from "redux-form";
import {require} from "../../utils/validators/validator";
import {Input} from "../../Common/FormsControl/FormsControl";
import {onLogin} from "../../Redux/authReducer";
import {connect} from "react-redux";
import s from '../../Common/FormsControl/FormsControl.module.css'
import {Redirect} from "react-router-dom";


export const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field validate={[require]} placeholder={'email'} component={Input} name={'email'}/>
        </div>
        <div>
            <Field validate={[require]} placeholder={'password'} component={Input} name={'password'} type={'password'}/>
        </div>
        <div>
            <Field component={'input'} type={'checkbox'} name={'rememberMe'}/> Remember me
        </div>
        <div>
            <button>Submit</button>
        </div>
        {props.captchaUrl && <div>
            <img src={props.captchaUrl} alt={'captcha'}/>
            <Field component={Input} name={'captcha'} validate={[require]}/>
        </div>}
        {(props.error ? <div className={s.commonErrorMessage}>{props.error}</div> : null)}

    </form>
};

let LoginFormCreate = reduxForm({form: "Login"})(LoginForm);

const Login = (props) => {

    const onSubmit = (formData) => {
        props.onLogin(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };

    if (props.auth) {
        return (<Redirect to={'/profile'}/>)
    }else {
        return <div>
            <h1>LOGIN</h1>
            <LoginFormCreate captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
        </div>
    }
};

let mapStateToProps = (state) => ({
    auth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {onLogin})(Login)