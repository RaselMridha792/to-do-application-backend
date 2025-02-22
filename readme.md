# Task Management Backend

## Overview

This repository contains the backend API for the Task Management Application. It handles CRUD operations for tasks, including real-time synchronization with the frontend using MongoDB. The API is built using **Node.js**, **Express.js**, and **MongoDB**. It allows authenticated users to create, read, update, delete, and reorder tasks across different categories.

**Live Backend URL:** [Task Management API](http://localhost:5000) *(For local development)*
**API URL** *(https://to-do-application-backend-beige.vercel.app/)*

## Features

- **Authentication**: 
  - Google Sign-In via Firebase Authentication.
  - Stores user details (User ID, email, and display name) upon first login.

- **Task Management**: 
  - Add, edit, delete, and reorder tasks.
  - Each task belongs to one of three categories: 
    - **To-Do**
    - **In Progress**
    - **Done**
  - Tasks are categorized and updated in real time.

- **Real-Time Updates**:
  - Implements MongoDB Change Streams or WebSockets for real-time updates on task data.
  
- **Endpoints**:
  - `POST /tasks`: Create a new task.
  - `GET /tasks/:email`: Retrieve all tasks for a specific user.
  - `PUT /tasks/:id`: Update a task's details.
  - `DELETE /tasks/:id`: Delete a task.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable and fast applications.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database to store task data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB in Node.js.
- **Firebase Authentication**: Used for authenticating users using Google Sign-In.
- **MongoDB Change Streams**: Used for real-time updates of task data.
- **dotenv**: For managing environment variables.