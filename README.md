# MoodJournal
A full-stack journaling application that allows users to log their thoughts and moods.  
Built with **React + Tailwind CSS** on the frontend and **Node.js + Express + Prisma** on the backend.

Deployed on **Vercel (Frontend)** and **Render (Backend)**.

---

## Live Demo

- Frontend: [[https://final-project-part-2-moodjournal.vercel.app](https://final-project-part-2-moodjournal.vercel.app/)]
- Backend: [[https://final-project-part-2-moodjournal.onrender.com](https://final-project-part-2-moodjournal.onrender.com)]

# Tech Stack

### Frontend 
- React
- React Router
- Axios
- Tailwind CSS
- Vercel (hosting)

### ⚙Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL (Render Database)
- JWT Authentication (with cookies)
- Render (hosting)

---

## Features

- User registration and login with JWT cookies
- Secure routes with middleware protection
- Create, view, edit, and delete journal entries
- Weather-based mood suggestions via external API
- Fully responsive design

## Project Structure
```bash
final-project-part-2-moodjournal/
api/
├── middleware/
│   └── requireAuth.js              # Middleware to verify JWTs for protected routes
├── prisma/
│   ├── migrations/                 # Auto-generated Prisma migration history
│   └── schema.prisma               # Prisma schema defining the DB models
├── routes/
│   ├── auth.js                     # Routes for login and registration
│   ├── journal.js                  # Routes to get available moods, public entries
│   └── journalEntry.js             # Routes for creating, editing, deleting user journal entries
├── utils/
│   └── fetchWeather.js             # Fetches weather data from external API for entries
├── .env                            # Environment variables (not committed)
├── package.json                    # Project dependencies and start script
├── package-lock.json               # Version lock for npm dependencies
└── server.js                       # Express entry point, middleware config, route mounting
│
├── client/                     # Frontend (React)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── pages/              # React pages: Login, Register, Dashboard, etc.
│   │   ├── App.js              # Main app component
│   │   └── index.js            # React entry point
│   ├── tailwind.config.js      # Tailwind config
│   ├── .env                    # Frontend API URL (optional)
│   └── package.json            # Frontend dependencies & scripts
│
├── .gitignore
├── README.md

## Prerequisites
- Node.js installed
- PostgreSQL installed and running
- Prisma installed globally (`npm install -g prisma`)

## Environment Variables
Create a `.env` file in the `api/` folder with the following content:
```
DATABASE_URL="postgresql://<username>@localhost:5432/moodjournal?schema=public"
JWT_SECRET="<enter your secret>"
WEATHER_API_KEY="<add your weather api key>"
CLIENT_URL=<frontend url>
```

## Installation & Running the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/moodjournal.git
   cd moodjournal
   ```

2. Set up the environment variables as described above.

3. Install dependencies for the frontend:
   ```sh
   cd client
   npm install
   npm start
   ```

4. Set up the database using Prisma:
   ```sh
   cd api
   npx prisma migrate dev --name init
   npx prisma studio
   ```

5. Run the backend API:
   ```sh
   node server.js
   ```

## Usage
- Navigate to the frontend URL 
- Register or log in to access your mood journal.
- Create new journal entries, and the current weather will be fetched automatically.
- View and manage past journal entries.





