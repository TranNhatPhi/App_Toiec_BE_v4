# ✅ TOEIC Learning App - Backend (Node.js)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MySQL](https://img.shields.io/badge/MySQL-8.x-blue)
![Sequelize](https://img.shields.io/badge/Sequelize-ORM-purple)

---

## 📌 Introduction

Backend system for TOEIC learning and test preparation application, providing RESTful APIs for:

- 👤 User management & authentication
- 📝 TOEIC test taking with new format (Listening & Reading)
- 📚 Vocabulary learning by topics
- 📊 Learning progress tracking
- 📈 Test performance analytics
- 🛠 Admin dashboard & management

---

## 🚀 Key Features

### 🔐 Authentication
- Register/Login using **JWT**
- Role-based access control (Admin/User)
- Password hashing with **bcrypt**

### 📝 TOEIC Test Engine
- Auto-generate full TOEIC tests (Part 1 → Part 7)
- Randomize questions with fixed structure
- Timer support (auto-submit when expired)
- Save test results, calculate:
  - Total score
  - Listening & Reading scores
  - Correct/Wrong/Unanswered counts
- Review past test history

### 📚 Vocabulary Training
- 50+ TOEIC topics (Business, Office, Finance…)
- Flashcard learning system
- Quizzes per topic
- Save progress and accuracy rate

### 📊 Progress & Analytics
- Score tracking over time (by date)
- Average score (7 days, 30 days)
- Number of tests taken per day
- Question-level accuracy tracking
- Detect strengths & weaknesses by part

### 🛠 Admin Management
- View total users, exams, test attempts
- Daily/weekly/monthly analytics
- Create/Update/Delete questions and vocabulary topics
- Export/Import test data
- Assign roles (Admin, Moderator, User)

---

## 🔧 Technologies Used

### Core
- **Node.js** 18.x
- **Express.js** 4.x
- **MySQL** 8.x
- **Sequelize** ORM

### Security
- **JWT** for access token
- **Bcrypt** for hashing
- **Helmet** for headers protection
- **CORS** support

### API & Docs
- RESTful API architecture
- **Swagger UI** for API documentation
- **Express-rate-limit** to prevent abuse

---

---

## 📚 API Documentation

- Swagger UI available at:  
  👉 `http://localhost:3001/api-docs`

- Includes:
  - Auth endpoints
  - Exam / Result endpoints
  - Vocabulary API
  - Admin statistics API

---

## ⚙️ Setup Instructions

### 1. Clone project
```bash
git clone https://github.com/TranNhatPhi/App_Toiec_BE_v4
cd toiec-backend

2. Install dependencies
bash
npm install
3. Configure environment
Create .env file in root:
4. Run DB migration & seed (optional)
bash
# Auto sync tables
npm run db:sync

# Seed initial data
npm run seed
5. Start server
bash
npm run dev
🧪 Testing API
You can use:

Postman

Swagger UI (/api-docs)

Insomnia

For testing:

/api/auth/register – Create user

/api/auth/login – Get JWT

/api/exams/ – Get exam list

/api/exam-results/submit – Submit test

/api/vocab/topics – Get vocabulary topics