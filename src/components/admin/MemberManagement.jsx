import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    // Appel à fetchMembers dans useEffect pour charger les membres au montage
    fetchMembers();
  }, []);
  

  const handleDeleteMember = async (memberId) => {
    try {
      await axios.delete(`http://localhost:8080/api/members/${memberId}`);
      fetchMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleViewTasks = async (memberId) => {
    setSelectedMember(memberId);
    try {
      const response = await axios.get(`http://localhost:8080/api/members/${memberId}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestion des Membres</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Prénom</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td className="border border-gray-300 px-4 py-2">{member.nom}</td>
                <td className="border border-gray-300 px-4 py-2">{member.prenom}</td>
                <td className="border border-gray-300 px-4 py-2">{member.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button 
                    onClick={() => handleDeleteMember(member.id)} 
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md mr-2"
                  >
                    Supprimer
                  </button>
                  <button 
                    onClick={() => handleViewTasks(member.id)} 
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md"
                  >
                    Voir Tâches
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedMember && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Tâches pour le membre sélectionné</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Nom de la Tâche</th>
                  <th className="border border-gray-300 px-4 py-2">Description</th>
                  <th className="border border-gray-300 px-4 py-2">Date Limite</th>
                  <th className="border border-gray-300 px-4 py-2">Statut</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="border border-gray-300 px-4 py-2">{task.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{task.description}</td>
                    <td className="border border-gray-300 px-4 py-2">{task.due_date}</td>
                    <td className="border border-gray-300 px-4 py-2">{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;
