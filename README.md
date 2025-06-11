# Lucky Draw System

A simple NestJS + React lucky draw application.

This project was created for a take-home assignment.

## Tech Stack
-   **Backend**: NestJS, TypeScript
-   **Frontend**: React, TypeScript, CSS Modules
## How to Run

You'll need two separate terminal windows to run both the API and the UI.

**1. Run the Backend API (`lucky-draw-api` folder)**
```bash
cd lucky-draw-api
npm install
npm run start:dev
```

The backend will be running at `http://localhost:3000`.

**2. Run the Frontend UI (`lucky-draw-ui` folder)**

In a new terminal:
```bash
cd lucky-draw-ui
npm install
npm start
```

The frontend will be running at `http://localhost:3001`.

--- 
## Notes
-   The backend used the standard NestJS Module, Controller, Services pattern to keep the code orgranized and easy to maintain.
-   The draw uses the Fisher-Yates shuffle algorithm since it's both efficient (O(n)) and provides a fair random selection.
-   The current in-memory data storage is for the demo. In production, I would use a database and perform the random selection there directly to handle a large number of users.