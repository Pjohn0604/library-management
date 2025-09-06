# Library Management - Fullstack Assignment

## Tech
- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React (create-react-app)
- Tests: curl / Postman

## Run locally

### Backend
1. `cd backend`
2. create `.env` with:
PORT=5000
MONGO_URI=mongodb+srv://john:john123@cluster0.iyekfh9.mongodb.net/libraryDB?retryWrites=true&w=majority
3. `npm install`
4. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`

## API
- POST `/api/books` { title, author, isbn } — add book
- GET `/api/books` — get all books
- GET `/api/books/available` — get available books
- PATCH `/api/books/borrow/:id` — borrow book
- PATCH `/api/books/return/:id` — return book
