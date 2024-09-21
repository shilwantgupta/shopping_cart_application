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

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shilwantgupta/shopping-cart-backend.git
   cd shopping-cart-backend
   ```

### Create a `.env` file based on `.env.example`

  ```env
  PORT=5000
  MONGO_URI=mongodb://mongo:27017/shopping_cart
  JWT_SECRET=your_jwt_secret
  REDIS_HOST=redis
  REDIS_PORT=6379
  ```

### Build and run the containers

```bash
  docker-compose up --build
```

### Run backend
```bash
  npm start
```


