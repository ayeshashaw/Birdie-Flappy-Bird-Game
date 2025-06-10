import React from 'react';
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { MdUpdate } from "react-icons/md";
import { ArrowBack } from "@mui/icons-material";
import './style/UpdatePassword.css';

const UpdatePassword = () => {
  const initialState = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <div className="update-password-container">
      <Formik
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        initialValues={initialState}
      >
        {({ handleBlur, handleChange, values, touched, errors }) => (
          <Form>
            <div className="auth_card">
              <div className="container-fluid">
                <div className="header-section">
                  <div className="update-icon">
                    <MdUpdate />
                  </div>
                  <p className="welcome-text">Update Password</p>
                  <span className="subtitle">Create your new secure password</span>
                </div>

                <div className="form-field">
                  <TextField
                    name="password"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    label="New Password"
                    fullWidth
                    size="small"
                    variant="outlined"
                    className="password-input"
                  />
                </div>

                <div className="form-field">
                  <TextField
                    name="confirmPassword"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    label="Confirm New Password"
                    fullWidth
                    size="small"
                    variant="outlined"
                    className="password-input"
                  />
                </div>

                <div className="button-section">
                  <Button 
                    variant="contained" 
                    fullWidth 
                    type="submit"
                    className="update-button"
                    disabled={Object.values(values).some((value) => value === "")}
                  >
                    <MdUpdate style={{ marginRight: '8px' }} />
                    Update Password
                  </Button>
                </div>

                <div className="footer-section">
                  <Button
                    startIcon={<ArrowBack />}
                    variant="outlined"
                    fullWidth
                    className="back-button"
                    onClick={() => console.log('Back to login')}
                  >
                    Back to Login
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePassword;