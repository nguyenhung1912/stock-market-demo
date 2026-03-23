import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface User {
    id?: string,
    username: string,
    password?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/users';

    constructor(private http : HttpClient){}

    register(user: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }
}