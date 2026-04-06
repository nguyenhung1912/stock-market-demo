import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth.service';

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
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (users) => {
        if (users.length > 0) {
          this.toastr.success('Login successful!');
          this.router.navigate(['/stocks']);
        } else {
          this.toastr.error('Invalid username or password!');
        }
      },
      error: () => this.toastr.error('Connection error! Check JSON Server.'),
    });
  }
}
