import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestion des Projets</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="name" placeholder="Nom du projet" value={newProject.name} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 mr-2" />
        <input type="text" name="description" placeholder="Description" value={newProject.description} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 mr-2" />
        <input type="date" name="start_date" value={newProject.start_date} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 mr-2" />
        <input type="date" name="end_date" value={newProject.end_date} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 mr-2" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Ajouter Projet</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Date de début</th>
              <th className="border border-gray-300 px-4 py-2">Date de fin</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="border border-gray-300 px-4 py-2">{project.name}</td>
                <td className="border border-gray-300 px-4 py-2">{project.description}</td>
                <td className="border border-gray-300 px-4 py-2">{project.start_date}</td>
                <td className="border border-gray-300 px-4 py-2">{project.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManagement;
