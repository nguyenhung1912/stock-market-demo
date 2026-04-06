# Stock Market — Angular Demo

A lightweight Angular demo application for managing a list of stocks. It demonstrates common Angular patterns and project structure including services, repositories, guards, interceptors, feature modules, and both template-driven and reactive forms.

## Table of contents

- [Features](#features)
- [Tech stack & requirements](#tech-stack--requirements)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Sample data & configuration](#sample-data--configuration)
- [Development notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)

## Features

- View a list of stocks
- Create new stocks (examples using reactive and template-driven forms)
- View stock details
- Basic authentication UI (login/register samples under `features/auth`)

## Tech stack & requirements

- Angular
- Node.js >= 14
- npm (or yarn)
- (Optional) Angular CLI for local development commands

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm start
```

The app typically serves at `http://localhost:4200` unless otherwise configured in `package.json` or environment settings.

Available npm scripts (see `package.json`):

- `start` — run the dev server
- `test` — run tests (if configured)

## Project structure

Key folders in `src/`:

- `app/`
  - `core/` — core services, repositories, interceptors, and guards
    - `repositories/` — data access abstraction (`stock.repository.ts`, `user.repository.ts`)
    - `services/` — business logic services (`stock.service.ts`, `user.service.ts`, `auth.service.ts`)
  - `features/` — feature modules (e.g., `auth` for login/register)
  - `model/` — TypeScript models (`stock.model.ts`, `user.model.ts`, `exchange.model.ts`)
  - `stock/` — components for stock management (create, details, item)
  - `shared/` — shared components (e.g., `stock-list`)
- `assets/` — static assets and `data.json` (sample data)
- `environments/` — environment configuration files

## Sample data & configuration

- `assets/data.json` contains sample stocks used for local testing.
- Environment configuration files are under `src/environments/` (`environment.ts`, `environment.development.ts`). Update these to point to real APIs or adjust feature flags.

## Development notes

- The project uses a repository pattern (see `core/repositories`) and HTTP interceptors (see `core/interceptors`) to centralize API logic.
- `core/guards` contains route guards for authentication protection.
- Add proper error handling, validation, and tests before using this project in production.

## Contributing

Contributions, issues, and feature requests are welcome. Please open an issue or submit a pull request.

## License

This project is provided as a demo. Add an appropriate license file if you plan to reuse or publish it.

---

If you want, I can also:

- add a more detailed setup section for production builds
- add example API stubs or mocked backend for local development
- translate this README into another language

Tell me which of these you'd like next.
