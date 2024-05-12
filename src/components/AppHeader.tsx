import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import "./AppHeader.css"; // Make sure this path is correct

function AppHeader() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    alert("You have been signed out.");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NEWCHE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Additional navigation links can be placed here */}
          </ul>
          {user ? (
            <div className="dropdown">
              <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.userName}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="dropdown-item">
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
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
