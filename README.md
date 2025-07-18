# TeleHealth Task Manager

A fullstack Task Manager app built with React, TypeScript, Vite (frontend), Node.js/Express (backend), and Tailwind CSS for styling.

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/KantapatKiie/telehealth.git
   cd telehealth
   ```

2. **Install frontend dependencies:**
   ```sh
   npm install
   ```

3. **Install backend dependencies:**
   ```sh
   cd backend
   npm install
   cd ..
   ```

## How to Run

### Start the Backend
```sh
cd backend
npm run dev
```
Backend runs on [http://localhost:4000](http://localhost:4000) (or your configured port).

### Start the Frontend
```sh
npm run dev
```
Frontend runs on [http://localhost:3000](http://localhost:3000).

## Features
- Display all tasks in a list
- Add a new task via a form
- Mark a task as complete/incomplete (toggle)
- Delete a task
- Show loading states and error messages
- TypeScript for type safety
- Tailwind CSS for beautiful UI
- RESTful API (backend)

## Bonus
- **Unit tests:** Run `npm test` in the project root to test frontend logic (Jest + React Testing Library)
- **Environment variables:** API URL is configurable via `.env` file
- **Modern UI:** Responsive and clean design with Tailwind CSS

## Notes
- Tasks are stored in-memory on the backend for simplicity
- You can deploy this app to Vercel, Render, or similar platforms
- For custom API URLs, update `.env` and restart the frontend

---
For any issues or questions, feel free to open an issue on GitHub.
