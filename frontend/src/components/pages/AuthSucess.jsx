// src/pages/AuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Authentication failed");
      navigate("/");
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
};

export default AuthSuccess;
