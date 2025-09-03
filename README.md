Task Manager App

A full-stack task management application built with Next.js 14, TypeScript, MongoDB, and JWT authentication.
It provides a simple yet powerful interface for users to sign up, log in, and manage their daily tasks with ease.

The project is designed to demonstrate clean architecture, modern UI practices, and scalable backend APIs, making it ideal for learning, production, or as a base for more complex SaaS platforms.

🌟 Why This Project is Awesome

End-to-End Full-Stack Solution
Covers frontend, backend, and database all within a single Next.js application.

Authentication Built-In
Secure JWT-based sign-up and login system.

Clean & Minimal UI
Built with shadcn/ui and Tailwind CSS for a sleek, responsive design.

Scalable Codebase
Organized structure with role-based routing and modular API routes.

Vercel Deployment Ready
Deployed with a single click, using environment variables for secure configuration.

✨ Features
1. User Authentication

Sign up and log in with JWT-based authentication.

Passwords are securely hashed using bcrypt.

Token stored safely in browser localStorage.

2. Task Management

CRUD Operations:

Create new tasks.

Edit task details.

Toggle task completion.

Delete tasks.

Real-time task count and completion stats.

Simple progress tracking.

3. Modern & Responsive UI

Built with shadcn/ui for beautiful, accessible components.

Mobile-first responsive layout.

Clean minimal dashboard design.

4. REST API with Next.js

API routes managed through the Next.js App Router.

Fully integrated backend without needing a separate server.

Secured endpoints requiring JWT authentication.

5. Deployment & Scalability

Fully deployed on Vercel.

Works out of the box in production with MongoDB Atlas.

🗂️ Project Structure
src/
│
├── app/
│   ├── api/                  # API routes
│   │   ├── auth/
│   │   │   ├── signup/route.ts   # User signup
│   │   │   └── login/route.ts    # User login
│   │   └── tasks/
│   │       ├── route.ts          # Get & create tasks
│   │       └── [id]/route.ts     # Update, toggle, delete task
│   │
│   ├── dashboard/
│   │   └── page.tsx              # User's task dashboard
│   │
│   └── login/
│       └── page.tsx              # Login page
│
├── lib/
│   └── db.ts                      # MongoDB connection logic
│
└── types/
    └── task.ts                     # TypeScript interfaces


This structure keeps both frontend and backend code in one place, making it easy to manage and scale.

🛠 Tech Stack
Layer	Technology
Frontend	Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
Backend	Next.js API Routes, TypeScript
Database	MongoDB (Atlas) with Mongoose
Authentication	JWT (JSON Web Token), bcrypt
Deployment	Vercel
🚀 Getting Started Locally

Follow these steps to run the project on your local machine.

1. Clone the Repository
git clone https://github.com/your-username/task-manager.git
cd task-manager

2. Install Dependencies
npm install

3. Set Up Environment Variables

Create a .env.local file in the root of the project and add:

DATABASE_URL=mongodb+srv://<your-cluster-url>
JWT_SECRET=your-super-secret-key


Tip:

Use MongoDB Atlas
 for free cloud database hosting.

Keep these values private and never commit this file to GitHub.

4. Run the Project Locally
npm run dev


The app will be available at http://localhost:3000

📡 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/api/auth/signup	Register a new user	❌ No
POST	/api/auth/login	Log in an existing user	❌ No
GET	/api/tasks	Fetch user tasks	✅ Yes
POST	/api/tasks	Create new task	✅ Yes
PATCH	/api/tasks/:id/toggle	Toggle task completion	✅ Yes
DELETE	/api/tasks/:id	Delete a task	✅ Yes
📝 Example Task Data

When you fetch tasks (GET /api/tasks), the API returns data like this:

{
  "tasks": [
    {
      "_id": "64ff4c5c1234567890abcd",
      "title": "Finish project setup",
      "completed": false,
      "userId": "64ff4c5c1234567890abc1",
      "createdAt": "2025-08-31T12:00:00Z"
    }
  ]
}

🌍 Deployment Instructions
Step 1: Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

Step 2: Deploy on Vercel

Go to Vercel
.

Create a New Project.

Import your GitHub repo.

Add the following environment variables in Vercel:

DATABASE_URL

JWT_SECRET

Click Deploy.

Step 3: Ignore TypeScript & ESLint Errors (Optional)

If Vercel build fails due to lint/TS issues, add this to next.config.js:

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;

📊 Future Enhancements

Role-based dashboards (Admin, Manager, Developer, Client).

Real-time updates with WebSockets or Supabase Realtime.

Kanban-style task view with drag-and-drop.

Dark mode toggle.

Email verification and password reset.

🌟 Why This Project Matters

This project demonstrates real-world full-stack development with:

Authentication using JWT & hashed passwords.

Secure backend APIs with Next.js App Router.

Production-ready deployment with Vercel & MongoDB Atlas.

Clean frontend architecture for scaling.

It's a solid foundation for SaaS products, portfolio projects, or internal tools.

👨‍💻 Author

Sumit Debroy
Built with ❤️ using Next.js, MongoDB, and shadcn/ui.

🔗 Portfolio Website

🔗 LinkedIn

License

This project is licensed under the MIT License
.
You are free to use, modify, and distribute this project with attribution.
