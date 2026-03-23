import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService, User } from '../../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username = "";
  password = "";
  confirmPassword = "";

  constructor(
    private userService: UserService, 
    private router: Router, 
    private toastr: ToastrService
  ) {}

  onRegister() {
    if (!this.username || !this.password) {
      this.toastr.warning('Please fill in all fields!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match!');
      return;
    }

    const newUser: User = {
      username: this.username,
      password: this.password
    };

    this.userService.register(newUser).subscribe({
      next: () => {
        this.toastr.success('Registration successful! Please login');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.toastr.error('Registration failed! Please try again');
      }
    });
  }
}