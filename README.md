# Stock Market — Angular Demo

Ứng dụng mẫu quản lý cổ phiếu viết bằng Angular.

## Mô tả

Project này là một ví dụ nhỏ cho việc quản lý danh sách cổ phiếu, bao gồm: tạo cổ phiếu, xem chi tiết, và danh sách cổ phiếu. Mục tiêu là minh họa kiến trúc Angular với các feature, service, repository và mô hình dữ liệu rõ ràng.

## Yêu cầu

- Node.js >= 14
- npm (hoặc yarn)
- Angular CLI (tùy chọn để chạy lệnh phát triển)

## Cài đặt & chạy

1. Cài đặt phụ thuộc:
=======

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

2. Chạy ứng dụng ở môi trường phát triển:
=======
2. Run the application in the development environment:

```bash
npm start
```

Ứng dụng mặc định sẽ chạy tại `http://localhost:4200` (nếu cấu hình `package.json` dùng port mặc định của Angular).

## Cấu trúc dự án (chính)

- `src/app/` — mã nguồn ứng dụng
  - `core/` — repositories và services cốt lõi
    - `repositories/` — `stock.repository.ts`, `user.repository.ts`
    - `services/` — `stock.service.ts`, `user.service.ts`
  - `features/` — các feature module như `auth` (login, register)
  - `model/` — các model dữ liệu (`stock.ts`, `user.model.ts`, `exchange.model.ts`, ...)
  - `stock/` — component liên quan đến quản lý cổ phiếu (tạo, chi tiết, item, ...)
  - `shared/` — thành phần dùng chung (ví dụ `stock-list`)

## Tính năng

- Xem danh sách cổ phiếu
- Tạo cổ phiếu (template-driven và reactive forms có ví dụ)
- Xem chi tiết cổ phiếu
- Đăng nhập/Đăng ký (mẫu trong `features/auth`)

## Dữ liệu mẫu

Có một file `assets/data.json` dùng làm dữ liệu mẫu. Bạn có thể thay đổi để thử nghiệm.

## Môi trường

- `src/environments/environment.ts` và `src/environments/environment.development.ts` để cấu hình API hoặc flag phát triển.

## Ghi chú

- Đây là một project demo; cần bổ sung xử lý lỗi, bảo mật, và kiểm thử nếu dùng thực tế.

## Liên hệ

Nếu cần trợ giúp hoặc muốn mở rộng, hãy mở issue hoặc gửi PR.
=======
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
