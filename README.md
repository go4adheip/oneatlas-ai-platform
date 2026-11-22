# ONEATLAS.DEV — AI Model Discovery & Intelligence Platform

ONEATLAS.DEV is a web-based platform designed to help users discover, explore, compare, and evaluate different AI models from multiple providers.

The platform provides model information, pricing, capabilities, specifications, rankings, and provider details through a unified interface.

## 🌐 Live Demo

**Website:** https://oneatlas-ai-platform-beta.vercel.app

**GitHub Repository:** https://github.com/go4adheip/oneatlas-ai-platform

**Backend API:** https://oneatlas-ai-platform.onrender.com

## ✨ Features

- **AI Model Discovery:** Browse and explore AI models from different providers.
- **Search and Filtering:** Find models using search, categories, and capabilities.
- **Model Details:** View descriptions, specifications, pricing, and capabilities.
- **Model Comparison:** Compare multiple AI models side by side.
- **Rankings and Leaderboards:** Explore model rankings and scores.
- **AI Provider Directory:** Discover AI companies and their models.
- **Responsive Interface:** Access the platform through a modern web interface.
- **Database Integration:** Store and retrieve model information using PostgreSQL.
- **REST API:** Retrieve model information through an Express.js backend.

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- React Router
- Lucide React
- Recharts
- CSS

### Backend
- Node.js
- Express.js
- REST API
- PostgreSQL
- node-postgres (pg)

### Deployment
- Vercel — Frontend hosting
- Render — Backend hosting and PostgreSQL database
- GitHub — Source code management

## 🏗️ Project Structure

text
ONEATLAS.DEV/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Models.jsx
│   │   │   ├── ModelDetails.jsx
│   │   │   ├── Comparison.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   └── Providers.jsx
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── Home.jsx
│   ├── vercel.json
│   └── package.json
│
├── server/
│   ├── routes/
│   │   └── models.js
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md


## ⚙️ Installation and Setup

### Prerequisites

- Node.js
- npm
- PostgreSQL
- Git

### 1. Clone the Repository

bash
git clone https://github.com/go4adheip/oneatlas-ai-platform.git
cd oneatlas-ai-platform

### 2. Set Up the Backend

bash
cd server
npm install


Create a `.env` file inside the `server` directory:

env
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=oneatlas
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

Create a PostgreSQL database named `oneatlas`.

Start the backend:

bash
node server.js


The backend will run at:

`http://localhost:5000`

### 3. Set Up the Frontend

Open another terminal:

bash
cd client
npm install
npm run dev


The frontend will run at the local Vite address displayed in your terminal, usually:

`http://localhost:5173`

## 🔌 API Endpoint

### Get All AI Models

http
GET /api/models

Production endpoint:

`https://oneatlas-ai-platform.onrender.com/api/models`

The API returns model information including:

- Model name
- Provider
- Category
- Description
- Capabilities
- Input pricing
- Output pricing
- Context window

## 🗄️ Database

The application uses PostgreSQL to store AI model information.

The models table contains:

| Field | Description |
|---|---|
| id | Unique model identifier |
| name | Model name |
| provider | AI model provider |
| category | Model category |
| description | Model description |
| capabilities | Supported capabilities |
| input_price | Input pricing |
| output_price | Output pricing |
| context_window | Context window size |

## 🚀 Deployment

- Frontend deployed using Vercel.
- Backend deployed using Render.
- PostgreSQL hosted on Render.
- Source code maintained on GitHub.

## ⚠️ Data Disclaimer

The platform includes demonstration model data. Pricing, specifications, and leaderboard scores should be independently verified before being used for production decisions.

## 👨‍💻 Author

**ONEATLAS.DEV**

AI Model Discovery & Intelligence Platform.