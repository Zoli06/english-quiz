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

## Development setup
1. Clone the repo:
    1. `git clone https://github.com/Zoli06/english-quiz.git`
    2. `cd english-quiz`
2. Copy environment template and edit `DB_*` and secrets:
    1. `cp .env.example .env` (or create `.env` and paste values)
3. Install dependencies:
    1. `cd backend && npm install`
    2. `cd ../frontend && npm install`
4. Start services:
    1. Backend: `cd backend && npm start` (no auto reload)
    2. Frontend (dev): `cd frontend && npm run dev`

## Build and run with Docker
1. Clone the repo:
    1. `git clone https://github.com/Zoli06/english-quiz.git`
    2. `cd english-quiz`
2. Build frontend assets:
    1. On WSL/Git Bash: `bash ./build.sh` — this runs the frontend build, copies output to `backend/public`, then builds Docker images.
3. Copy the examples (`cp .env.example .env`, `cp docker-compose.yml.example docker-compose.yml`).
    1. Set the passwords in `.env`
    2. Make it available to the internet in `docker-compose.yml` by either:
        1. exposing the port `4000`
        2. configuring Traefik
4. Start: `sudo docker compose up -d`
5. Quick update: `git pull && sh build.sh && sudo docker compose down && sudo docker compose up -d`

## Notes
1. Edit `INITIAL_ADMIN_PASSWORD`, `JWT_SECRET` and database credentials in ` .env ` before first run.
2. Data is persisted in `./database/data` when using Docker.
3. To expose the backend with Traefik, check `docker-compose.yml.example`.
4. PAY ATTENTION: when changing environment variables, update both `.env` and `docker-compose.yml`
