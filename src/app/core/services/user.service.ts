import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../../model/user.model";
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private userRepo: UserRepository){}

    register(user: User): Observable<User> {
        return this.userRepo.create(user);
    }

    getUsers(): Observable<User[]> {
        return this.userRepo.findAll();
    }
}