import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import "./AppHeader.css";

function AppHeader() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    alert("You have been signed out.");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NEWCHE
        </Link>
        <div className="navbar-right">
          {user ? (
            <>
              <span className="welcome-message">Welcome {user.userName}</span>
              <button onClick={handleSignOut} className="btn sign-out-btn">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/auth" className="auth-link">
              Sign In / Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AppHeader;
