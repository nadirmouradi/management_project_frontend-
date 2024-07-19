import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupProjects, setGroupProjects] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

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
      const response = await axios.get('http://localhost:8080/api/users');
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
      const response = await axios.post('http://localhost:8080/api/groups', newGroup);
      console.log('Group created:', response.data);
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
      const userResponse = await axios.get(`http://localhost:8080/api/groups/${groupId}/users`);
      setGroupProjects(projectResponse.data);
      setGroupUsers(userResponse.data);
    } catch (error) {
      console.error('Error fetching group details:', error);
    }
  };

  const handleAssignProject = async (projectId) => {
    try {
      await axios.post(`http://localhost:8080/api/groups/${selectedGroup}/projects`, { projectId });
      fetchGroups();
    } catch (error) {
      console.error('Error assigning project to group:', error);
    }
  };

  const handleAssignUser = async (userId) => {
    try {
      await axios.post(`http://localhost:8080/api/groups/${selectedGroup}/users`, { userId });
      fetchGroups();
    } catch (error) {
      console.error('Error assigning user to group:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestion des Groupes</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="name" placeholder="Nom du groupe" value={newGroup.name} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 mr-2" />
        <input type="text" name="description" placeholder="Description" value={newGroup.description} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 mr-2" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Ajouter Groupe</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id}>
                <td className="border border-gray-300 px-4 py-2">{group.name}</td>
                <td className="border border-gray-300 px-4 py-2">{group.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button onClick={() => handleGroupSelect(group.id)} className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md">Gérer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedGroup && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Assigner des projets et des utilisateurs au groupe</h3>
          <div className="mb-2">
            <select onChange={(e) => handleAssignProject(e.target.value)} className="border border-gray-300 rounded-md py-2 px-3 mr-2">
              <option value="">Sélectionner un projet</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            <select onChange={(e) => handleAssignUser(e.target.value)} className="border border-gray-300 rounded-md py-2 px-3 mr-2">
              <option value="">Sélectionner un utilisateur</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.nom} {user.prenom}</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Projets associés</th>
                </tr>
              </thead>
              <tbody>
                {groupProjects.map((project) => (
                  <tr key={project.id}>
                    <td className="border border-gray-300 px-4 py-2">{project.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Utilisateurs associés</th>
                </tr>
              </thead>
              <tbody>
                {groupUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="border border-gray-300 px-4 py-2">{user.nom} {user.prenom}</td>
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
