import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiEdit3, FiTrash2 } from "react-icons/fi"; // Importation d'icônes

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    project_id: "",
    assigned_to: "",
    due_date: "",
    status: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchMembers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
      fetchTasks(); // Rafraîchir la liste des tâches après la suppression
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/tasks", newTask);
      fetchTasks();
      setNewTask({
        name: "",
        description: "",
        project_id: "",
        assigned_to: "",
        due_date: "",
        status: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case "En cours":
        return "text-green-500 text-sm font-bold";
      case "non commencé":
        return "text-blue-500 text-sm font-bold";
      case "terminé":
        return "text-red-500 text-sm font-bold";
      default:
        return "text-gray-500 text-sm font-bold";
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <FiEdit3 className="mr-2" /> Gestion des Tâches
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nom de la tâche"
            value={newTask.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="project_id"
            value={newTask.project_id}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner un projet</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <select
            name="assigned_to"
            value={newTask.assigned_to}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Assigner à un membre</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.nom} {member.prenom}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="due_date"
            value={newTask.due_date}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner un statut</option>
            <option value="non commencé">Non commencé</option>
            <option value="En cours">En cours</option>
            <option value="terminé">Terminé</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 flex items-center"
        >
          <FiPlus className="mr-2" /> Ajouter Tâche
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Projet
              </th>
              <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Assigné à
              </th>
              <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Date limite
              </th>
              <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="even:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {task.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {task.description}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {projects.find(p => p.id === task.project_id)?.name || 'N/A'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {members.find(m => m.id === task.assigned_to)?.nom + ' ' + members.find(m => m.id === task.assigned_to)?.prenom || 'N/A'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {task.due_date}
                </td>
                <td
                  className={` border-gray-300 px-4 py-2 ${getStatusColorClass(
                    task.status
                  )}`}
                >
                  {task.status}
                </td>
                <td className="border-gray-300 px-4 py-2">
                  <button className="text-red-500 hover:text-red-700">
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

export default TaskManagement;
