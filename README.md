# CRUX

> The workspace where code, context, and compute converge.

CRUX is a next-generation cloud development platform that combines repository-aware AI, instant development environments, real-time collaboration, and secure containerized execution into a single workspace.

Built for developers who want to go from idea to deployment without spending time configuring environments, managing dependencies, or switching between tools.

---

## Vision

Modern development is fragmented.

Developers jump between:

* IDEs
* GitHub
* Cloud environments
* AI assistants
* Deployment platforms
* Documentation

CRUX brings these workflows into a single intelligent workspace.

Imagine combining:

* Cursor's AI-native development
* GitHub Codespaces' cloud environments
* Replit's instant execution
* VS Code Live Share collaboration
* Docker's isolation
* Repository-aware RAG intelligence

into one platform.

---

## Core Principles

### Zero Setup

Launch a fully configured workspace instantly.

No:

```bash
npm install
python -m venv venv
go mod init
```

Just open a workspace and start building.

---

### Repository-Aware Intelligence

CRUX indexes your repository and provides context-aware assistance.

The AI understands:

* project structure
* architecture
* code relationships
* documentation
* previous implementations

instead of responding with generic suggestions.

---

### Compute Built In

Every workspace runs inside isolated containers.

Supported runtimes:

* Node.js
* Python
* Go

Additional runtimes planned:

* Rust
* Java
* C++
* Bun

---

### Real-Time Collaboration

Work with teammates inside a shared workspace.

Features:

* shared files
* live cursors
* collaborative editing
* synchronized workspaces

---

### GitHub Native

Connect repositories directly.

Capabilities:

* clone repositories
* commit changes
* push updates
* create pull requests
* sync workspace state

without leaving CRUX.

---

## Architecture

```text
CRUX
│
├── Web Application
├── API Layer
├── AI Services
├── Workspace Runtime
├── Container Infrastructure
└── Collaboration Engine
```

---

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Radix UI
* Framer Motion
* Lenis

### Backend

* Node.js
* Express
* TypeScript

### Database

* PostgreSQL
* Prisma ORM

### AI

* Repository-Aware RAG
* MCP Integration
* Multi-Model Support

### Infrastructure

* Docker
* Turborepo
* pnpm Workspaces

---

## Repository Structure

```text
apps/
├── web/
├── api/
└── worker/

packages/
├── db/
├── types/
├── ui/
└── config/

services/
├── rag/
├── github/
├── sandbox/
└── mcp/

docker/
├── node/
├── python/
└── go/
```

---

## Planned Features

### Workspace Runtime

* Instant cloud workspaces
* Persistent environments
* Multi-language support
* Live previews

### AI Development

* Repository-aware chat
* Context retrieval
* AI code generation
* Automated debugging
* AI code reviews

### Collaboration

* Multi-user workspaces
* Shared editing
* Presence indicators
* Live collaboration

### Infrastructure

* Secure Docker sandboxes
* Workspace snapshots
* Environment templates
* Resource management

### Project Ecosystem

* Public project profiles
* Workspace sharing
* Team workspaces
* Community discovery

---

## Current Status

CRUX is currently under active development.

The foundation includes:

* Landing experience
* Design system
* Monorepo architecture
* Database package
* Workspace infrastructure planning

Upcoming milestones:

1. Authentication
2. Workspace provisioning
3. GitHub integration
4. Container execution
5. Repository indexing
6. AI orchestration
7. Real-time collaboration

---

## Long-Term Goal

Build the operating system for modern software development.

A workspace where:

* code lives
* context is preserved
* compute is available instantly
* AI understands the entire repository
* teams collaborate in real time

without leaving the browser.

---

**CRUX — The workspace where code, context, and compute converge.**
