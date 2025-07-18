import { useEffect, useState, type FormEvent } from 'react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setAdding(true);
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
      });
      if (!res.ok) throw new Error('Failed to add task');
      setTitle('');
      fetchTasks();
    } catch (err: any) {
      setError(err.message || 'Error adding task');
    } finally {
      setAdding(false);
    }
  };

  const toggleTask = async (task: Task) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      fetchTasks();
    } catch (err: any) {
      setError(err.message || 'Error updating task');
    }
  };

  const deleteTask = async (id: number) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      fetchTasks();
    } catch (err: any) {
      setError(err.message || 'Error deleting task');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center py-12 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-8">📝 Task Manager</h1>

        <form onSubmit={handleAdd} className="flex items-center gap-3 mb-6">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={adding}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition disabled:opacity-50"
            disabled={adding}
          >
            {adding ? 'Adding...' : 'Add'}
          </button>
        </form>

        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

        {loading ? (
          <div className="text-center text-gray-600">Loading tasks...</div>
        ) : (
          <ul className="space-y-3">
            {tasks.length === 0 ? (
              <li className="text-gray-500 text-center">No tasks yet.</li>
            ) : (
              tasks.map(task => (
                <li
                  key={task.id}
                  className={`flex items-center justify-between bg-gray-50 border rounded-lg p-4 shadow-sm hover:shadow-md transition ${task.completed ? 'opacity-60' : ''
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task)}
                      className="w-5 h-5 accent-blue-600"
                    />
                    <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 text-xl"
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete task"
                  >
                    &times;
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
