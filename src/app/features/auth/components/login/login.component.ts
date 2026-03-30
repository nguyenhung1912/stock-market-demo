import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { UserService } from "../../../../core/services/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
}) 
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private userService: UserService, 
    private router: Router, 
    private toastr: ToastrService
  ) {}

  onLogin() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        const user = users.find(u => u.username === this.username && u.password === this.password);
        if (user) {
          this.toastr.success('Login successful!');
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          this.router.navigate(['/stocks']); 
        } else {
          this.toastr.error('Invalid username or password!');
        }
      },
      error: () => this.toastr.error('Connection error! Check JSON Server.')
    });
  }
}