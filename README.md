# Linkly 🔗

Linkly is a modern, full-stack URL shortener application featuring public and private dashboards, custom aliases, secret messages, and click tracking. It offers a beautiful, responsive, and animated user interface built with modern web technologies.

## ✨ Features

- **URL Shortening**: Easily shorten long URLs into compact, shareable links.
- **Custom Aliases**: Create custom names for your short URLs (e.g., `link.ly/my-campaign`).
- **Secret Messages**: Attach optional secret messages to your links that viewers can read.
- **Click Tracking**: Monitor how many times your links have been clicked.
- **Public & Private Dashboards**: 
  - *Public Dashboard*: Quickly generate links as a guest.
  - *Private Dashboard*: Securely log in to manage your personal collection of links.
- **Modern UI**: Stunning design featuring glassmorphism, dynamic animations, and a responsive layout.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & bcrypt
- **ID Generation**: nanoid

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/singhankit04/Linkly.git
cd "URL SHORTENER"
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder and set the API base URL:
   ```env
   VITE_API_BASE=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

### 4. View the App
Open your browser and navigate to `http://localhost:5173` to see Linkly in action.

## 📂 Project Structure

```
.
├── backend/          # Node.js, Express, MongoDB backend API
└── frontend/         # React, Vite, Tailwind CSS frontend application
```

## 📜 License

This project is licensed under the ISC License.
