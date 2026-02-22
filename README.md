# Note Taking Application

A full-stack Note Taking application built with NestJS (Backend) and React + Vite (Frontend).

Author: Juan Manuel Cerdeira / <juanmanuelcerdeira761@gmail.com>

## Deployment (Render)

- **Frontend:** <https://notes-app-frontend-uny2.onrender.com>
- **Backend:** <https://notes-app-1k9m.onrender.com>

> Note: The Render service may be idle at times; the backend can take ~30 seconds to start after being inactive.

## Project Requirements & Run Guide

This repository contains a NestJS backend and a Vite + React frontend. Below are the concrete runtimes, engines, tools, and their versions that were used when developing and testing this project.

## System / Runtime

- **Node.js**: 20.x (tested with 20.14.0)
- **npm**: 9.x (bundled with Node.js 20; tested with 9.8.1)

> Use Node.js 20.x to avoid compatibility issues between the frontend and backend toolchains.

## Backend (./backend)

- Framework: **@nestjs/core** 11.0.1
- CLI: **@nestjs/cli** 11.0.0
- TypeScript: **typescript** 5.7.3
- ORM: **typeorm** 0.3.28
- Database driver: **sqlite3** 5.1.7
- RxJS: **rxjs** 7.8.1

Key dependencies (from `backend/package.json`):

- `@nestjs/common` 11.0.1
- `@nestjs/platform-express` 11.0.1
- `@nestjs/typeorm` 11.0.0

Dev / test tooling versions:

- `ts-node` 10.9.2
- `prettier` 3.4.2
- `eslint` 9.18.0

## Frontend (./frontend)

- Framework: **React** 19.2.0
- Bundler / dev server: **Vite** 7.3.1
- TypeScript: **typescript** ~5.9.3
- HTTP client: **axios** 1.13.5

Key dependencies (from `frontend/package.json`):

- `react` 19.2.0
- `react-dom` 19.2.0
- `react-router-dom` 7.13.0
- `@vitejs/plugin-react` 5.1.1

Dev tooling:

- `eslint` 9.39.1
- `@types/node` ^24.10.1

## Quick Start

The application comes with a startup script that installs dependencies and runs both backend and frontend services.

### Linux/macOS

```bash
chmod +x start.sh
./start.sh
```

The application will be available at:

- **Frontend**: <http://localhost:5173>
- **Backend**: <http://localhost:3000>
