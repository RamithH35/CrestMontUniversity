# Crestmont University - Digital Campus & Events Portal

Welcome to the **Crestmont University Digital Campus & Events Portal**, a premium, state-of-the-art web application designed to showcase Crestmont's academic departments, student-led clubs, and upcoming campus events. 

Built using a modern fullstack architecture, this platform features responsive duotone visual grids, smooth scroll-reveal animations, JWT-based administrator authorization, and automated content moderation driven by the Google Gemini API.

---

## 🌟 Key Features

### 🏫 Academic Departments Directory
- Detailed overview of the university's 5 core departments (Technology, Business, Arts & Culture, Media, and Natural Sciences).
- Dynamic details pages featuring academic accomplishments and faculty profiles.
- Integrated lists filtering matching events for each department.

### 👥 Student-Led Clubs & Guilds
- Dedicated showcase of campus clubs (CodeForge Club, AeroDesign Society, EcoImpact Collective, Robotics Guild, and Entrepreneurs Cell).
- Individual detail pages displaying club purpose, achievements, and an event agenda (separating upcoming and past events).

### 📅 Advanced Event Management
- Real-time catalog of upcoming, marquee, and past events with a fully responsive grid.
- Interactive filter controls matching categories (Technology, Business, Culture, Community) and role requirements (Volunteer, Register, Both).
- Smart forms validation verifying links against active Google Form URLs.

### 🔒 Secure Administrator Workspace
- Double-authenticated Login Portal checking matching credentials and club selector dropdown.
- Scoped Dashboard allowing authenticated Club Heads to create events specifically under their own club name.
- JWT role validation checking payload values inside server-side endpoints.

### 🤖 Gemini AI Moderation (Fail-Closed)
- Powered by the current `@google/genai` SDK.
- Automated title/description checks screening for spam, inappropriate terms, and club relevance (e.g. preventing a robotics club from publishing a baking event).
- Strict **fail-closed** architecture: any API issues or timeouts reject the submission to keep the site secure.

---

## 📂 Project Structure

```text
fullstack-web/
├── backend/                  # Express.js REST API
│   ├── middleware/           # Auth middlewares
│   ├── models/               # Mongoose MongoDB models (Event, ClubHead, Club, Department)
│   ├── routes/               # API Router Handlers (events, auth, clubs, departments)
│   ├── seed.js               # Database seeding utility
│   ├── index.js              # Server entry point
│   └── package.json
│
└── frontend/                 # React SPA Client
    ├── src/
    │   ├── components/       # Layouts, Navbar, EventCard, DuoImage
    │   ├── pages/            # Home, CampusLife, Departments, Clubs, Detail views, Login, CreateEvent
    │   ├── lib/              # Framer Motion design systems and configurations
    │   ├── index.css         # Tailwind directives and CSS tokens
    │   └── App.js            # Router definitions
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas or local MongoDB instance

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/RamithH35/CrestMont.git
cd CrestMont
```

### 2️⃣ Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Configure your environment variables inside `.env`:
   - `MONGODB_URI`: Your MongoDB Atlas URI.
   - `JWT_SECRET`: Random string for signing credentials.
   - `GEMINI_API_KEY`: Your Gemini API Key from Google AI Studio.
   - `UNSPLASH_ACCESS_KEY`: Unsplash developer access token for card images.

### 3️⃣ Seed the Database
Populate initial academic departments, student clubs, demo events, and the default admin account:
```bash
npm run seed
```

### 4️⃣ Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

Open your browser and visit: **http://localhost:3000**

---

## 🔑 Demo Credentials

To access the Event Creation Dashboard as a Club Head, you can use the following public demo credentials:
- **Username**: `admin`
- **Password**: `password123`

Events created with these credentials are automatically deleted from the database exactly **1 hour** after creation. Feel free to test the full Club Head flow!

---

## ⚙️ Tech Stack
- **Frontend**: React (SPA), Tailwind CSS, Framer Motion, React Router v6.
- **Backend**: Node.js, Express.js, Mongoose (MongoDB ODM), JSON Web Tokens (JWT), BcryptJS.
- **AI Integrations**: Official `@google/genai` SDK (model: `gemini-2.5-flash`).
- **Assets**: Dynamic Unsplash Image API matching event tags.
