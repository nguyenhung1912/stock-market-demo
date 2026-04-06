import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable ({providedIn: 'root'})
export class UserStoreService {
    private tokenKey = 'authToken';

    private tokenSubject = new BehaviorSubject<string | null>(this.getTokenFromStorage());

    token$ = this.tokenSubject.asObservable();

    constructor(){}

    setToken(token: string){
        localStorage.setItem(this.tokenKey, token);
        this.tokenSubject.next(token);
    }

    getToken(): string | null {
        return this.tokenSubject.value;
    }

    removeToken() {
        localStorage.removeItem(this.tokenKey);
        this.tokenSubject.next(null);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    private getTokenFromStorage(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
}