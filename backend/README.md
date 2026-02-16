# REST API Boilerplate

Production-ready REST API with Node.js, Express, TypeScript, Prisma, and PostgreSQL.

## Tech Stack

- **Runtime**: Node.js (Latest LTS)
- **Language**: TypeScript (Strict mode)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Authentication**: JWT with bcrypt

## Project Structure

```
src/
├── config/              # Environment and database configuration
├── controllers/         # Request handlers
├── services/            # Business logic
├── middlewares/         # Auth and error handling
├── routes/              # API routes
├── utils/               # Helper functions
├── app.ts               # Express setup
└── server.ts            # Entry point
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3000
NODE_ENV=development
```

### 3. Setup Database

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 4. Run the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Notes (Protected Routes)

- `POST /api/notes` - Create a new note
- `GET /api/notes` - Get all user's notes
- `GET /api/notes/:id` - Get a specific note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Database Schema

### User Model
- id (UUID)
- email (unique)
- password (hashed)
- name
- createdAt
- updatedAt

### Note Model
- id (UUID)
- title
- content
- userId (foreign key)
- createdAt
- updatedAt

## Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio
```

## Architecture

This project follows Clean Architecture principles with a clear separation of concerns:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and database operations
- **Middlewares**: Handle cross-cutting concerns (auth, errors)
- **Utils**: Reusable helper functions
- **Config**: Configuration management

## Error Handling

Centralized error handling middleware catches and processes all errors, providing consistent error responses.

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Request validation with Zod
- SQL injection prevention via Prisma
- CORS enabled
