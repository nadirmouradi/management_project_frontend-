import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaProjectDiagram, FaTasks, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import TaskDashboard from "./TaskDashboard";
import ProjectDashboard from "./ProjectDashboard";
import ProfileDashboard from "./profileDashboard";
import { Navigate, useNavigate } from 'react-router-dom';


const MemberDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [profile, setProfile] = useState(null);
  const [userName, setUserName] = useState('');

  // Get token and user info from sessionStorage
  const token = sessionStorage.getItem("token");
  
  const user = JSON.parse(sessionStorage.getItem("user"));
  const Navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserName(`${user.nom} ${user.prenom}`);
      fetchProfile(user.id); // Use user ID to fetch profile
    }
  }, [user]);

  const fetchProfile = async (memberId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/members/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();

    // Redirect to the login page
    Navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-blue-600 text-white w-64 space-y-6 py-7 px-2">
        <div className="text-2xl font-bold text-center">Membre Dashboard</div>
        <nav>
          <button
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 ${
              activeTab === "projects" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleTabClick("projects")}
          >
            <FaProjectDiagram className="inline-block mr-2" /> Mes Projets
          </button>
          <button
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 ${
              activeTab === "tasks" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleTabClick("tasks")}
          >
            <FaTasks className="inline-block mr-2" /> Mes Taches
          </button>
          <button
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 ${
              activeTab === "profile" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleTabClick("profile")}
          >
            <FaUserCircle className="inline-block mr-2" /> Profile
          </button>
          <button
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="inline-block mr-2" /> Deconnexion
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl mb-4">Bienvenue, {userName}</h1>
        {activeTab === "projects" && <ProjectDashboard />}
        {activeTab === "tasks" && <TaskDashboard />}
        {activeTab === "profile" && <ProfileDashboard />}
         
      </div>
    </div>
  );
};

export default MemberDashboard;
