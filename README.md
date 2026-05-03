# Task Management System

Full-stack task management app with authentication, projects, and tasks.

## Tech Stack
- Frontend: React (hooks + functional components)
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT

## Structure
- `backend/` Express API (`models`, `routes`, `controllers`, `middleware`, `config`)
- `frontend/` React app (`components`, `pages`, `services`, `context`, `utils`)

## Backend Setup
1. `cd backend`
2. `cp .env.example .env`
3. Fill `.env` values (`PORT`, `MONGO_URI`, `JWT_SECRET`)
4. `npm install`
5. `npm run dev`

## Frontend Setup
1. `cd frontend`
2. `cp .env.example .env`
3. `npm install`
4. `npm start`

## API Endpoints
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Projects
- `GET /api/projects?page=1&limit=10`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Tasks
- `GET /api/tasks?project=<id>&status=<status>&search=<text>&page=1&limit=10`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Features
- JWT-based login/signup and protected routes
- User-scoped data access only
- Project CRUD with cascade delete of related tasks
- Task CRUD with status updates and filtering
- Pagination support for projects/tasks
- Centralized API error handling
- Responsive frontend with loading and error states
