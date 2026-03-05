# Backend Course - Express TypeScript API

A simple RESTful API built with Express.js and TypeScript demonstrating CRUD operations for managing items.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Code Quality**: ESLint, Prettier

## Project Structure

```
src/
├── app.ts                  # Express app configuration
├── server.ts              # Server entry point
├── config/
│   └── config.ts          # Environment configuration
├── controllers/
│   └── itemController.ts  # Business logic for item operations
├── middlewares/
│   └── errorHandler.ts    # Global error handling
├── models/
│   └── item.ts            # Item data model
└── routes/
    └── itemRoutes.ts      # API route definitions
```

## Getting Started

### Installation

```sh
npm install
```

### Configuration

Create a `.env` file with:
```
PORT=5001
NODE_ENV=development
```

### Development

```sh
npm run dev
```

### Build & Production

```sh
npm run build
npm start
```

## API Endpoints

- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

## Scripts

- `npm run dev` - Run development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
```