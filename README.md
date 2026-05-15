# TaskForge — Team Task Manager

TaskForge is a full-stack task management application built for organizing projects, assigning tasks, and tracking team progress through a simple collaborative workspace.

## Features

- **Authentication** — JWT-based signup and login
- **Projects** — Create projects; creator becomes Admin automatically
- **Team Management** — Admins can add/remove members, assign roles
- **Task Management** — Create tasks with title, description, due date, and priority
- **Kanban Board** — Drag-free board with To Do / In Progress / Done columns
- **Role-Based Access** — Admins manage everything; Members update only their assigned tasks
- **Dashboard** — Stats overview with charts (tasks by status, tasks per user, overdue count)
- **Responsive** — Works on mobile, tablet, and desktop

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Tailwind CSS, Vite, React Router v6, Recharts |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Railway (single service) |

---

## Project Structure

```
Ethara-Taskforge//
├── backend/
│   ├── src/
│   │   ├── config/        # MongoDB connection
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # JWT auth middleware
│   │   ├── models/        # Mongoose schemas (User, Project, Task)
│   │   └── routes/        # Express routers
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Layout, Sidebar, Modal, Badge, etc.
│   │   ├── context/       # AuthContext (global auth state)
│   │   ├── pages/         # Dashboard, Projects, ProjectDetail, Login, Signup
│   │   ├── services/      # Axios instance with auth interceptor
│   │   └── types/         # Shared TypeScript types
│   ├── package.json
│   └── vite.config.ts
├── package.json            # Root build + start scripts (used by Railway)
└── railway.toml
```

---

## Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) running locally **or** a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. Configure the backend environment

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` and fill in your values:

```env
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=any-long-random-string-you-choose
PORT=5000
NODE_ENV=development
```

### 3. Install dependencies

Open two terminals from the project root:

**Terminal 1 — Backend**
```bash
cd backend
npm install
npm run dev
```

Backend starts on `http://localhost:5000`

**Terminal 2 — Frontend**
```bash
cd frontend
npm install
npm run dev
```

Frontend starts on `http://localhost:5173`

> The Vite dev server proxies all `/api/*` requests to `localhost:5000` automatically — no CORS issues.

### 4. Open the app

Visit `http://localhost:5173`, sign up for an account, and start creating projects.

---

## API Reference

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Projects
| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | `/api/projects` | List user's projects | Any member |
| POST | `/api/projects` | Create a project | Authenticated |
| GET | `/api/projects/:id` | Get project details | Any member |
| PUT | `/api/projects/:id` | Update project | Admin |
| DELETE | `/api/projects/:id` | Delete project | Owner |
| POST | `/api/projects/:id/members` | Add a member | Admin |
| DELETE | `/api/projects/:id/members/:userId` | Remove a member | Admin |

### Tasks
| Method | Endpoint | Description | Role |
|---|---|---|---|
| GET | `/api/projects/:id/tasks` | List project tasks | Any member |
| POST | `/api/projects/:id/tasks` | Create a task | Admin |
| PUT | `/api/projects/:id/tasks/:taskId` | Update a task | Admin (full), Member (status only, own tasks) |
| DELETE | `/api/projects/:id/tasks/:taskId` | Delete a task | Admin |

### Dashboard
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/dashboard` | Get stats for all user's projects | Yes |

---

## Deployment on Railway

### Step 1 — Set up MongoDB Atlas

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free **M0** cluster
3. Go to **Database Access** → Add a database user (save the username and password)
4. Go to **Network Access** → Add IP Address → **Allow Access from Anywhere** (`0.0.0.0/0`)
5. Go to **Connect** → **Drivers** → copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step 3 — Create a Railway project

1. Go to [railway.app](https://railway.app) and sign in
2. Click **New Project** → **Deploy from GitHub repo**
3. Authorize Railway and select your repository
4. Railway detects `railway.toml` and configures the build automatically

### Step 4 — Set environment variables

In your Railway service dashboard, go to the **Variables** tab and add:

| Variable | Value |
|---|---|
| `MONGODB_URI` | Your Atlas connection string from Step 1 |
| `JWT_SECRET` | A long random secret (e.g. run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`) |
| `NODE_ENV` | `production` |

Railway will trigger a redeploy automatically after saving.

### Step 5 — Generate a public domain

Go to **Settings** → **Networking** → **Generate Domain**

Your app is live at `https://your-app-name.up.railway.app`

### How the production build works

```
npm run build
  ├── cd frontend && npm install && npm run build   → frontend/dist/
  └── cd backend  && npm install && npm run build   → backend/dist/

npm start
  └── node backend/dist/index.js
        ├── /api/*   → REST API
        └── /*       → serves frontend/dist/index.html
```

Everything runs as a single Railway service — no separate static hosting needed.

### Redeploying after changes

```bash
git add .
git commit -m "describe your change"
git push
```

Railway automatically detects the push and redeploys.

## Role Permissions Summary

| Action | Admin | Member |
|---|---|---|
| View project & tasks | Yes | Yes |
| Create / edit / delete tasks | Yes | No |
| Update assigned task status | Yes | Yes |
| Add / remove members | Yes | No |
| Delete project | Yes | No |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret key for signing JWTs |
| `PORT` | No | Server port (default: `5000`) |
| `NODE_ENV` | No | Set to `production` on Railway |
