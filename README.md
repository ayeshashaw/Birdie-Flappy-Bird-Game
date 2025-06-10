# Flappy Bird Game 🐦  
**Deployment Link** - https://birdie-flappy-bird-game.vercel.app

This is a web-based Flappy Bird game that features user authentication, score tracking, and a leaderboard.

## Features ⭐

- User authentication (Login, Register, Forgot Password, OTP Verification)
- Google OAuth integration 🔒
- Real-time score tracking 📊
- Leaderboard to display top scores 🏆
- Responsive design for mobile and desktop 📱

## Team Contributions 👥

- **https://github.com/ishitars27**: Managed the core game display and game logic 🎮, developed visual effects, and completed the UI/UX design 🎨.
- **https://github.com/ayeshashaw**: Implemented the leaderboard, API logic, login/logout functionality, Google authentication, and handled deployment 🚀.

## Installation ⚙️

To set up the project locally, follow these steps:

### Prerequisites ✅

- Node.js (LTS version recommended)
- npm or Yarn
- MongoDB Atlas account (or a local MongoDB instance)
- Google Cloud Project for OAuth credentials
- Gmail account for Nodemailer (or another SMTP service)

### Backend Setup 🖥️

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   EMAIL_USER=your_gmail_email_username
   EMAIL_PASS=your_gmail_app_password
   ```

   **Note:** If using Gmail for `EMAIL_PASS`, you'll need to generate an App Password from your Google Account security settings.

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup 🌐

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Usage 🎮

Open your browser and go to `http://localhost:5173` (or the port indicated by `npm run dev`).

- Register a new account or log in with your existing credentials.
- Play the Flappy Bird game and try to beat your high score!
- Check the leaderboard to see how you rank against other players.

## Technologies Used 🛠️

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Passport.js (for Google OAuth)
- Nodemailer
- bcryptjs

### Frontend

- React.js
- Vite
- Material-UI (MUI)
- Formik & Yup
- React Router DOM
- Axios (or Fetch API)

## Project Structure 🗂️

```
.gitignore
README.md
backend/
├── config/
│   └── db.js
├── controllers/
├── middleware/
├── models/
├── package-lock.json
├── package.json
├── routes/
├── server.js
└── utils/
    └── sendMail.js
frontend/
├── public/
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   ├── components/
│   ├── index.css
│   ├── main.jsx
│   └── utils/
├── vite.config.js
```

## Contributing 🤝

Feel free to fork this repository and contribute! Pull requests are always welcome.
