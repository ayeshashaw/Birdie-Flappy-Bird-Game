import React from "react";
// import useNavigate
import { useNavigate } from "react-router-dom";
const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>The page youre looking for doesnt exist </h1>

      <button onClick={() => navigate("/")}>Back to home?</button>
    </div>
  );
};

export default Notfound;
