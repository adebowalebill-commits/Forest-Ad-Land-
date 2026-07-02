# Forest Ad Land

Welcome to the **Forest Ad Land** repository. 

Forest Ad Land is a global digital land and advertising ecosystem where users, businesses, and a utility token interact seamlessly. This project moves beyond short-term hype to build a real product with long-term utility, where digital land ownership unlocks active features like advertising placement, visibility, and ecosystem rewards.

## Core Documentation
- [Product Requirements Document (PRD)](./PRD.md) - Vision, Target Audience, and Core Mechanics.
- [Technical Development Document (TDD)](./TDD.md) - Architecture, Tech Stack, and Data Models.
- [Agent Instructions](./Agent.md) - Rules and context for AI agents working on this repo.

---

## Tech Stack
- **Backend:** Node.js + Express (TypeScript)
- **Database & Auth:** Supabase (Managed PostgreSQL)
- **Blockchain Layer:** Solana (SPL Tokens & NFTs)
- **Frontend (Planned):** React / Next.js

---

## Getting Started: Backend

The backend is located in the `/backend` directory.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- A [Supabase](https://supabase.com/) account/project

### Setup Instructions

1. **Install Dependencies**
   Navigate to the backend directory and install the required npm packages:
   ```bash
   cd backend
   npm install
   ```

2. **Database Setup**
   - Go to your Supabase project's SQL Editor.
   - Copy the contents of [`backend/supabase_schema.sql`](./backend/supabase_schema.sql) and run it to instantly create all necessary tables and enums for the project.

3. **Environment Variables**
   Create a `.env` file inside the `/backend` directory and add your Supabase credentials:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   PORT=5000
   ```

4. **Run the Server**
   Start the development server using `nodemon` and `ts-node`:
   ```bash
   npx nodemon src/index.ts
   ```
   The server should now be running on `http://localhost:5000`.

---

## Project Structure
```
/
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   ├── config/           # Supabase client config
│   │   ├── routes/           # Core Module APIs (Auth, Ads, Properties, Marketplace)
│   │   └── index.ts          # Entry point
│   ├── supabase_schema.sql   # Database migration file
│   └── package.json
├── PRD.md                    # Product Requirements Document
├── TDD.md                    # Technical Development Document
├── Readme.md                 # Project Overview (You are here)
└── Agent.md                  # AI Agent Context
```
