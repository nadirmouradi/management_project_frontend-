import React, { useState } from "react";

import {
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import TaskManagement from "./TaskManagement";
import ProjectManagement from "./ProjectManagement";
import MemberManagement from "./MemberManagement";
import GroupManagement from "./GroupManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-blue-600 text-white w-64 space-y-6 py-7 px-2">
        <div className="text-2xl font-bold text-center">Admin Dashboard</div>
        <nav>
          <button
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 ${
              activeTab === "projects" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleTabClick("projects")}
          >
            <FaProjectDiagram className="inline-block mr-2" /> Gestion des Projets
          </button>
          <button
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 ${
              activeTab === "tasks" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleTabClick("tasks")}
          >
            <FaTasks className="inline-block mr-2" /> Gestion des Tâches
          </button>
          <button
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 ${
              activeTab === "groupes" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleTabClick("groupes")}
          >
            <FaUsers className="inline-block mr-2" /> Gestion des Groupes
          </button>
          <button
            className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 ${
              activeTab === "members" ? "bg-blue-700" : ""
            }`}
            onClick={() => handleTabClick("members")}
          >
            <FaUsers className="inline-block mr-2" /> Gestion des Membres
          </button>
          <button
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
          >
            <FaUserCircle className="inline-block mr-2" /> Profil
          </button>
          <button
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
          >
            <FaSignOutAlt className="inline-block mr-2" /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4">Bienvenue, Admin</h1>
        {activeTab === "tasks" && <TaskManagement />}
        {activeTab === "projects" && <ProjectManagement />}
        {activeTab === "groupes" && <GroupManagement />}
        {activeTab === "members" && <MemberManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
