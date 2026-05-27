# ShopNow Backend - Express TypeScript API

A RESTful API for the ShopNow platform built with Express.js and TypeScript, featuring JWT authentication, Prisma ORM, and Neon DB (PostgreSQL).

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Neon DB (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken, bcryptjs)
- **OAuth**: Google OAuth 2.0
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest

## Project Structure

```
src/
├── app.ts                      # Express app configuration
├── server.ts                   # Server entry point
├── config/
│   └── db.ts                   # Prisma client and database connection
├── controllers/
│   ├── authController.ts       # Authentication logic
│   ├── cartController.ts       # Cart operations
│   ├── wishlistController.ts   # Wishlist operations
│   ├── productController.ts    # Product queries
│   └── feedbackController.ts   # Feedback collection
├── middlewares/
│   ├── authMiddleware.ts       # JWT verification
│   └── errorHandler.ts         # Global error handling
├── routes/
│   ├── authRoutes.ts           # Auth endpoints
│   ├── cartRoutes.ts           # Cart endpoints
│   ├── wishlistRoutes.ts       # Wishlist endpoints
│   ├── productRoutes.ts        # Product endpoints
│   └── feedbackRoutes.ts       # Feedback endpoints
├── types/                      # TypeScript type definitions
└── utils/
    ├── generateToken.ts        # JWT token generation
    └── googleAuth.ts           # Google OAuth setup

prisma/
├── schema.prisma               # Database schema
├── migrations/                 # Database migrations
├── products.json               # Product seed data
└── seedProducts.ts             # Seed script
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
DATABASE_URL=your_neon_db_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Database Setup

```sh
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed products
npm run seed:products

# Open Prisma Studio (optional)
npx prisma studio
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

### Authentication

- `POST /auth/signup` - Create new user account
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user (protected)
- `POST /auth/google` - Google OAuth login

### Products

- `GET /products` - Get all products with filtering
- `GET /products/:id` - Get product by ID

### Cart

- `GET /cart` - Get user's cart (protected)
- `POST /cart` - Add item to cart (protected)
- `PUT /cart/:productId` - Update cart item quantity (protected)
- `DELETE /cart/:productId` - Remove item from cart (protected)
- `DELETE /cart` - Clear entire cart (protected)

### Wishlist

- `GET /wishlist` - Get user's wishlist (protected)
- `POST /wishlist` - Add item to wishlist (protected)
- `DELETE /wishlist/:productId` - Remove item from wishlist (protected)

### Feedback

- `POST /feedback` - Submit user feedback (protected)

## Scripts

- `npm run dev` - Run development server with hot reload
- `npm run build` - Compile TypeScript and run Prisma migrations
- `npm start` - Run production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run seed:products` - Seed products database

```

```
