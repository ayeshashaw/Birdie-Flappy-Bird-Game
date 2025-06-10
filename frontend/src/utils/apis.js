const apis = () => {
  const base = import.meta.env.VITE_API_BASE_URL || '';

  return {
    registerUser: `${base}/users/register`,
    loginUser: `${base}/users/login`,
    userProfile: `${base}/users/get-user`,
    saveScore: `${base}/api/scores/save`,
    getUserHighestScore: `${base}/api/scores/my-highest`,
    logout: `${base}/users/logout`,
    forgetPassword: `${base}/users/forget`,
    otpVerify: `${base}/users/otp/verify`,
  };
};

export default apis;
