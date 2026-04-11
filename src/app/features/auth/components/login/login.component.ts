import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const cleanUsername = username.trim();
      const cleanPassword = password.trim();

      this.authService.login(cleanUsername, cleanPassword).subscribe({
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
    } else {
      this.loginForm.markAllAsTouched(); 
    }
  }
}
