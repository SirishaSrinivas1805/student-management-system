# 🎓 Student Management System

## 📝 Overview  
This is a full-stack **Student Management System** that includes secure user authentication, student data management (CRUD), search and filter capabilities, and user activity tracking. It uses **Firebase Authentication** on the frontend and a complete **Node.js, Express.js, MongoDB** backend.

---

## ✅ Features

### 🔐 User Authentication  
- **Register, Login, Logout** using Firebase Authentication with email/password  
- Real-time feedback using **Toast Notifications**

### 📊 Student Data Management (CRUD)  
- Add new student entries  
- View student list  
- Edit existing student details  
- Delete students
- All operations synced with MongoDB

### 🔎 Search & Filter  
- Search by name or other student attributes  
- Sort functionality for better data handling

### 👥 Active Users Display  
- Shows currently logged-in users

### 📄 Pagination
- Displays students with **pagination**
- Shows limited number of students per page (e.g., 5 per page)
- Allows navigation between pages

### 🔗 API & Communication  
- API calls using  **Fetch API**  
- Mock API simulated via **JSON Server** during development  
- Connected to **Express.js + MongoDB** for live backend operations

---

## 🔧 Tech Stack

| Frontend               | Backend                    |
|------------------------|----------------------------|
| React.js               | Node.js                    |
| React Router DOM       | Express.js                 |
| Firebase Auth          | MongoDB atlas              |
| Fetch API              | Mongoose                   |
| React Toastify         | CORS                       |
| Bootstrap              | dotenv                     |                  

---

## 🚧 Current Status

- ✅ Backend fully developed using Node.js + MongoDB  
- ✅ Frontend integrated with Firebase and backend APIs  
- ✅ Notifications implemented for registration, login, logout, and CRUD actions  
- ✅ Protected routes with automatic redirection on logout  
- ✅ CRUD logic tested and functional  
- ✅ Pagination implemented for student listing using controlled page state
- ✅ Loading icon added during API requests  
- ✅ Custom 404 "Page Not Found" implemented  
- 🔄 Basic delete confirmation with toast being implemented (OK/Cancel prompt)
- ⚠️ Bug fixes ongoing for filtering and sorting on the ID column.
- 🔜 Minor UI improvements and responsiveness refinements remaining  


---

## 📂 Folder Structure

student-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.config.js
│   │
│   ├── controllers/
│   │   └── studentController.js
│   │
│   ├── models/
│   │   └── studentModel.js
│   │
│   ├── routes/
│   │   └── studentRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    │
    ├── src/
    │   ├── assets/
    │   │   ├── loading.gif
    │   │   └── not-found.gif
    │   │
    │   ├── components/
    │   │   ├── AddStudent.js
    │   │   ├── EditStudent.js
    │   │   ├── Loading.js
    │   │   ├── NotFound.js
    │   │   ├── Pagination.js
    │   │   ├── StudentDetails.js
    │   │   ├── Login.js
    │   │   └── Register.js
    │   │
    │   ├── utils/
    │   │   ├── firebaseAuthService.js
    │   │   └── firebaseConfig.js
    │   │
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    │
    ├── .env
    └── package.json


## 🧪 How to Run

### Backend

-cd backend
-npm install
-npm run dev

### Frontend

-cd frontend
-npm install
-npm start
