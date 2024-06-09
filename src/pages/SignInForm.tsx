import React, { useState } from "react";
import { useAuth, User } from "./AuthContext"; // Ensure User is imported here
import "./AuthPage.css"; // Using the shared CSS file

interface SignInCredentials {
  identifier: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const [credentials, setCredentials] = useState<SignInCredentials>({
    identifier: "",
    password: "",
  });
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4242/api/auth/validate-credentials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const user: User = await response.json();
      signIn(user); // Update the auth context with the user details
    } catch (error) {
      console.error("Failed to sign in:", error);
      setError("Failed to sign in: Invalid credentials");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        {error && <div className="error">{error}</div>}
        <div>
          <label htmlFor="identifier">Email or Username:</label>
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
