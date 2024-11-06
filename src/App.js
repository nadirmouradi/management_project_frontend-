import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import OtpVerification from "./components/auth/OtpVerification";
import AdminDashboard from "./components/admin/AdminDashboard";
import MemberDashboard from "./components/member/MemberDashboard"; // Import the MemberDashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} /> {/* Add the route for MemberDashboard */}
      </Routes>
    </Router>
  );
}

export default App;
