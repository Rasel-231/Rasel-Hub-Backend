# Rasel Hub Backend

Professional MERN Stack backend built with **Express**, **MongoDB (Mongoose)**, and **TypeScript**.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose 8
- **Validation:** Zod 4
- **Authentication:** JSON Web Token (JWT) + httpOnly cookies
- **Language:** TypeScript 5
- **Dev Server:** ts-node-dev (hot reload)

## Prerequisites

- Node.js 20+
- MongoDB instance (local or Atlas)
- npm or yarn

## Getting Started

```bash
# 1. Install dependencies
npm install
# or
yarn

# 2. Create the environment file
cp .env.example .env   # or create .env manually

# 3. Fill in the required values (see below)

# 4. Start the dev server
npm run dev
```

## Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
PORT=5001
DATABASE_URL=mongodb://localhost:27017/rasel-hub
ACCESS_TOKEN=your-access-token-secret
REFRESH_TOKEN=your-refresh-token-secret
```

| Variable         | Required | Description                          |
| ---------------- | -------- | ------------------------------------ |
| `NODE_ENV`       | No       | `development` / `production`         |
| `PORT`           | Yes      | Server port (e.g. `5001`)            |
| `DATABASE_URL`   | Yes      | MongoDB connection string            |
| `ACCESS_TOKEN`   | Yes      | Secret used to sign access tokens    |
| `REFRESH_TOKEN`  | Yes      | Secret used to sign refresh tokens   |

## Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Start dev server with hot reload         |
| `npm run build`  | Compile TypeScript to `dist/`            |
| `npm run start`  | Start the compiled production server     |
| `npm run lint`   | Run ESLint on `src`                       |

## API Endpoints

Base URL: `http://localhost:5001/api/v1`

### Auth

| Method | Endpoint        | Description       | Auth |
| ------ | --------------- | ----------------- | ---- |
| POST   | `/auth/login`   | Login             | No   |
| POST   | `/auth/logout`  | Logout            | Yes  |
| GET    | `/auth/verify`  | Verify session    | Yes  |

### Clients (`/username`)

| Method | Endpoint              | Description             | Auth |
| ------ | --------------------- | ----------------------- | ---- |
| GET    | `/username`           | Get all clients         | Yes  |
| GET    | `/username/:id`       | Get a single client     | Yes  |
| POST   | `/username/create-user` | Create a client         | Yes  |
| PATCH  | `/username/:id`       | Update a client         | Yes  |
| DELETE | `/username/:id`       | Delete a client         | Yes  |

### Demo

| Method | Endpoint        | Description   |
| ------ | --------------- | ------------- |
| GET    | `/demo`         | Demo endpoint |

## Client Model

| Field     | Type     | Required | Notes                    |
| --------- | -------- | -------- | ------------------------ |
| username  | String   | Yes      | Min 4 chars              |
| password  | String   | Yes      | Min 6 chars, must contain uppercase, lowercase, and number |
| phone     | String   | Yes      | Exactly 11 digits        |
| category  | String   | Yes      | e.g. `user`, `affiliate` |
| sitename  | String   | Yes      | e.g. `bajilive`, `crickex`, `jeetbuzz`, `khelagor`, `others` |

`timestamps: true` adds `createdAt` and `updatedAt` automatically.

## Folder Structure

```
src/
├── app.ts                     # Express app setup (CORS, routes, error handler)
├── server.ts                  # Server bootstrap (DB connection + listen)
├── app/
│   ├── Routes/                # Registers all module routes
│   └── modules/
│       ├── auth/              # Auth module (login, logout, verify)
│       ├── client/            # Username/client module (CRUD)
│       ├── demo/              # Demo module
│       └── middleware/        # auth (JWT), validateRequest (Zod)
├── config/                    # Environment config loader
├── shared/                    # catchAsync, sendResponse helpers
└── types/                     # Global TypeScript types
```

## Validation

- Request bodies are validated with Zod via the `validateRequest` middleware.
- Validation errors are returned as JSON by the global error handler.

## Notes

- The frontend expects responses shaped as `{ success, message, data }` via `src/shared/sendResponse.ts`.
- CORS is currently set to `http://localhost:3000`.
- Author: **Rasel Hasan**