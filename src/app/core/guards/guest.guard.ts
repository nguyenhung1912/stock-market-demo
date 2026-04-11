import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // nếu đã đăng nhập, navigate về page stocks
  if (authService.isLoggedIn()) {
    router.navigate(['/stocks']);
    return false;
  }
  
  // nếu chưa đăng nhập, cho phép truy cập trang Login/Register
  return true;
};