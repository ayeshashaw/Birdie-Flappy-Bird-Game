const apis = () => ({
  registerUser: '/users/register',
  loginUser: '/users/login',
  userProfile: '/users/get-user',
  saveScore: '/api/scores/save',
  getUserHighestScore: '/api/scores/my-highest',
  logout: '/users/logout',
  forgetPassword: '/users/forget',
  otpVerify: '/users/otp/verify',
});


export default apis;
