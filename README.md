# RemarksFlow – Bank Loan Verification Report Automation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Node-18.x-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-brightgreen)](https://www.mongodb.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38b2ac)](https://tailwindcss.com/)

**RemarksFlow** is a full‑stack MERN application that automates the creation of bank loan verification reports. It replaces manual copy‑pasting in Word with a fast, validated form‑to‑PDF workflow, reducing report generation time from 20+ minutes to under a minute while ensuring consistency and quality.

---

## 🚀 The Problem

Back‑office teams in verification agencies waste hours manually:
- Copying data from WhatsApp/email into old Word files.
- Fixing broken formatting and typos.
- Remembering complex bank‑specific formats.

This leads to high error rates, frustrated employees, and delayed submissions.

---

## 💡 The Solution

RemarksFlow provides a **TurboTax‑like guided experience**:

1. **Select a bank** from a clean dashboard.
2. **Choose a product** (e.g., HDFC → LS, LOS, etc.).
3. **Fill a smart form** – validation prevents mistakes.
4. **Generate a perfect PDF/Word report** in one click.

### ✨ Key Features

- **Dynamic Templates** – Report schemas are stored in MongoDB; admins can add new bank formats without touching code.
- **Live Preview** – See the formatted report update as you type.
- **Role‑Based Access** – Makers fill forms, Checkers approve, Admins manage templates.
- **Keyboard‑First Workflow** – Navigate with `Tab`, select with `Space`, submit with `Enter` – no mouse needed.
- **Real‑Time Collaboration** – See team activity, share drafts, and track status.

---

## 🛠️ Technology Stack

| Layer          | Technology                                                                 |
|----------------|----------------------------------------------------------------------------|
| **Frontend**   | React (Vite), Tailwind CSS, React Hook Form, React Router                 |
| **Backend**    | Node.js, Express.js                                                        |
| **Database**   | MongoDB + Mongoose (flexible schemas for dynamic templates)                |
| **PDF Engine** | PDFKit (with image support, custom fonts, layouts)                         |
| **Auth**       | JWT, bcrypt                                                                |
| **Deployment** | Frontend: Vercel / Netlify · Backend: Render / Railway · DB: MongoDB Atlas |

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))
- Git

### Clone the Repository
```bash
git clone https://github.com/your-org/remarksflow.git
cd remarksflow
```

### Backend Setup
```bash
cd server
npm install
cp .env.example .env   # Edit MONGO_URI, JWT_SECRET, PORT
npm run dev            # Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd client
npm install
cp .env.example .env   # Set VITE_API_BASE_URL=http://localhost:5000
npm run dev            # App runs on http://localhost:5173
```

Now open `http://localhost:5173` to start using RemarksFlow.

---

## 📁 Project Structure (Simplified)

```
remarksflow/
├── client/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/   # Reusable UI (BankCard, DynamicForm, PreviewPane)
│   │   ├── pages/        # Dashboard, Form, Admin, Login
│   │   ├── hooks/        # Custom React hooks
│   │   └── App.jsx
│   └── package.json
├── server/               # Node.js backend
│   ├── models/           # Mongoose schemas (Bank, Product, Template, Report, User)
│   ├── routes/           # Express routes (auth, banks, reports, admin)
│   ├── controllers/      # Business logic
│   ├── services/         # PDF generation, email, etc.
│   ├── middleware/       # Auth, validation, error handling
│   └── server.js
└── README.md
```

---

## 🔐 API Overview (Selected Endpoints)

| Method | Endpoint                     | Description                | Access       |
|--------|------------------------------|----------------------------|--------------|
| POST   | `/api/auth/login`            | Login → JWT                | Public       |
| GET    | `/api/banks`                 | List all banks             | Authenticated|
| GET    | `/api/templates/:productId`  | Get form structure         | Authenticated|
| POST   | `/api/reports/generate`      | Generate PDF from form data| Maker+       |
| PUT    | `/api/reports/:id/approve`   | Approve a report           | Checker only |
| CRUD   | `/api/admin/templates`       | Manage templates           | Admin only   |

All protected endpoints require `Authorization: Bearer <JWT>` header.

---

## 🧪 Running Tests

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

- **Found a bug?** Open an issue.
- **Have an idea?** Start a discussion.
- **Want to fix something?** Submit a pull request.

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

Built by [Ansh](https://github.com/Ansh-gajbhiye) and [Shantanu](https://github.com/Shantanusongirkar) to solve a real problem in the verification industry.
