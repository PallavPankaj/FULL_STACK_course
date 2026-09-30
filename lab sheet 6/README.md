# API Lab - Task Manager Mini App

Based on BTCS303P-AS07 Lab Sheet 6.

## 1. Server
```bash
cd server
npm install
npm run dev
```
API: http://localhost:5000

GET routes do not require the API key. POST, PUT and DELETE require:
`x-api-key: api-lab-secret`

## 2. Plain JavaScript client
Open `client/index.html` in a browser while the server is running.

## 3. React client
```bash
cd client-react
npm install
npm run dev
```
Open the Vite URL shown in the terminal.

## API endpoints
- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

## Postman
Import `postman/API Lab.postman_collection.json` and update the collection variable `baseUrl` if needed.
