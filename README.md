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

# FRONTEND

REACT_APP_API_BASE_URL=http://<backend-public-ip>:5000/api

---

# BACKEND

PORT=5000
MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<dbname>
FRONTEND_API_BASE_URL=http://<frontend-url-or-public-ip>
JWT_SECRET=<your_jwt_secret_key>
NODE_ENV=development

---
