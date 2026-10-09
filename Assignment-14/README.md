# 🛒 Authentication & Product CRUD APIs with Interactive Frontend

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.19-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Access%2FRefresh-orange.svg)](https://jwt.io/)
[![express-validator](https://img.shields.io/badge/express--validator-v7.2-red.svg)](https://express-validator.github.io/)

A complete, production-ready REST API for an e-commerce platform built with **Node.js, Express, MongoDB, Mongoose, JWT (Access + Refresh tokens), and express-validator**, paired with a modern, glassmorphic **Single Page Application (SPA) frontend**.

---

## 📌 Features Overview

### 🔐 1. Authentication APIs (Task 1 & 2.1 - 2.3)
- **User Registration**:
  - Validates `name`, `email`, `password`, and matching `confirmPassword`.
  - Hashes passwords using `bcrypt` (10 salt rounds) before DB persistence.
  - Rejects duplicate email registration attempts with a `409 Conflict` error.
  - Returns created user object excluding password and refresh tokens.
- **User Login & Token Issuance**:
  - Verifies credentials using `bcrypt.compare` (returns generic `401` on mismatch to prevent email enumeration).
  - Issues short-lived **Access Token** (15 min) in JSON response body.
  - Issues long-lived **Refresh Token** (7 days) sent as an `httpOnly`, `sameSite` cookie (and JSON response body).
  - Persists refresh token in MongoDB user document for server-side token revocation on logout.
- **Refresh Token Rotation & Renewal**:
  - Endpoint `/api/auth/refresh-token` verifies refresh token against JWT secret **and** MongoDB record.
  - Generates a brand-new access token and rotates refresh token upon valid request.
  - Invalidate/clears session on revoked or expired tokens (`401/403`).
- **User Logout**:
  - Revokes stored refresh token in MongoDB and clears `httpOnly` cookie.
- **Profile (`/api/auth/me`)**:
  - Returns logged-in user profile via `authenticate` Bearer middleware.

### 📦 2. Product CRUD APIs (Task 2 & Task 3)
- **Create Product** (`POST /api/products` - *Authenticated*):
  - Requires valid JWT access token. Validates fields (`name`, `price`, `stock`, `category`, `imageUrl`, `description`).
- **List All Products** (`GET /api/products` - *Public*):
  - Fetches product list with pagination (`page`, `limit`), search filter (`search`), and category filtering (`category`).
- **Get Product by ID** (`GET /api/products/:id` - *Public*):
  - Validates `:id` MongoDB ObjectId param before database lookup.
- **Update Product** (`PUT /api/products/:id` - *Authenticated*):
  - Confirms product existence before updating.
- **Delete Product** (`DELETE /api/products/:id` - *Authenticated*):
  - Confirms product existence before deletion.

### ✅ 3. Input Validation with `express-validator` (Task 3)
- All request bodies, route parameters, and queries are strictly validated using `express-validator` chains before reaching controller logic.
- Returns structured field-level `400 Bad Request` responses:
```json
{
  "success": false,
  "message": "Validation failed. Please check your inputs.",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address",
      "value": "invalid-email"
    },
    {
      "field": "confirmPassword",
      "message": "Passwords do not match",
      "value": "12345"
    }
  ]
}
```

### 🎨 4. Interactive Frontend (Task 4)
- Modern glassmorphic dark interface with HTML5, CSS3, and ES6 JavaScript.
- Dynamic navigation bar showing authenticated user profile chip & action buttons.
- Real-time input validation feedback beneath form fields.
- Auto-refresh token handling on `401 Unauthorized` API responses.
- Modal dialogs for Login/Register, Add/Edit Product, and Delete confirmation.

---

## 🛠️ Project Structure

```
Assignment-14/
├── .env
├── package.json
├── README.md
├── public/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
└── src/
    ├── server.js
    ├── config/
    │   ├── config.js
    │   └── db.js
    ├── models/
    │   ├── user.model.js
    │   └── product.model.js
    ├── middleware/
    │   ├── auth.middleware.js
    │   └── validate.middleware.js
    ├── validators/
    │   ├── auth.validator.js
    │   └── product.validator.js
    ├── controllers/
    │   ├── auth.controller.js
    │   └── product.controller.js
    ├── routes/
    │   ├── auth.routes.js
    │   └── product.routes.js
    └── app/
        └── app.js
```

---

## 🚀 Getting Started & Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Running locally on `127.0.0.1:27017` or a MongoDB Atlas URI)

### Installation Steps

1. **Clone or Navigate to Project Directory**:
   ```bash
   cd c:/Frontend-Assignments-Sheriyans-Cohort-3/Assignment-14
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create or verify the `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/sheryians_auth_crud
   ACCESS_TOKEN_SECRET=sheryians_jwt_access_secret_key_2026_super_secure_99
   REFRESH_TOKEN_SECRET=sheryians_jwt_refresh_secret_key_2026_super_secure_88
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d
   NODE_ENV=development
   ```

4. **Start the Application**:
   - **Production mode**:
     ```bash
     npm start
     ```
   - **Development mode** (with auto-reload):
     ```bash
     npm run dev
     ```

5. **Access the Application & APIs**:
   - **Frontend UI**: Open [http://localhost:3000](http://localhost:3000) in your web browser.
   - **API Base Endpoint**: `http://localhost:3000/api`

---

## 📡 API Endpoints Documentation

### 🔑 Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & issue Access + Refresh tokens |
| `POST` | `/api/auth/refresh-token` | Public* | Issue brand-new access token using valid refresh token |
| `POST` | `/api/auth/logout` | Authenticated | Revoke refresh token and clear cookie |
| `GET` | `/api/auth/me` | Authenticated | Get profile of logged-in user |

* *Requires valid Refresh Token in `httpOnly` cookie or request body/header.*

#### Sample `POST /api/auth/register` Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

#### Sample `POST /api/auth/login` Response:
```json
{
  "success": true,
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1Ni...",
  "refreshToken": "eyJhbGciOiJIUzI1Ni...",
  "user": {
    "_id": "6706e2a1b92c4e1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-10-09T22:00:00.000Z"
  }
}
```

---

### 📦 Product CRUD Endpoints (`/api/products`)

| Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/products` | Authenticated | Create a new product item |
| `GET` | `/api/products` | Public | List products (Supports `page`, `limit`, `search`, `category`) |
| `GET` | `/api/products/:id` | Public | Get single product by Mongo ObjectId |
| `PUT` | `/api/products/:id` | Authenticated | Update product by ID (confirms existence) |
| `DELETE` | `/api/products/:id` | Authenticated | Delete product by ID (confirms existence) |

#### Sample `POST /api/products` Body:
```json
{
  "name": "Wireless Noise-Canceling Headphones",
  "description": "Premium over-ear Bluetooth headphones with active noise cancellation.",
  "price": 249.99,
  "category": "Electronics",
  "stock": 45,
  "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
}
```

---

## 🔒 Security Best Practices Implemented
- **Password Security**: Passwords hashed using `bcrypt` (10 rounds). Plaintext passwords are never stored, logged, or returned in API responses.
- **JWT Dual Token Architecture**: Short-lived access tokens limit vulnerability windows, while long-lived refresh tokens stored in `httpOnly` cookies prevent XSS theft.
- **Server-Side Token Revocation**: Refresh tokens are stored in the database and cleared upon logout or rotation.
- **Input Validation & Sanitization**: `express-validator` enforces strict type, format, and range constraints before controller execution.
- **Scoped Resources**: Write operations (`POST`, `PUT`, `DELETE`) require a valid Bearer token.

---

## 📄 License & Credits
Developed as part of **Sheryians Coding School - Assignment 14**.
