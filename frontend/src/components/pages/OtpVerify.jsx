import React from 'react';
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { MdVerified, MdOutlineLockReset } from "react-icons/md";
import { ArrowBack } from "@mui/icons-material";
import CountDown from 'react-countdown';
import './style/OtpVerify.css';
import { useNavigate } from "react-router-dom";
import apis from '../../utils/apis';
import httpAction from '../../utils/httpActions';


const OtpVerify = () => {
    const navigate = useNavigate()
  
  const initialState = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  const validationSchema = Yup.object({
    otp1: Yup.number().required(''),
    otp2: Yup.number().required(''),
    otp3: Yup.number().required(''),
    otp4: Yup.number().required(''),
    otp5: Yup.number().required(''),
    otp6: Yup.number().required('')
  });

    const submitHandler = async (values) => {
  // Combine OTP fields
  const otp = 
    values.otp1 + 
    values.otp2 + 
    values.otp3 + 
    values.otp4 + 
    values.otp5 + 
    values.otp6;

  // Prepare request data
  const data = {
    url: apis().otpVerify,
    method: "POST",
    body: { otp: otp }
  };

  // Make HTTP request
  const result = await httpAction(data);
  console.log(result);

  // Navigate to password update page
  navigate('/update/password')
};

   
  

  const otpArray = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'];

  const inputChange = (value, setFieldValue, index, item) => {
    setFieldValue(item, value);

    if (index >= 0 && index < 5 && value !== "") {
      const nextElement = document.getElementById(`otp-input-${index + 1}`);
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const handleKeyDown = (e, setFieldValue, index, item) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      const prevElement = document.getElementById(`otp-input-${index - 1}`);
      if (prevElement) {
        prevElement.focus();
      }
    }
  };

  const countdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return (
        <Button 
          variant="text" 
          className="resend-button"
          onClick={() => console.log('Resend OTP')}
        >
          Resend OTP
        </Button>
      );
    } else {
      return (
        <span className="countdown-timer">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      );
    }
  };

  return (
    <div className="otp-container">
      <Formik 
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        initialValues={initialState}
      >
        {({ handleBlur, values, touched, errors, setFieldValue }) => (
          <Form>
            <div className="auth_card">
              <div className="container-fluid">
                <div className="header-section">
                  <div className="otp-icon">
                    <MdOutlineLockReset />
                  </div>
                  <p className="welcome-text">Verify OTP</p>
                  <span className="subtitle">
                    Enter the 6 digit OTP we just sent you on email
                  </span>
                </div>

                <div className="otp-inputs-container">
                  {otpArray.map((item, index) => (
                    <TextField
                      key={item}
                      id={`otp-input-${index}`}
                      className="otp-input"
                      inputProps={{ 
                        maxLength: 1, 
                        pattern: "[0-9]",
                        style: { textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }
                      }}
                      value={values[item]}
                      type="text"
                      name={item}
                      onBlur={handleBlur}
                      error={touched[item] && Boolean(errors[item])}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        inputChange(value, setFieldValue, index, item);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, setFieldValue, index, item)}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </div>

                <div className="button-section">
                  <Button 
                    disabled={Object.values(values).some((value) => value === "")}
                    variant="contained" 
                    type="submit"
                    className="verify-button"
                    fullWidth
                  >
                    <MdVerified style={{ marginRight: '8px' }} />
                    Verify
                  </Button>
                </div>

                <div className="footer-section">
                  <Button
                    startIcon={<ArrowBack />}
                    variant="outlined"
                    fullWidth
                    className="back-button"
                     onClick={()=> navigate('/')}
                  >
                    Back to Login
                  </Button>

                  <div className="countdown-section">
                    <span className="resend-text">Didn't receive code? </span>
                    <CountDown 
                      renderer={countdownRenderer}
                      date={Date.now() + 120000} // 2 minutes from now
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OtpVerify;