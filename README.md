# Job Portal MERN Deployment

This repository contains a split MERN application:

- `backend/` — Node.js + Express API
- `frontend/` — React + Vite frontend

## Local Docker deployment

1. Copy `.env.example` to `.env`
2. Fill in your MongoDB and Cloudinary values
3. Add the frontend backend URL:
   - `VITE_BACKEND_URL=http://localhost:5000`
4. Run:
   ```bash
   docker compose up --build
   ```
5. Open:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000/health`

## Local development without Docker

1. In the frontend folder, copy `frontend/.env.example` to `frontend/.env`
2. If your backend runs on a different port, update `VITE_BACKEND_URL` accordingly.
   - Example: `VITE_BACKEND_URL=http://localhost:4000`
3. Start backend first:
   ```bash
   cd backend
   npm install
   npm start
   ```
4. Start frontend next:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
5. Open:
   - `http://localhost:3000`

## How it works

- The backend runs from `backend/` on port `5000`
- The frontend builds static assets from `frontend/`
- `frontend/src/context/AppContext.jsx` uses `VITE_BACKEND_URL` for API requests

## Deploying separately

### Backend

Deploy `backend/` to any Node host (Render, Railway, Heroku, etc.)

- Build: `npm install`
- Start: `npm start`
- Required environment variables:
  - `MONGO_URL`
  - `JWT_SECRET`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`

### Frontend

Deploy `frontend/` as a static site (Vercel, Netlify, etc.)

- Build: `npm install && npm run build`
- Output directory: `dist`
- Set `VITE_BACKEND_URL` to the deployed backend URL

### Optional Render deployment

The repository includes `render.yaml` to deploy both services on Render with one configuration file.

- Backend service: `job-portal-backend`
- Frontend site: `job-portal-frontend`

After connecting your GitHub repo to Render, the services will use:
- `repoDir: backend` for the backend
- `repoDir: frontend` for the frontend

Set the same environment variables in Render as in `.env`.

## Notes

- If you use Cloudinary uploads, keep the Cloudinary credentials secret.
- If the frontend and backend are on different domains, make sure the backend allows the frontend origin in CORS.
