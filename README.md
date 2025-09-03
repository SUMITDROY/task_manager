# **Task Manager App** ✅

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)

A **full-stack task management application** built with **Next.js 14**, **TypeScript**, **MongoDB**, and **JWT authentication**.  
The app helps users **sign up, log in, and manage their tasks** with a modern, sleek UI — all in one place.

---

## **🌟 Why This Project**

- 🚀 **Complete Full-Stack Solution** – Frontend, backend, and database in one Next.js project.
- 🔒 **Secure Authentication** – JWT-based login system with password hashing using `bcrypt`.
- 🎨 **Modern UI** – Clean, responsive design powered by `shadcn/ui` + Tailwind CSS.
- 🗂 **Organized Structure** – Scalable file structure ready for real-world apps.
- ☁ **Vercel Deployment Ready** – Push to GitHub → Deploy to Vercel in minutes.

---

## **✨ Features**

### **Authentication**
- User sign-up and login with JWT.
- Passwords hashed for security.

### **Task Management**
- Create, read, update, and delete tasks (CRUD).
- Toggle completion status.
- Progress bar for completed tasks.

### **UI/UX**
- Dark, modern, mobile-first interface.
- Smooth animations and hover states.
- Minimal yet functional dashboard.

### **Deployment**
- Works seamlessly on **Vercel** with MongoDB Atlas.

---

## **🗂 Project Structure**

src/
│
├── app/
│ ├── api/
│ │ ├── auth/
│ │ │ ├── signup/route.ts # Register user
│ │ │ └── login/route.ts # Login user
│ │ │
│ │ └── tasks/
│ │ ├── route.ts # GET & POST tasks
│ │ └── [id]/route.ts # PATCH & DELETE task
│ │
│ ├── dashboard/
│ │ └── page.tsx # Task dashboard page
│ │
│ └── login/
│ └── page.tsx # Login page
│
├── lib/
│ └── db.ts # MongoDB connection
│
└── types/
└── task.ts # Task TypeScript interfaces

yaml
Copy code

---

## **🛠 Tech Stack**

| Layer          | Technology |
|----------------|------------|
| **Frontend**   | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui |
| **Backend**    | Next.js API Routes (App Router) |
| **Database**   | MongoDB Atlas + Mongoose |
| **Auth**       | JWT, bcrypt |
| **Deployment** | Vercel |

---

## **🚀 Getting Started**

### **1. Clone the Repository**
```bash
git clone https://github.com/<your-username>/task-manager.git
cd task-manager
2. Install Dependencies
bash
Copy code
npm install
3. Setup Environment Variables
Create a .env.local file in the root folder and add:

env
Copy code
DATABASE_URL=mongodb+srv://<your-mongodb-cluster>
JWT_SECRET=your-secret-key
⚠ Important:

Never commit this file to GitHub.

Use MongoDB Atlas for a free cloud database.

4. Run the Project
bash
Copy code
npm run dev
The app will be live at http://localhost:3000

📡 API Endpoints
Method	Endpoint	Description	Auth
POST	/api/auth/signup	Register new user	❌ No
POST	/api/auth/login	Login user	❌ No
GET	/api/tasks	Fetch all tasks	✅ Yes
POST	/api/tasks	Create new task	✅ Yes
PATCH	/api/tasks/:id/toggle	Toggle completion	✅ Yes
DELETE	/api/tasks/:id	Delete a task	✅ Yes

📊 Future Enhancements
Role-based dashboards: Admin, Manager, Developer, Client.

Drag-and-drop Kanban board for tasks.

Real-time updates with WebSockets or Supabase Realtime.

Email verification and password reset.

Light/Dark mode toggle.

🌐 Live Demo
Once deployed, add your Vercel link here:

Live URL: https://your-vercel-app.vercel.app

👨‍💻 Author
Sumit Debroy

💼 LinkedIn

🌐 Portfolio

📜 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute with attribution.


---
