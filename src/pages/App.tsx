import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import SideBanner from "../components/SideBanner";
import AuthPage from "./AuthPage";
import MyFeed from "./MyFeed";
import { AuthProvider } from "../pages/AuthContext";
import "./App.css";
import MainPage from "./MainPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <AppHeader />
          <div className="content-container">
            <SideBanner />
            <div className="news-container">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/myfeed" element={<MyFeed />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
