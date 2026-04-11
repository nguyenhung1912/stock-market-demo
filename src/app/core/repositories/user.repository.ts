import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class UserRepository {
  private url = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  login(username: string, password: string): Observable<User[]> {
    return this.findAll();
  }
}
