import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../../model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInUserKey = 'loggedInUser';

  constructor(private userRepo: UserRepository) {}

  login(username: string, password: string): Observable<User[]> {
    return this.userRepo.login(username, password).pipe(
      tap((users) => {
        if (users.length > 0) {
          localStorage.setItem(this.loggedInUserKey, JSON.stringify(users[0]));
        }
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.loggedInUserKey);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.loggedInUserKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
