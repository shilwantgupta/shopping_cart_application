# Shopping Cart Backend

## Overview

Backend API for a shopping cart system with user authentication, product management, cart operations, and a dynamic discount engine.

## Technologies

- Node.js
- Express.js
- MongoDB
- Redis
- JWT for Authentication
- Docker & Docker Compose
- Jest & Supertest for Testing

## Setup Instructions

### Prerequisites

- Docker & Docker Compose installed
- Git installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shilwantgupta/shopping-cart-backend.git
   cd shopping-cart-backend
   ```

### Create a `.env` file based on `.env.example`

**`.env`**
  ```env
  PORT=5000
  MONGO_URI=mongodb://mongo:27017/shopping_cart
  JWT_SECRET=your_jwt_secret
  REDIS_HOST=redis
  REDIS_PORT=6379

  # ADMIN CREDENTIAL
  ADMIN_NAME=admin
  ADMIN_EMAIL=admin@gmail.com
  ADMIN_PASSWORD=admin123
  ```

### Build and run the containers

```bash
  docker-compose up -d mongo redis;
```

### Run backend
```bash
  cd backend
  npm start
```
### Run frontend 
```bash
  cd frontend
  npm run dev
```

# API Documentation

## Authentication API

### Sign Up
- **Endpoint:** `POST http://localhost:5000/api/sign-up`
- **Role:** User
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "token": "string",
    "message": "Signup success!"
  }
  ```

### Login
- **Endpoint:** `POST http://localhost:5000/api/login`
- **Role:** User
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "data": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "token": "string",
    "message": "Login success"
  }
  ```

## Order API

### Get All Orders
- **Endpoint:** `GET http://localhost:5000/api/orders/all`
- **Role:** Admin
- **Response:**
  ```json
  {
    "data": [
      {
        "user": "object",
        "items": [
          {
            "product": "object",
            "quantity": "number",
            "price": "number"
          }
        ],
        "totalAmount": "number"
      }
    ],
    "message": "All orders fetched"
  }
  ```

### Get User Orders
- **Endpoint:** `GET http://localhost:5000/api/orders`
- **Role:** User
- **Response:**
  ```json
  {
    "data": [
      {
        "user": "object",
        "items": [
          {
            "product": "object",
            "quantity": "number",
            "price": "number"
          }
        ],
        "totalAmount": "number"
      }
    ],
    "message": "All orders fetched"
  }
  ```

### Order Details
- **Endpoint:** `GET http://localhost:5000/api/orders/details/:id`
- **Role:** User
- **Response:**
  ```json
  {
    "data": {
      "user": "object",
      "items": [
        {
          "product": "object",
          "quantity": "number",
          "price": "number"
        }
      ],
      "totalAmount": "number"
    },
    "message": "Order details fetched"
  }
  ```

## Cart API

### Get Cart
- **Endpoint:** `GET http://localhost:5000/api/cart`
- **Role:** User
- **Response:**
  ```json
  {
    "data": {
      "items": [
        {
          "product": "object",
          "quantity": "number"
        }
      ]
    },
    "message": "Get Cart"
  }
  ```

### Add Item to Cart
- **Endpoint:** `POST http://localhost:5000/api/cart/add`
- **Role:** User
- **Request Body:**
  ```json
  {
    "productId": "string",
    "quantity": "number"
  }
  ```
- **Response:**
  ```json
  {
    "data": "object",
    "message": "Added to cart."
  }
  ```

### Update Item Quantity
- **Endpoint:** `POST http://localhost:5000/api/cart/update`
- **Role:** User
- **Request Body:**
  ```json
  {
    "productId": "string",
    "quantity": "number"
  }
  ```
- **Response:**
  ```json
  {
    "data": "object",
    "message": "Item quantity updated."
  }
  ```

### Remove Item from Cart
- **Endpoint:** `POST http://localhost:5000/api/cart/remove`
- **Role:** User
- **Request Body:**
  ```json
  {
    "productId": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Item removed"
  }
  ```

### Cart Checkout
- **Endpoint:** `POST http://localhost:5000/api/cart/checkout`
- **Role:** User
- **Request Body:**
  ```json
  {
    "shippingAddress": "string",
    "paymentMethod": "string"
  }
  ```
- **Response:**
  ```json
  {
    "data": "object",
    "message": "Successfully ordered."
  }
  ```

## Product API

### Get All Products
- **Endpoint:** `GET http://localhost:5000/api/products`
- **Role:** User
- **Response:**
  ```json
  {
    "data": [
      {
        "title": "string",
        "description": "string",
        "price": "number",
        "stock": "number",
        "category": "string"
      }
    ],
    "message": "Products fetched!"
  }
  ```

### Get Product by ID
- **Endpoint:** `GET http://localhost:5000/api/products/:id`
- **Role:** User
- **Response:**
  ```json
  {
    "data": {
      "title": "string",
      "description": "string",
      "price": "number",
      "stock": "number",
      "category": "string"
    },
    "message": "Product fetched"
  }
  ```

### Add Product
- **Endpoint:** `POST http://localhost:5000/api/products`
- **Role:** Admin
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "category": "string"
  }
  ```
- **Response:**
  ```json
  {
    "data": "object",
    "message": "Product added"
  }
  ```

### Update Product
- **Endpoint:** `PUT http://localhost:5000/api/products/:id`
- **Role:** Admin
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "price": "number",
    "stock": "number",
    "category": "string"
  }
  ```
- **Response:**
  ```json
  {
    "data": "object",
    "message": "Product updated"
  }
  ```

### Delete Product
- **Endpoint:** `DELETE http://localhost:5000/api/products/:id`
- **Role:** Admin
- **Response:**
  ```json
  {
    "message": "Product removed"
  }
  ```

## Acknowledgments

pecial thanks to the developers of the libraries and frameworks used in this project.

For any questions or issues, please feel free to reach out or open an issue in the repository.
