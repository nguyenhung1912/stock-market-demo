
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

```bash
npm install
```

2. Chạy ứng dụng ở môi trường phát triển:

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
