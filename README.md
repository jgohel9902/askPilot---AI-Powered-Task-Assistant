# 🚀 askPilot — AI-Powered Task Assistant (React + Node + MongoDB)

askPilot is a modern, AI-assisted productivity app designed with a premium SaaS-style UI.  
Manage tasks visually using a Kanban board, get AI recommendations, personalize UI settings, and run everything locally — no paid API key required.

---

## ✨ Features

✅ Clean & modern UI with sidebar, topbar, cards & animations  
✅ Kanban board — To Do / In Progress / Done  
✅ Create, Update Status, Delete, Drag + Drop (optional)  
✅ AI Suggestions for tasks  
- Works FREE using **Ollama + Llama 3.1:8B**  
- Auto-upgrades to OpenAI if key provided  
✅ Personal Settings (display name, avatar, compact mode, default priority)  
✅ MongoDB database for persistence  
✅ Fully local mode supported (offline AI + local DB)  

---

## 🧠 Tech Stack

### Frontend
- React + Vite
- React Router
- Framer Motion (animations)
- Radix UI Tooltip
- Sonner (toasts)
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- CORS + Morgan
- Free AI: **Ollama (Llama3.1:8b)**
- Optional: **OpenAI API**

---

## 📂 Project Structure (Monorepo)
askpilot/
├─ backend/
│ ├─ src/
│ │ ├─ config/ # db.js
│ │ ├─ controllers/ # taskController, aiController
│ │ ├─ models/ # Task.js
│ │ ├─ routes/ # taskRoutes, aiRoutes
│ │ └─ server.js
│ ├─ package.json
│ └─ .env.example
└─ frontend/
├─ src/
│ ├─ components/ # layout, tasks, ai panel
│ ├─ context/ # SettingsProvider, ThemeProvider
│ │ └─ tasks/ # TasksContext, TasksProvider
│ ├─ hooks/ # useTasks, useSettings, useAI
│ ├─ pages/ # Dashboard, Settings
│ ├─ lib/ # motion wrapper
│ ├─ App.jsx, main.jsx, styles.css
├─ index.html
├─ package.json
└─ .env.example
------------------------------------------------------------------
## ⚙️ Setup & Installation
------------------------------------------------------------------
### 1️⃣ Backend Setup

```bash
cd backend
cp .env.example .env    # update values if needed
npm install
npm run dev
```

Expected output:
✅ MongoDB connected
🚀 API running on http://localhost:5000

------------------------------------------------------------------
2️⃣ Frontend Setup
cd ../frontend
cp .env.example .env    # confirm URL is correct
npm install
npm run dev

Open browser → http://localhost:5173

------------------------------------------------------------------
🤖 AI Setup (Free Local Mode)

This project works with NO API KEY by default using Ollama.

Install Ollama
Download: https://ollama.com/download

Then pull the model:
ollama pull llama3.1:8b

Ensure your backend .env contains:
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b


📦 Available Scripts
Backend
Command	                 Description
npm run dev	          Run with nodemon
npm start	              Run normally

Frontend
Command               	Description
npm run dev	        Start Vite dev server
npm run build	         Build for production
npm run preview      	Preview build locally

🏷️ Suggested GitHub Tags
react, nodejs, express, mongodb, vite, ai, ollama, openai, productivity, task-manager, kanban, framer-motion, radix-ui
