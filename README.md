# Simple Blog Platform

A basic blog platform with registration, login, and post functionality using **Fastify** for the backend and vanilla **JavaScript + SCSS** for the frontend.

## Features

- User registration with JWT authentication
- Login/logout flow with token stored in `localStorage`
- Post feed
- Basic profile page
- Responsive SCSS-styled frontend

## Tech Stack

- **Backend:** Node.js, Fastify, JWT
- **Frontend:** HTML, SCSS, Vanilla JavaScript
- **Data storage:** JSON files (no database)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kobra-kid/T-intensive-final-project.git
cd T-intensive-final-project
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the backend server

```bash
node backend/server.js
```

The server will run at: `http://localhost:3000`

### 4. Open the frontend

You can open `frontend/index.html` in the browser directly, or use a local server (like Live Server in VS Code) to serve the frontend.

## Notes

* This is a learning/demo project. Do not use in production without proper security (hashing passwords, secure tokens, input validation, etc.).
* Feel free to extend with features like comments, likes, avatars, and database support.
