import React, { useState } from "react";
import { MdLogin, MdArrowBack, MdOutlinePassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import httpAction from "../../utils/httpActions";
import apis from "../../utils/apis";
import './style/Login.css'

const initialState = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const loginWithGoogle = ()=>{
  window.location.href = 'https://birdie-flappy-bird-game.onrender.com/auth/google'
}

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (values) => {
    try {
      const data = {
        url: apis().loginUser,
        method: "POST",
        body: values,
      };
  
      const result = await httpAction(data);
      if (result?.success) {
        toast.success(result?.message);
        localStorage.setItem('token', result?.accessToken);
        navigate("/dashboard");
      } else {
        toast.error(result?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="login-container">
      <Formik
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        initialValues={initialState}
      >
        {({ handleBlur, handleChange, handleSubmit, values, touched, errors }) => (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth_card">
              <div className="container-fluid">
                <div className="header-section">
                  <div className="login-icon">
                    <MdLogin className="login-icon-svg" />
                  </div>
                  <h1 className="welcome-text">Welcome back</h1>
                  <span className="subtitle">Login to continue</span>
                </div>

                <div className="form-field">
                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your email"
                      className={`form-input ${touched.email && errors.email ? 'error' : ''}`}
                    />
                    {touched.email && errors.email && (
                      <div className="error-message">{errors.email}</div>
                    )}
                  </div>
                </div>

                <div className="form-field">
                  <div className="input-group">
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your password"
                        className={`form-input ${touched.password && errors.password ? 'error' : ''}`}
                      />
                      <button 
                        type="button" 
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        <MdOutlinePassword />
                      </button>
                    </div>
                    {touched.password && errors.password && (
                      <div className="error-message">{errors.password}</div>
                    )}
                  </div>
                </div>


                <div className="form-field">
                  <button 
                    type="submit"
                    className="login-button"
                  >
                    Login
                  </button>
                </div>

                <div className="divider-section">
                  <div className="divider">OR</div>
                </div>


                <div className="form-field">
                  <button 
                    type="button"
                    onClick={loginWithGoogle}
                    className="google-button"
                  >
                    <FcGoogle className="google-icon" />
                    Continue with Google
                  </button>
                </div>


                <div className="form-field">
                  <button 
                    type="button"
                    onClick={() => navigate('/register')}
                    className="signup-button"
                  >
                    <MdArrowBack className="back-icon" />
                    Create new account
                  </button>
                </div>


                <div className="form-field">
                  <button 
                    type="button"
                    onClick={() => navigate('/forgetpassword')}
                    className="forgot-password"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
