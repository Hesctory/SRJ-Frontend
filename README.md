# SRJ System — Frontend

Admin dashboard for a school management system. It covers student enrollment, tuition payments, lunch/product sales, staff management, and reporting — all built with [React Admin](https://marmelab.com/react-admin/) on top of a REST API.

> **This is the frontend-only repository.** It will not work without its backend running. See the [backend repository](https://github.com/Hesctory/SRJ-Backend) for setup instructions.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher
- The **SRJ Backend** running and accessible (default: `http://localhost:4000`)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Hesctory/SRJ-Frontend.git
npm install
```

---

## Running the app

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default. It expects the backend API at `http://localhost:4000/api`.

### Production build

```bash
npm run build      # outputs to dist/
npm run serve      # preview the production build locally
```

---

## Other scripts

| Script | Description |
|---|---|
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint with auto-fix |
| `npm run format` | Format source files with Prettier |

---

## Local testing with JSON Server

A `db.json` file and `json-server.js` are included for local testing without a real backend:

```bash
npx json-server --watch db.json --port 3000
```

> **Note:** `db.json` is a development fixture. There is no guarantee the app will work correctly with it — it may be outdated or incomplete. Always use the real backend for actual work.

---

## Backend

The backend lives in a separate repository:

**https://github.com/Hesctory/SRJ-Backend**

Make sure it is running before starting the frontend. Authentication, all data, and business logic depend entirely on it.
