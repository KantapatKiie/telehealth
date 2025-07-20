import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

let tasks: Task[] = [];
let nextId = 1;

// Get all tasks
app.get('/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req: Request, res: Response) => {
  const { title, completed } = req.body;
  if (typeof title !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid task data' });
  }
  const newTask: Task = { id: nextId++, title, completed };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (typeof title === 'string') task.title = title;
  if (typeof completed === 'boolean') task.completed = completed;
  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
