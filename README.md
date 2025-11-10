# English Quiz — Open Day

A small React + Node.js quiz app used for the school open day to test country-knowledge in English.

## Tech stack
1. `frontend`: React (TypeScript/JavaScript)
2. `backend`: Node.js (Express)
3. Database: MariaDB (via Docker)

## Requirements
1. Node.js (v22) and `npm`
2. Docker & `docker compose`
3. On Windows: use WSL2 or Git Bash to run shell scripts like `build.sh`

## Quick setup (development)
1. Clone the repo:
    1. `git clone https://github.com/Zoli06/english-quiz.git`
    2. `cd english-quiz`
2. Copy environment template and edit `DB_*` and secrets:
    1. `cp .env.example .env` (or create `.env` and paste values)
3. Install dependencies:
    1. `cd backend && npm install`
    2. `cd ../frontend && npm install`
4. Start services:
    1. Backend: `cd backend && npm start`
    2. Frontend (dev): `cd frontend && npm run dev` (or `npm start` if configured)

## Build and run with Docker
1. Build frontend assets:
    1. On WSL/Git Bash: `bash ./build.sh` — this runs the frontend build, copies output to `backend/public`, then builds Docker images.
2. Backend is exposed on port `4000` by default (see `docker-compose.yml`). Don't forget to uncomment the `ports` line

## Notes
1. Edit `INITIAL_ADMIN_PASSWORD`, `JWT_SECRET` and database credentials in ` .env ` before first run.
2. Data is persisted in `./database/data` when using Docker.
3. To expose the backend with Traefik, check `docker-compose.yml.example`.
4. PAY ATTENTION: when changing environment variables, update both `.env` and `docker-compose.yml`
