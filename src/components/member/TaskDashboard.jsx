import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");
  
  console.log("tast status" , tasks)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${user.id}/tasks`);
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user.id]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/tasks/${taskId}/status`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mt-20">
      <h2 className="text-xl mb-6 text-gray-400">Taches Assignées</h2>
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="border border-gray-300 p-4 bg-white rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{task.name}</h3>
              <p className="text-gray-600 mb-2">{task.description}</p>
              <p className="text-gray-500">Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center">
      <FaEye className="text-gray-600 mr-4 cursor-pointer" title="View Details" />
      <select
  value={task.status || "non commencé"} // Valeur par défaut si task.status est undefined ou null
  onChange={(e) => handleStatusChange(task.id, e.target.value)}
  className="border border-gray-300 rounded px-3 py-1 text-gray-800"
>
  <option value="non commencé">Non commencé</option>
  <option value="en cours">En cours</option>
  <option value="terminé">Terminé</option>
</select>
      {task.status === "terminé" && <FaCheckCircle className="text-green-500 ml-2" title="Completed" />}
      {task.status === "en cours" && <FaClock className="text-yellow-500 ml-2" title="In Progress" />}
      {task.status === "non commencé" && <FaTimesCircle className="text-red-500 ml-2" title="Not Started" />}
    </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDashboard;
