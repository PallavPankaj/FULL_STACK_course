# BTCS303P - Lab Sheet 5: Express.js

Complete Express.js practical covering routing, middleware, REST APIs, CRUD, error handling, static files, dotenv and a Library Management Mini API.

## Setup

```bash
npm install
npm run dev
```

Server: http://localhost:4000

## Important

Update the roll number in `index.js` before submission.

## Main endpoints

- GET `/`
- GET `/about`
- GET `/courses`
- POST `/echo`
- GET `/students/:id` (router equivalent: `/api/students/:id`)
- GET `/search?name=Pallav&age=19`
- GET `/products/:category/:id`
- GET `/admin/dashboard` with header `x-api-key: lab5-secret-key`
- POST `/register`
- POST `/contact`
- `/api/books` full CRUD
- `/api/members` full CRUD
- `/api/tasks` full CRUD

The final mini-project uses `/api/books` and `/api/members`, request logging, fake authentication, centralized error handling, routers and dotenv as required by the lab sheet.
