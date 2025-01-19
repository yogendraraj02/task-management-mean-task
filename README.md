Here's the updated README file, including the Angular setup and a section for the server setup:  

```markdown
# Task Management (MEAN Stack) Setup

This document provides steps to set up and run the **Task Management** project locally, which is built using the MEAN stack (MongoDB, Express, Angular, Node.js).

## Prerequisites

Ensure the following are installed on your machine:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Angular CLI](https://angular.io/cli)
- [MongoDB](https://www.mongodb.com/try/download/community) (Ensure MongoDB is running locally)

---

## Angular Setup (Frontend)

1. **Clone the repository**  
   ```bash
   git clone git@github.com:yogendraraj02/task-management-mean-task.git
   cd task-management-mean-task
   ```

2. **Navigate to the Angular directory**  
   ```bash
   cd client
   ```

3. **Install dependencies**  
   Run the following command to install the required packages:  
   ```bash
   npm install
   ```

4. **Start the Angular development server**  
   Launch the app locally using:  
   ```bash
   ng serve
   ```

5. **Access the application**  
   Open your browser and navigate to:  
   ```
   http://localhost:4200
   ```

---

## Server Setup (Backend)

1. **Navigate to the server directory**  
   From the root directory of the project:  
   ```bash
   cd server
   ```

2. **Install dependencies**  
   Run the following command to install the required packages:  
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in the `server` directory with the following details:  
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/task-management
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Node.js server**  
   Launch the backend server using:  
   ```bash
   npm start
   ```

5. **Verify the server is running**  
   The server will start at:  
   ```
   http://localhost:3000
   ```

---

```  

This structure ensures clarity and covers both the Angular frontend and Node.js backend setup.# task-management-mean-task
# task-management-mean-task
