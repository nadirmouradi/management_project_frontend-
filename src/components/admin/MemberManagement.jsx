import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle, FaTrash, FaTasks } from "react-icons/fa";  // Ajout d'icônes supplémentaires

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
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700">Gestion des Membres</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Prénom
              </th>
              <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Groupe
              </th>
              <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {member.nom}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {member.prenom}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {member.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <FaUserCircle className="text-blue-800 text-2xl" />
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {member.groupName || 'Aucun'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="inline-block text-lg" />
                    </button>
                    <button
                      onClick={() => handleViewTasks(member.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaTasks className="inline-block text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMember && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Tâches pour le membre sélectionné
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Nom de la Tâche
                  </th>
                  <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Date Limite
                  </th>
                  <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {task.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {task.description}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {task.due_date}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {task.status}
                    </td>
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
