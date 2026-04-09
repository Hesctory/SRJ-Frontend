# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SRJ System Frontend — a school management admin dashboard for managing students, enrollment, tuition payments, product/lunchbox sales, and reporting. Built with React Admin as the primary framework.

## Commands

```bash
npm run dev          # Start development server (Vite)
npm run build        # Production build
npm run serve        # Preview production build
npm run type-check   # TypeScript type checking
npm run lint         # ESLint with auto-fix
npm run format       # Prettier formatting
```

## GIT

- This project is versionated using Git & Github
- For adding the files, just use git add . and no lose time adding each file
- For commiting, use conventional commits

The backend data server is expected at `http://localhost:3000` (JSON Server).

## Architecture

The project follows **Clean Architecture** organized by feature/module:

```
src/
├── application/useCases/    # Business logic (use cases)
├── domain/
│   ├── entities/            # Core domain entities
│   └── valueObjects/        # Value objects with validation
├── infrastructure/
│   ├── dtos/                # Data transfer objects
│   └── services/            # HTTP/external service calls
├── repository/
│   ├── repositories/        # Repository interfaces
│   └── implementations/     # Concrete implementations
├── presentation/
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   └── pages/               # Full page components (non-CRUD)
├── ra/
│   ├── layout/              # Custom Admin layout, menu, SubMenu
│   └── resources/           # React Admin Resource definitions (CRUD)
├── App.tsx                  # React Admin root — registers resources, routes, providers
├── authProvider.ts          # Auth: login/logout/checkAuth using localStorage
├── modules.tsx              # Navigation module tree (~8 modules, ~40 items)
└── index.tsx                # Entry point
```

**Key architectural decisions:**
- **React Admin** handles CRUD resources in `src/ra/resources/`. Use `ListGuesser`/`EditGuesser` or proper `List`/`Edit` components.
- **Custom pages** (non-CRUD) live in `src/presentation/pages/` and are registered as `<CustomRoutes>` in `App.tsx`.
- **Auth state** is stored in `localStorage` (`token`, `user`, `role`). The `authProvider.ts` wires Clean Architecture layers (UseCase → Repository → API).
- **Navigation** is driven by `modules.tsx` — the `MyMenu` component reads from this config to render the hierarchical sidebar.
- **Permissions** must be centralized — do NOT hardcode role checks in individual components.

## Core Principles

- Use Clean Architecture to separate business rules from technical details.
- Use React Admin conventions for CRUD; do NOT force React Admin for non-CRUD pages.
- Organize new code by **feature/module**, not by technical role.
- Reuse existing components before creating new ones.
- Do not introduce new libraries without justification.
- Do not hallucinate APIs or system behavior.

## Conventions

- **UI language**: Spanish
- **Code language**: English (variables, functions, file names)
- **Commits**: Follow Conventional Commits specification. Only commit/push when explicitly asked.
- **Permissions**: Single source of truth for roles/permissions; never hardcode in components.

## Response Convention

End every response with: **Hu Tao loves you**
