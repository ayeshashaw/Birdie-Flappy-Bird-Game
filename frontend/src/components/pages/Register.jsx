import React from "react";
import { TextField, Button, Divider } from "@mui/material";
import { Google, ArrowBack } from "@mui/icons-material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { IoIosPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; 
import httpAction from "../../utils/httpActions";
import apis from "../../utils/apis";
import './style/Login.css'

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const submitHandler = async (values) => {
    try {
      const data = {
        url: apis().registerUser,
        method: "POST",
        body: values,
      };

      const result = await httpAction(data);
      console.log("Registration result:", result); // Debug log
      
      // Check for both success and status properties
      if (result?.success || result?.status) {
        toast.success(result?.message || "Registration successful!");
        navigate("/");
      } else {
        // Handle error case
        toast.error(result?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
    }
  };

  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="register-container">
      <div>
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
                    <div className="register-icon">
                      <IoIosPersonAdd />
                    </div>
                    <p className="welcome-text">Create new account</p>
                    <span className="subtitle">Signup to continue</span>
                  </div>

                  <div className="form-field">
                    <TextField
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      label="Your name"
                      fullWidth
                      variant="outlined"
                    />
                  </div>

                  <div className="form-field">
                    <TextField
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      label="Your email"
                      fullWidth
                      variant="outlined"
                    />
                  </div>

                  <div className="form-field">
                    <TextField
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      label="Your password"
                      fullWidth
                      variant="outlined"
                    />
                  </div>

                  <div className="form-field">
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      className="register-button"
                    >
                      Create Account
                    </Button>
                  </div>

                  <div className="divider-section">
                    <Divider>OR</Divider>
                  </div>

                  <div className="form-field">
                    <Button
                      onClick={loginWithGoogle}
                      variant="outlined"
                      fullWidth
                      endIcon={<Google />}
                      className="google-button"
                    >
                      Continue with Google
                    </Button>
                  </div>

                  <div className="form-field">
                    <Button
                      onClick={() => navigate("/")}
                      startIcon={<ArrowBack />}
                      variant="outlined"
                      fullWidth
                      className="back-button"
                    >
                      Back to Login
                    </Button>
                  </div>

                  <div className="form-field">
                    <Button
                      onClick={() => navigate("/forgetpassword")}
                      variant="text"
                      color="error"
                      className="forgot-password"
                    >
                      Forgot password?
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;