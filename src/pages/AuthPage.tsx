import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import "./AuthPage.css";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // false shows SignInForm, true shows SignUpForm

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div>
      {isSignUp ? <SignUpForm /> : <SignInForm />}
      <button onClick={toggleForm} className="btn btn-link">
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default AuthPage;
