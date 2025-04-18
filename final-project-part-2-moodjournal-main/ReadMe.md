# MoodJournal

MoodJournal is a web-based application that allows users to log their daily moods and journal entries. The application integrates a weather API to provide the current weather conditions at the time of the journal entry. The backend is built using Node.js and Prisma, while the frontend is developed with React.

## Features
- User authentication (Login/Register/Logout) with JWT-based token authentication.
- CRUD operations for journal entries.
- Integration with an external Weather API to fetch and store the current weather.
- Responsive frontend built with React.
- PostgreSQL database managed via Prisma ORM.

## Project Structure
```
MoodJournal/
├── api/                # Backend code (Node.js + Prisma)
│   ├── prisma/        # Database schema
│   ├── middleware/    # Authentication middleware
│   ├── routes/        # API routes (auth & journal entries)
│   ├── utils/         # External API integrations
│   ├── server.js      # Express app entry point
│   ├── package.json   # Backend dependencies
│   └── .env           # Environment variables
│
├── client/            # Frontend code (React)
│   ├── public/        # Static files
│   ├── src/           # Source code
│   │   ├── pages/     # React pages (Login, Dashboard, etc.)
│   │   ├── services/  # API utilities
│   │   ├── App.js     # Root component
│   │   ├── index.js   # React entry point
│   │   ├── setupTests.js  # Testing setup
│   ├── package.json   # Frontend dependencies
│   └── README.md      # Frontend documentation
│
├── .gitignore         # Ignores node_modules, .env, etc.
├── README.md          # Project description & deployment info
```

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
- Navigate to the frontend URL (usually `http://localhost:3000`).
- Register or log in to access your mood journal.
- Create new journal entries, and the current weather will be fetched automatically.
- View and manage past journal entries.





