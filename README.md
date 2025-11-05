
# My MERN App

A simple MERN stack (MongoDB, Express, React, Node.js) application ready for deployment on Microsoft Azure.

## Project Structure
```
my-mern-app/
├── client/          # React frontend
├── server/          # Node.js backend with Express and Mongoose
├── .env             # Environment variables (not pushed to GitHub)
├── .gitignore       # Git ignore configuration
└── package.json     # Root-level configuration for both frontend and backend
```

## Features
- Full-stack CRUD application using MongoDB Atlas.
- Backend API built with Express and Mongoose.
- React frontend with Axios for API communication.
- Ready for deployment on Azure App Service.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/JeffKagiri/MERN-Deployment.git
cd MERN-Deployment
```

### 2. Install Dependencies
Install both backend and frontend dependencies:
```bash
npm install
cd client && npm install && cd ..
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory:
```
PORT=5000
MONGO_URI=your-mongodb-connection-string
```

### 4. Run the Application Locally
To start the backend only:
```bash
npm run server
```

To start both backend and frontend concurrently:
```bash
npm run dev
```

The backend runs on **http://localhost:5000** and the frontend on **http://localhost:3000**.

### 5. Build the React App
Before deployment, build the production version of the React app:
```bash
npm run build --prefix client
```

### 6. Deployment on Azure
- Create an Azure App Service for Node.js.
- Connect your GitHub repository in the Deployment Center.
- In Azure Portal, go to **Configuration → Application Settings** and add:
  - `PORT` = `5000`
  - `MONGO_URI` = your MongoDB Atlas connection string
- Save and restart the app.

### 7. Verify Deployment
Visit your Azure App URL and test both frontend and backend routes.

## Technologies Used
- **Frontend:** React, Axios, CSS
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas
- **Hosting:** Microsoft Azure

## License
This project is open source and available under the [MIT License](LICENSE).
