
# Stock Market — Angular Demo

A sample stock management application written in Angular.

## Description

This project is a small example of managing a list of stocks, which includes: creating a stock, viewing stock details, and displaying a list of stocks. The goal is to illustrate an Angular architecture with clear features, services, repositories, and data models.

## Requirements

- Node.js >= 14
- npm (or yarn)
- Angular CLI (optional, for running development commands)

## Installation & Running

1. Install dependencies:

```bash
npm install
```

2. Run the application in the development environment:

```bash
npm start
```

By default, the application will run at http://localhost:4200 (assuming the package.json configuration uses Angular's default port).

## Main Project Structure

- `src/app/` — application source code
	- `core/` — core repositories and services
		- `repositories/` — `stock.repository.ts`, `user.repository.ts`
		- `services/` — `stock.service.ts`, `user.service.ts`
	- `features/` — feature modules such as auth (login, register)
	- `model/` — data models (stock.ts, user.model.ts, exchange.model.ts, ...)
	- `stock/` — components related to stock management (create, detail, item, ...)
	- `shared/` — shared components (e.g., stock-list)

## Features

- View a list of stocks
- Create a stock (includes examples of both template-driven and reactive forms)
- View stock details
- Login/Register (sample implementation in features/auth)

## Sample Data

There is an assets/data.json file used as mock data. You can modify it for testing purposes.

## Environments

- src/environments/environment.ts and src/environments/environment.development.ts are used for configuring APIs or development flags.
  
## Notes

- This is a demo project; error handling, security measures, and unit/e2e tests need to be added for real-world or production usage.

## Contact

If you need help or want to extend the project, feel free to open an issue or submit a Pull Request (PR).
