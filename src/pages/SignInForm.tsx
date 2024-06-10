import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignInForm.css";

const SignInForm = () => {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Attempting to sign in with:", credentials);

    try {
      const response = await fetch(
        "http://localhost:4242/auth/validate-credentials",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("Sign in response:", data);

      if (data === true) {
        const userResponse = await fetch(
          `http://localhost:4242/api/users/getByEmail/${credentials.identifier}`
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        console.log("Retrieved user data:", userData);
        signIn(userData);
        navigate("/");
      } else {
        alert("Sign in failed! Incorrect username or password.");
      }
    } catch (error) {
      console.error("Sign in failed:", error);
      setError("Sign in failed! Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {error && <div className="error">{error}</div>}
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
