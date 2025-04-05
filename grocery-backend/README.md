# Smart Grocery App Backend

This is the backend for the Smart Grocery App, built with Node.js, Express, and SQLite.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a test user:
   ```
   npm run create-user
   ```
   This will create a test user with the following credentials:
   - Email: test@example.com
   - Password: password123

3. Start the server:
   ```
   npm start
   ```
   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Login

- **URL**: `/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "user": {
      "id": 1,
      "email": "test@example.com"
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
``` 