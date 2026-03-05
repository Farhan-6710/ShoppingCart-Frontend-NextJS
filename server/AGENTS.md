# AI Agents & Development Context

This document provides context for AI coding assistants working on this Express TypeScript backend project.

## Project Overview

RESTful API for item management using Express.js with TypeScript. In-memory data storage with CRUD operations.

## Architecture Pattern

**MVC Architecture** (Model-View-Controller)
- **Models**: Data structures (`src/models/`)
- **Controllers**: Business logic (`src/controllers/`)
- **Routes**: API endpoints (`src/routes/`)
- **Middleware**: Cross-cutting concerns (`src/middlewares/`)

## Key Files & Responsibilities

### Entry Points
- `src/server.ts` - Application bootstrap, starts Express server
- `src/app.ts` - Express configuration, middleware setup, route mounting

### Configuration
- `src/config/config.ts` - Environment variables, app settings
- `.env` - Environment-specific values (PORT, NODE_ENV)

### Business Logic
- `src/controllers/itemController.ts` - CRUD operations for items
- `src/models/item.ts` - Item interface and data model

### API Layer
- `src/routes/itemRoutes.ts` - RESTful endpoint definitions

### Error Handling
- `src/middlewares/errorHandler.ts` - Global error handler with custom error types

## Code Conventions

### TypeScript
- Strict mode enabled
- Explicit return types preferred
- Interface-based type definitions

### API Design
- RESTful conventions (GET, POST, PUT, DELETE)
- `/api` prefix for all routes
- HTTP status codes: 200 (success), 201 (created), 404 (not found), 500 (error)

### Error Handling
- Custom `AppError` class with statusCode
- Centralized error middleware
- Async error propagation with `next(error)`

## Development Guidelines

### Adding New Features
1. Define model/interface in `src/models/`
2. Create controller in `src/controllers/`
3. Define routes in `src/routes/`
4. Register routes in `src/app.ts`

### Code Style
- **Formatting**: Prettier configured (2 spaces, single quotes)
- **Linting**: ESLint with TypeScript support
- **Naming**: camelCase for functions/variables, PascalCase for classes/interfaces

### Testing Approach
- Test files adjacent to source (not yet implemented)
- Use `npm test` command

## Common Tasks

**Add new endpoint**: Update route file → Create controller method → Test with curl/Postman

**Add middleware**: Create in `src/middlewares/` → Register in `src/app.ts`

**Environment config**: Add to `.env` → Import in `src/config/config.ts`

## Current Limitations

- **No Database**: Using in-memory array (data lost on restart)
- **No Authentication**: Open endpoints
- **No Validation**: No request body validation
- **No Logging**: Basic console logging only

## Future Improvements

- Add database integration (MongoDB/PostgreSQL)
- Implement request validation (Zod/Joi)
- Add authentication/authorization
- Implement structured logging
- Add comprehensive testing
- API documentation (Swagger/OpenAPI)