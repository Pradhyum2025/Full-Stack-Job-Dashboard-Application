# Full-Stack Application with Docker, Nginx, and EC2

This project is a full-stack web application deployed using **Docker** on an **AWS EC2 instance**, with **Nginx** serving the frontend and **CORS** configured for secure API communication.

---

## Features

- Dockerized frontend and backend services
- Reverse proxy using Nginx
- Environment variables for configuration
- CORS enabled for secure browser API requests
- Deployment-ready for AWS EC2 (Linux)

---

## Technology Stack

- **Frontend:** React.js (or any web frontend)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (cloud or local)  
- **Reverse Proxy:** Nginx  
- **Deployment:** Docker & Docker Compose on AWS EC2

---

# ======================
# FRONTEND
# ======================

# Base URL for API requests from frontend
REACT_APP_API_BASE_URL=http://<backend-public-ip>:5000/api
# Replace <backend-public-ip> with the public IP or domain of your backend

# ======================
# BACKEND
# ======================

# Server configuration
PORT=5000
# Port backend will run on

# MongoDB connection
MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<dbname>
# Example: mongodb://admin:password@localhost:27017/job-dashboard

# Frontend URL (used for CORS)
FRONTEND_API_BASE_URL=http://<frontend-url-or-public-ip>
# Must match the URL used to access the frontend in browser

# JWT Secret for authentication
JWT_SECRET=<your_jwt_secret_key>
# Replace with a strong random string

# Node environment
NODE_ENV=development
