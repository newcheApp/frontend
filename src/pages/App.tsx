import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import SideBanner from "../components/SideBanner";
import AuthPage from "./AuthPage";
import MyFeed from "./MyFeed";
import MainPage from "./MainPage";
import CategoryNews from "./CatagoryNews";
import { AuthProvider } from "../pages/AuthContext";
import "./App.css";
import UpdateUserInfo from "./UpdateUserInfo";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <div className="header-container">
            <AppHeader />
          </div>
          <div className="content-container">
            <SideBanner />
            <div className="news-container">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/myfeed" element={<MyFeed />} />
                <Route
                  path="/category/:categoryId"
                  element={<CategoryNews />}
                />
                <Route path="/update-user-info" element={<UpdateUserInfo />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
