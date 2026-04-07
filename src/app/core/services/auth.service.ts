import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../../model/user.model';
import { UserStoreService } from './user-store.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private userStore: UserStoreService,
  ) {}

  login(username: string, password: string): Observable<User[]> {
    return this.userRepo.login(username, password).pipe(
      tap((users) => {
        if (users.length > 0) {
          const user = users[0];
          const mockToken = `fake-jwt-token-for-${user.username}`;

          this.userStore.setToken(mockToken);

          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      }),
    );
  }

  logout(): void {
    this.userStore.removeToken();
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.userStore.isLoggedIn();
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
}
