import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FiTrash2 } from "react-icons/fi";
const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', start_date: '', end_date: '' });

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/projects', newProject);
      console.log('Project created:', response.data);
      fetchProjects();
      setNewProject({ name: '', description: '', start_date: '', end_date: '' });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/projects/${taskId}`);
      fetchProjects(); 
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Gestion des Projets</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nom du projet"
            value={newProject.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newProject.description}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="start_date"
            value={newProject.start_date}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="end_date"
            value={newProject.end_date}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
        >
          Ajouter Projet
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Date de début</th>
              <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Date de fin</th>
              <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="even:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{project.name}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{project.description}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{project.start_date}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{project.end_date}</td>
                <td className=" border-gray-300 px-4 py-2">
                  <button className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(project.id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManagement;
