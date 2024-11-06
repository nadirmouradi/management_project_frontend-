import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiFileText, FiCalendar, FiInfo, FiEye } from 'react-icons/fi';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${user.id}/projects`);
        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user.id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='mt-20'>
      <h2 className="text-xl mb-6 text-gray-400">Projets Assignés</h2>
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <FiFileText className="text-blue-600 text-2xl" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
              <p className="text-gray-600 text-sm">{project.description}</p>
              
            </div>
            <button
              onClick={() => setSelectedProject(project)}
              className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition flex"
            >
             <FiEye className="mr-2 mt-1" /> Voir Détails
            </button>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <FiInfo className="mr-2 text-blue-600" /> Project Details
          </h3>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">{selectedProject.name}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{selectedProject.description}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{formatDate(selectedProject.start_date)}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{formatDate(selectedProject.end_date)}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center mt-4">
            <button
              onClick={() => setSelectedProject(null)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDashboard;
