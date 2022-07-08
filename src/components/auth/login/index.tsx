import classNames from 'classnames';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin } from 'react-google-login';
// import GoogleLogin from 'react-google-login';
import ILogin, { ILoginError } from './types';
//import jwt_decode from 'jwt-decode';
import LoginSchema from './validations';
import { gapi } from 'gapi-script';
import axios from 'axios';
import { useActions } from '../../../hooks/useActions';
import { useNavigate } from 'react-router-dom';

const LoginPage : React.FC = () => {
  const initialValues: ILogin = {
    email: "",
    password: ""
  };
  const { LoginUser } = useActions();
  const navigate = useNavigate();
  useEffect(()=> {
    //console.log("Hello", process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID);
    const start = () => {
        gapi.client.init({
            clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
            scope: ''
        });
    }
    gapi.load('client:auth2', start);
}, []);
  // const { signIn, loaded } = useGoogleLogin({
  //   onSuccess,
  //   onAutoLoadFinished,
  //   clientId,
  //   cookiePolicy,
  //   loginHint,
  //   hostedDomain,
  //   autoLoad,
  //   isSignedIn,
  //   fetchBasicProfile,
  //   redirectUri,
  //   discoveryDocs,
  //   onFailure,
  //   uxMode,
  //   scope,
  //   accessType,
  //   responseType,
  //   jsSrc,
  //   onRequest,
  //   prompt
  // });
  // const onGoogleSignIn = (user : any) => {
  //   let userCred = user.credential;
  //   let payload = jwt_decode(userCred);
  // }
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
    axios.post('https://localhost:44382/api/Account', {idToken: (response as GoogleLoginResponse).tokenId}).then(res => {console.log(res)}).catch(err => console.log(err))
  }
  const onHandleSubmit = async (values: ILogin) => {
    console.log(values);
    try{
    await LoginUser(values);
    await navigate('/');
    }
    catch(errors){
      console.log(errors);
      const serverErrors = errors as ILoginError;
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: onHandleSubmit,
  });
  // const handleCallbackResponse = (response : any) => {
  //   console.log(response);
  // }
  // useEffect(() => {
  //   google.accounts.id.initialize({
  //     client_id: "1033809612512-uhb2mlvh7kgv0dvcbnmanun0hjfcli8u.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  // });
  // google.accounts.id.renderButton(document.getElementById('signInDiv'))
  // },[]);
  const { errors, touched, handleSubmit, handleChange, setFieldValue } = formik;
  return (
    <div className="row">
    <div className="offset-md-3 col-md-6">
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className={classNames(
                "form-control",
                { "is-invalid": touched.email && errors.email },
                { "is-valid": touched.email && !errors.email }
              )}
            />
            {touched.email && errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className={classNames(
                "form-control",
                { "is-invalid": touched.password && errors.password },
                { "is-valid": touched.password && !errors.password }
              )}
            />
            {touched.password && errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID as string} onSuccess={responseGoogle} onFailure={responseGoogle} cookiePolicy={'single_host_origin'}></GoogleLogin>
        </Form>
      </FormikProvider>
    </div>
  </div>
  )
}
export default LoginPage;
