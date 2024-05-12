import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import "./SignInForm.css";

const SignInForm = () => {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const { signIn } = useAuth();

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("Attempting to sign in with:", credentials);

    // Validate credentials and possibly retrieve user data
    fetch("http://localhost:4242/auth/validate-credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Sign in response:", data);
        if (data === true) {
          // Fetch user data from another endpoint if necessary
          fetch(
            `http://localhost:4242/api/users/getByEmail/${credentials.identifier}`
          )
            .then((response) => response.json())
            .then((userData) => {
              console.log("Retrieved user data:", userData); // Log user data
              signIn(userData); // Store user data in context
              alert("Sign in successful!");
            })
            .catch((error) => {
              console.error("Failed to retrieve user data:", error);
              alert("Failed to retrieve user data.");
            });
        } else {
          alert("Sign in failed! Incorrect username or password.");
        }
      })
      .catch((error) => {
        console.error("Sign in failed:", error);
        alert("Sign in failed!");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div>
          <label htmlFor="identifier">Email:</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={credentials.identifier}
            onChange={handleInputChange}
            placeholder="Enter your username or email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
