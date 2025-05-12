# Mini CRM – Xeno SDE Internship Assignment

This is a full-stack CRM application built for the Xeno SDE Assignment

It allows users to:
- Sign in using Google Authentication
- Create marketing campaigns using rule-based filters
- Preview the audience size before launching a campaign
- Simulate delivery of messages to customers
- View history of past campaigns with success/failure status

---

## Live Demo

- Frontend: [https://mini-crm-sigma.vercel.app](https://mini-crm-sigma.vercel.app)
- Backend: [https://minicrm-1-zxyz.onrender.com](https://minicrm-1-zxyz.onrender.com)

---

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Authentication**: Firebase (Google Auth)
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **AI Rule Parser**: Custom regex-based logic (no external API)
- **Deployment**: Vercel (frontend) & Render (backend)

---

## How to Run Locally

### Backend

```open terminal
cd backend
npm install
npm run dev
PORT=4000(according to your choice)
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
```
### Frontend

```open terminal
cd frontend
npm install
npm start
```
Note: Do setup for firebase using firebase console(if want google authentication)
