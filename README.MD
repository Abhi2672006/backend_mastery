# Auth Boilerplate — Express + MongoDB + JWT

A reusable starter for building authenticated REST APIs. Includes user
registration/login with hashed passwords, JWT-based route protection,
centralized error handling, and an example protected resource (Notes)
demonstrating pagination, search, and sorting.

## Setup

1. Clone this repo and install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in real values:
   ```bash
   cp .env.example .env
   ```
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/yourdbname
   JWT_SECRET=replace-with-a-long-random-string
   PORT=3000
   ```
3. Make sure MongoDB is running locally (`sudo systemctl start mongod`) or
   point `MONGO_URI` at an Atlas cluster.
4. Start the server:
   ```bash
   nodemon app.js
   ```
   You should see `Connected to MongoDB` and `listening on port 3000`.

## Folder structure

```
app.js                 Express app setup, middleware order, server start
config/db.js            MongoDB connection logic
errors/                 Custom error classes (NotFoundError, ValidationError, UnauthorizedError)
middleware/authMiddleware.js   Verifies JWT, attaches req.user, protects routes
models/                 Mongoose schemas + data-access functions (no HTTP logic)
controllers/            Request handling: validation, calling models, responses
routes/                 URL to controller wiring only, no logic
```

Each resource (e.g. Notes) follows the same four-file pattern: schema,
model, controller, routes — mounted at its own URL prefix in `app.js`.

## Endpoints

### Auth

| Method | Path | Body | Notes |
|--------|------|------|-------|
| POST | `/auth/register` | `{ email, password }` | Password is hashed before saving |
| POST | `/auth/login` | `{ email, password }` | Returns a JWT on success |

### Notes (example protected resource)

All Notes routes require `Authorization: Bearer <token>`.

| Method | Path | Query params | Notes |
|--------|------|---------------|-------|
| GET | `/notes` | `page`, `limit`, `search`, `sort` | Scoped to the logged-in user |
| POST | `/notes` | — | Body: `{ title, content }` |

Example:

```
GET /notes?page=1&limit=10&search=milk&sort=-createdAt
```

## Error handling

All errors flow through a single error-handling middleware at the bottom
of `app.js`. It understands:

- Custom errors (`NotFoundError` → 404, `ValidationError` → 400, `UnauthorizedError` → 401)
- Mongoose's own `ValidationError` (schema rule violations → 400, clean messages extracted)
- Mongoose `CastError` (malformed ObjectId → 400)
- JWT errors (`JsonWebTokenError`, `TokenExpiredError` → 401)
- Anything unexpected → 500

## Adding a new protected resource

Follow the Notes example as a template:

1. Create a schema in `models/yourResourceSchema.js`.
2. Create a model in `models/yourResourceModel.js` — plain `async` functions, no `req`/`res`.
3. Create a controller in `controllers/yourResourceController.js` — each function uses `try/catch`, throws custom errors, calls `next(err)` on failure.
4. Create `routes/yourResourceRoutes.js` — wire URLs to controller functions, apply `authMiddleware` to any route that should require login.
5. Mount it in `app.js`:
   ```javascript
   const yourResourceRoutes = require('./routes/yourResourceRoutes');
   app.use('/your-resource', yourResourceRoutes);
   ```

## Removing the example resource

To strip Notes out entirely: delete `models/noteSchema.js`,
`models/noteModel.js`, `controllers/notesController.js`,
`routes/noteRoutes.js`, and remove the `app.use('/notes', noteRoutes)`
line from `app.js`. Nothing else references Notes.