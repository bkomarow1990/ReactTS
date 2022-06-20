import classNames from 'classnames';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react'
import ILogin from './types';
import LoginSchema from './validations';

const LoginPage = () => {
  const initialValues: ILogin = {
    email: "",
    password: ""
  };

  const onHandleSubmit = async (values: ILogin) => {
    console.log(values);

  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: onHandleSubmit,
  });
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
        </Form>
      </FormikProvider>
    </div>
  </div>
  )
}
export default LoginPage;
