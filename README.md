# Subsy: Subscription Management System

A Node.js + Express.js backend application for managing subscriptions, user authentication, and automated workflow reminders using Upstash Workflow and MongoDB.

## 📌 Features

- **User Authentication**
  - JWT-based authentication (login/signup).
  - Protected routes for subscription management.
- **Subscription Management**
  - Create, read, update, and delete subscriptions.
  - Price, currency, and enrollment limit tracking.
- **Automated Reminders**
  - Scheduled reminders for upcoming subscription renewals.
  - Customizable reminder intervals (7, 5, 2, and 1 day(s) before due date).
- **Email Notifications**
  - Sends automated reminder emails using a custom email utility.
- **MongoDB Integration**
  - Data persistence with Mongoose models.
- **Environment Configurations**
  - `.env` file for secure storage of environment variables.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Workflow Automation:** Upstash Workflow
- **Authentication:** JWT (JSON Web Tokens)
- Bcrypt.js — Password hashing
- **Email Service:** Nodemailer
- **Date Handling:** Day.js

## 📂 Project Structure
```bash
.
├── controllers/        # Route handlers (auth, subscriptions, workflow)
├── middleware/         # Authentication & error-handling middleware
├── models/             # Mongoose schemas
├── routes/             # Express route definitions
├── utils/              # Helper functions (email sending, etc.)
├── .env                # Environment variables
└── app.js              # Main entry point
```

## ⚙️ Installation & Setup

1. **Clone the repository**
  ```bash
git clone https://github.com/ziadismael/Subsy.git
cd Subsy
```
  

2. **Install dependencies and Set environment variables**
  ```bash
npm install
// Create a .env file in the root directory and add:
PORT=3000
MONGODB_URI=mongodb+srv://<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
EMAIL_USER=<smtp-email-user>
EMAIL_PASS=<smtp-email-password>
```
3.**Run the server**
  ```bash
npm start
```

## 🔑 Authentication Flow
**User Sign Up → Creates a new user in MongoDB with a hashed password**
**User Login → Generates a JWT with the user’s ID (userID).**
**Protected Routes → Middleware verifies the JWT before allowing access.**

## 📡 API Endpoints
| Method | Endpoint                  | Description                         |
| ------ | ------------------------- | ----------------------------------- |
| POST   | `/api/auth/signup`        | Register a new user                 |
| POST   | `/api/auth/login`         | Login and receive a JWT             |
| ------ | ------------------------- | ----------------------------------- |
| GET    | `/api/subscriptions`      | Get all subscriptions (user only)   |
| GET    | `/api/subscriptions/:id`  | Get subscription details            |
| POST   | `/api/subscriptions`      | Create a subscription               |
| PUT    | `/api/subscriptions/:id`  | Update subscription                 |
| DELETE | `/api/subscriptions/:id`  | Delete subscription                 |
| ------ | ------------------------- | ----------------------------------- |
| POST   | `/api/workflow/reminders` | Trigger reminders for subscriptions |

## 📧 Reminder Automation

The system automatically checks subscription renewal dates and sends email reminders at the following intervals:
- **7 days** before the due date  
- **5 days** before the due date  
- **2 days** before the due date  
- **1 day** before the due date


