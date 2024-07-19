import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', project_id: '', assigned_to: '', due_date: '', status: '' });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchMembers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/tasks', newTask);
      console.log('Task created:', response.data);
      fetchTasks();
      setNewTask({ name: '', description: '', project_id: '', assigned_to: '', due_date: '', status: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestion des Tâches</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="name" placeholder="Nom de la tâche" value={newTask.name} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 mr-2" />
        <input type="text" name="description" placeholder="Description" value={newTask.description} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 mr-2" />
        <select name="project_id" value={newTask.project_id} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 mr-2">
          <option value="">Sélectionner un projet</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        <select name="assigned_to" value={newTask.assigned_to} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 mr-2">
          <option value="">Assigner à un membre</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>{member.nom} {member.prenom}</option>
          ))}
        </select>
        <input type="date" name="due_date" value={newTask.due_date} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 mr-2" />
        <input type="text" name="status" placeholder="Statut" value={newTask.status} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 mr-2" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Ajouter Tâche</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Projet</th>
              <th className="border border-gray-300 px-4 py-2">Assigné à</th>
              <th className="border border-gray-300 px-4 py-2">Date limite</th>
              <th className="border border-gray-300 px-4 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="border border-gray-300 px-4 py-2">{task.name}</td>
                <td className="border border-gray-300 px-4 py-2">{task.description}</td>
                <td className="border border-gray-300 px-4 py-2">{task.project_id}</td>
                <td className="border border-gray-300 px-4 py-2">{task.assigned_to}</td>
                <td className="border border-gray-300 px-4 py-2">{task.due_date}</td>
                <td className="border border-gray-300 px-4 py-2">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManagement;
