# AI Agents & Development Context

This document provides context for AI coding assistants working on this Express TypeScript backend project.

## Project Overview

RESTful API for ShopNow platform using Express.js with TypeScript. Uses Prisma ORM with Neon DB (PostgreSQL) for data persistence and implements JWT-based authentication with bcryptjs password hashing.

## Architecture Pattern

**MVC Architecture** (Model-View-Controller)

- **Models**: Prisma schema definitions (`prisma/schema.prisma`)
- **Controllers**: Business logic (`src/controllers/`)
- **Routes**: API endpoints (`src/routes/`)
- **Middleware**: Cross-cutting concerns (`src/middlewares/`)
- **Database**: Prisma Client for type-safe database access

## Key Files & Responsibilities

### Entry Points

- `src/server.ts` - Application bootstrap, starts Express server
- `src/app.ts` - Express configuration, middleware setup, route mounting

### Configuration

- `src/config/db.ts` - Prisma client setup with Neon DB adapter
- `.env` - Environment-specific values (DATABASE_URL, JWT_SECRET, etc.)

### Business Logic

- `src/controllers/authController.ts` - Authentication (signup, login, logout, Google OAuth)
- `src/controllers/cartController.ts` - Cart operations
- `src/controllers/wishlistController.ts` - Wishlist operations
- `src/controllers/productController.ts` - Product queries and filtering
- `src/controllers/feedbackController.ts` - User feedback collection

### Data Models

- `prisma/schema.prisma` - Database schema (User, Product, CartItem, WishlistItem, Feedback)

### API Layer

- `src/routes/authRoutes.ts` - Authentication endpoints
- `src/routes/cartRoutes.ts` - Cart endpoints
- `src/routes/wishlistRoutes.ts` - Wishlist endpoints
- `src/routes/productRoutes.ts` - Product endpoints
- `src/routes/feedbackRoutes.ts` - Feedback endpoints

### Error Handling

- `src/middlewares/errorHandler.ts` - Global error handler with custom error types
- `src/middlewares/authMiddleware.ts` - JWT verification middleware

## Code Conventions

### TypeScript

- Strict mode enabled
- Explicit return types preferred
- Interface-based type definitions
- Prisma-generated types for models

### API Design

- RESTful conventions (GET, POST, PUT, DELETE)
- Route prefixes: `/auth`, `/products`, `/cart`, `/wishlist`, `/feedback`
- HTTP status codes: 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (error)
- JWT tokens in HttpOnly cookies for authentication

### Error Handling

- Custom `AppError` class with statusCode
- Centralized error middleware
- Async error propagation with `next(error)`

### Authentication

- JWT tokens stored in HttpOnly cookies
- Password hashing with bcryptjs (salt rounds: 10)
- Google OAuth 2.0 support
- Protected routes via auth middleware

## Development Guidelines

### Adding New Features

1. Define model in `prisma/schema.prisma` and run migration
2. Create controller in `src/controllers/`
3. Define routes in `src/routes/`
4. Register routes in `src/app.ts`

### Code Style

- **Formatting**: Prettier configured (2 spaces, single quotes)
- **Linting**: ESLint with TypeScript support
- **Naming**: camelCase for functions/variables, PascalCase for classes/interfaces

### Database Operations

- Use Prisma Client for all database queries
- Leverage Prisma's type safety
- Run `npx prisma generate` after schema changes
- Use migrations for schema updates

### Testing Approach

- Jest configured for unit testing
- Test files adjacent to source (not yet implemented)
- Use `npm test` command

## Common Tasks

**Add new endpoint**: Update route file → Create controller method → Test with curl/Postman

**Add middleware**: Create in `src/middlewares/` → Register in `src/app.ts`

**Environment config**: Add to `.env` → Access via `process.env`

**Database changes**: Update `prisma/schema.prisma` → Run `npx prisma migrate dev` → Run `npx prisma generate`

**Seed database**: Run `npm run seed:products` to populate products

## Current Limitations

- **No Request Validation**: No schema validation for request bodies (consider adding Zod)
- **Basic Logging**: Console logging only (consider Winston or Pino)
- **Limited Testing**: Test infrastructure configured but no tests written yet

## Future Improvements

- Add request validation (Zod/Joi)
- Implement structured logging (Winston/Pino)
- Add comprehensive testing
- API documentation (Swagger/OpenAPI)
- Rate limiting for API endpoints
- Refresh token rotation
