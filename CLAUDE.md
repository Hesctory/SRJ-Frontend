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

## Project structure

```
src/
├── presentation/
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   └── pages/               # Login page and dashboard (Home, PlaceholderPage)
├── ra/
│   ├── CustomButtons/       # Reusable React Admin button components
│   ├── CustomRoutes/        # Non-CRUD pages organized by module (students/, lunches/, etc.)
│   ├── layout/              # Custom Admin layout, menu, SubMenu
│   └── resources/           # React Admin Resource definitions (CRUD)
├── types/                   # Shared TypeScript interfaces (flat, no domain layers)
├── utils/                   # Utility functions (token parsing, etc.)
├── App.tsx                  # React Admin root — registers resources, AppCustomRoutes
├── authProvider.ts          # Auth: login/logout/checkAuth using localStorage
├── modules.tsx              # Navigation module tree (8 modules, ~45 items)
└── index.tsx                # Entry point
```

**Key architectural decisions:**
- **React Admin** handles CRUD resources in `src/ra/resources/`. Use proper `List`/`Edit` components; do not use `ListGuesser`/`EditGuesser`.
- **Custom pages** (non-CRUD) live in `src/ra/CustomRoutes/`, organized by module. They are exported as `AppCustomRoutes` from `src/ra/CustomRoutes/index.tsx` and registered once in `App.tsx`.
- **Auth state** is stored in `localStorage` (`token`, `user`). Role/permissions are read from `user.roles` — no separate `role` key.
- **Navigation** is driven by `modules.tsx` — the `MyMenu` component reads from this config to render the hierarchical sidebar.
- **Data layer** is flat: shared types in `src/types/`, utilities in `src/utils/`. No Clean Architecture layers (UseCases/Repositories were removed).
- **Backend**: real API at `http://localhost:4000/api`; JSON Server at `http://localhost:3000` is for local testing only.
- **Permissions** must be centralized — do NOT hardcode role checks in individual components.

## Core Principles

- Use flat `src/types/` and `src/utils/` structure — do NOT introduce UseCase/Repository/Domain layers.
- Use React Admin conventions for CRUD; do NOT force React Admin for non-CRUD pages.
- Organize new code by **feature/module**, not by technical role.
- Reuse existing components before creating new ones.
- Do not introduce new libraries without justification.
- Do not hallucinate APIs or system behavior.

## JSON SERVER

- JSON server is useless most of the time, but it doesn't mean it should be deleted, sometimes, is usefull for testing, so never remove it. But when I ask for new features, or refactoring existing features, never read the json server as a source of truth.

## Conventions

- **UI language**: Spanish
- **Code language**: English (variables, functions, file names)
- **Commits**: Follow Conventional Commits specification. Only commit/push when explicitly asked.
- **Permissions**: Single source of truth for roles/permissions; never hardcode in components.

## Response Convention

End every response with: **Hu Tao loves you**

