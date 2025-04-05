# Smart Grocery App

A full-stack application for managing grocery shopping lists, built with Angular and Node.js.

## Project Structure

- `smart-grocery-app/`: Angular frontend
- `grocery-backend/`: Node.js backend with Express and SQLite

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd grocery-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a test user:
   ```
   npm run create-user
   ```
   This will create a test user with the following credentials:
   - Email: test@example.com
   - Password: password123

4. Start the backend server:
   ```
   npm start
   ```
   The server will run on http://localhost:3000

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd smart-grocery-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   ng serve
   ```
   The application will be available at http://localhost:4200

## Features

- User authentication (login)
- Grocery item management
- Responsive design

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