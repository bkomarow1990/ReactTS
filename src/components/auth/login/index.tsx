import classNames from 'classnames';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react'
import GoogleLogin, { GoogleLoginResponse, useGoogleLogin } from 'react-google-login';
// import GoogleLogin from 'react-google-login';
import ILogin from './types';
import jwt_decode from 'jwt-decode';
import LoginSchema from './validations';

const LoginPage = () => {
  const initialValues: ILogin = {
    email: "",
    password: ""
  };
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
  const onGoogleSignIn = (user : any) => {
    let userCred = user.credential;
    let payload = jwt_decode(userCred);
  }
  const responseGoogle = (response : any) => {
    console.log(response);
  }
  const onHandleSubmit = async (values: ILogin) => {
    console.log(values);

  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: onHandleSubmit,
  });
  const handleCallbackResponse = (response : any) => {
    console.log(response);
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "1033809612512-uhb2mlvh7kgv0dvcbnmanun0hjfcli8u.apps.googleusercontent.com",
      callback: handleCallbackResponse
  });
  google.accounts.id.renderButton(document.getElementById('signInDiv'))
  },[]);
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
          <GoogleLogin clientId='1033809612512-uhb2mlvh7kgv0dvcbnmanun0hjfcli8u.apps.googleusercontent.com' onSuccess={responseGoogle} onFailure={responseGoogle} cookiePolicy={'single_host_origin'}></GoogleLogin>
        </Form>
      </FormikProvider>
    </div>
  </div>
  )
}
export default LoginPage;
