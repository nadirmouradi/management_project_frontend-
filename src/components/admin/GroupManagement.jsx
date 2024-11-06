import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit3, FiFolder, FiUserPlus } from 'react-icons/fi';  // Importation d'icônes

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupProjects, setGroupProjects] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetchGroups();
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/groups');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
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

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/members');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup({ ...newGroup, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/groups', newGroup);
      fetchGroups();
      setNewGroup({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleGroupSelect = async (groupId) => {
    setSelectedGroup(groupId);
    try {
      const projectResponse = await axios.get(`http://localhost:8080/api/groups/${groupId}/projects`);
      const userResponse = await axios.get(`http://localhost:8080/api/groups/${groupId}/members`);
      setGroupProjects(projectResponse.data);
      setGroupUsers(userResponse.data);
    } catch (error) {
      console.error('Error fetching group details:', error);
    }
  };

  const handleAssign = async () => {
    if (!selectedGroup) {
      console.error('No group selected');
      return;
    }

    if (selectedProject) {
      try {
        await axios.post(`http://localhost:8080/api/groups/${selectedGroup}/projects`, { projectId: selectedProject });
        setSelectedProject('');
        fetchGroups();
      } catch (error) {
        console.error('Error assigning project to group:', error);
      }
    }

    if (selectedUser) {
      try {
        await axios.post(`http://localhost:8080/api/groups/${selectedGroup}/members`, { userId: selectedUser });
        setSelectedUser('');
        fetchGroups();
      } catch (error) {
        console.error('Error assigning user to group:', error);
      }
    }
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700 flex items-center">
        <FiFolder className="mr-2" /> Gestion des Groupes
      </h2>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nom du groupe"
          value={newGroup.name}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md py-2 px-4 flex-1 focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newGroup.description}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md py-2 px-4 flex-1 focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" /> Ajouter Groupe
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {groups.map((group) => (
              <tr key={group.id}>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {group.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {group.description}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  <button
                    onClick={() => handleGroupSelect(group.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit3 className="inline-block text-lg" /> Gérer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedGroup && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Assigner des projets et des utilisateurs au groupe</h3>
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 flex-1 focus:ring focus:ring-green-200"
            >
              <option value="">Sélectionner un projet</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 flex-1 focus:ring focus:ring-green-200"
            >
              <option value="">Sélectionner un utilisateur</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.nom} {user.prenom}</option>
              ))}
            </select>
            <button
              onClick={handleAssign}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center"
            >
              <FiUserPlus className="mr-2" /> Assigner
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 mb-6">
              <thead>
                <tr>
                  <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Projets associés
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groupProjects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {project.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 px-4 py-3 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Membres associés
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groupUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {user.nom} {user.prenom}
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

export default GroupManagement;
