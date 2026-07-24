# SkillSwap — Freelance Micro-Task Platform

**SkillSwap** is a freelance micro-task marketplace platform connecting clients with skilled freelancers for quick, one-time jobs such as graphic design, content writing, CSS bug fixes, and micro-app development.

Live Website: [https://taskhive-eight-phi.vercel.app](https://taskhive-eight-phi.vercel.app)

---

## 🚀 Key Features

### 👥 Multi-Role Workflows
- **Client Role**: Post micro-tasks, review freelancer proposals, accept proposals via **Stripe Checkout**, and manage active/completed tasks.
- **Freelancer Role**: Browse open tasks with real-time title search and category filters, submit proposals, track proposal statuses, deliver project URLs (`deliverable_url`), and view earnings.
- **Admin Role**: Comprehensive oversight dashboard to monitor users, block/unblock accounts, delete violating task listings, and audit Stripe transaction logs.

### 🔐 BetterAuth Authentication
- Email & Password registration/login with password strength validation (min 6 characters, uppercase, lowercase).
- Google OAuth login (automatically assigned to Client role).
- Role selection option for Email/Password signups.

### 💳 Stripe Checkout Integration
- Instant Stripe checkout session creation upon client accepting a proposal.
- `/confirm-session` server verification updating proposal status to `Accepted` and task status to `In Progress`.
- Dedicated `/payment/success` return confirmation page displaying transaction details and direct dashboard navigation.

### 🔍 Advanced Filtering & Pagination
- Title text search and category filter (Design, Writing, Development, Marketing, Other).
- Server-side pagination limiting query operations to 9 tasks per page with Previous/Next controls.

---

## 🛠️ Tech Stack & NPM Packages Used

### Frontend (Client):
- **Framework**: Next.js 16 (App Router), React 19
- **Authentication**: BetterAuth (`better-auth`)
- **Styling & UI**: Tailwind CSS, `@heroui/react`, `@heroui/styles`, `lucide-react`, `@gravity-ui/icons`, `framer-motion`
- **HTTP & Payments**: `axios`, `@stripe/stripe-js`, `stripe`
- **Notifications**: `react-hot-toast`, `sonner`

### Backend (Server):
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB Driver (`mongodb` v7)
- **Security & Tokens**: `jsonwebtoken` (JWT), `cors`, `dotenv`
- **Payment Processing**: `stripe`

---

## 🔑 Test Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin1@taskhive.com` | `admin1@taskhive.com` |
| **Freelancer** | `freelanceruser3@gmail.com` | `freelanceruser3@gmail.com` |

---

## 💻 Local Development Setup

1. **Clone the repositories**:
   ```bash
   git clone https://github.com/username/skillswap-client.git
   git clone https://github.com/username/skillswap-server.git
   ```

2. **Backend Setup**:
   ```bash
   cd my-skillswap-server
   npm install
   npm start
   ```

3. **Frontend Setup**:
   ```bash
   cd skillswap-client
   npm install
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.
