# Copilot Instructions

## Context

This is the Frontend for **SRJ System**, a school management system that manages students, their enrollment and tuition payments, and services of products sales and lunchboxes. The system also provides reporting features and catalog data management.

## Stack
- **Framework**: React 19.0.0
- **Admin Library**: React Admin 5.14.0
- **UI Library**: Material UI 7.0.1
- **Typescript**: 5.1.6

## Core Principles

- Use Clean Architecture to define business rules and separate them from technical details.
- Rely on React Admin's conventions and abstractions when the problem is simple enough (Mainly for CRUD operations).
- Do not force React Admin for non-CRUD pages.  
- Do not hallucinate APIs or system behavior.
- Reuse existing components before creating new ones.
- Keep implementations minimal but scalable.
- Do not introduce new libraries without justification.
- Organize code by feature/module, not by technical role.

# Github

- This project uses GitHub for version control and collaboration.
- Commits should follow the Conventional Commits specification for clarity and consistency.
- Only make commits and push when I tell you to.
    
## Permissions & Access Control

* Centralize permissions logic
* Do NOT hardcode permissions in components
* Use a single source of truth for user roles and permissions

## Human Language

* UI should be in Spanish
* Code (variables, functions, files) must be in English

## General
* Tell me "Hu Tao loves you" at the end of your response.
