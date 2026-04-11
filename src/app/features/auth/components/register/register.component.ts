import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../model/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator }); 
  }

  // Custom Validator kiểm tra 2 mật khẩu
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    // Nếu có nhập confirm mà không khớp thì set lỗi
    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      const cleanUsername = formValues.username.trim();
      const cleanPassword = formValues.password.trim();

      this.userService.getUsers().subscribe({
        next: (users) => {
          const isExist = users.find(u => u.username.toLowerCase() === cleanUsername.toLowerCase());

          if (isExist) {
            this.toastr.error('Username already exists!');
            return;
          }

          const newUser: User = { username: cleanUsername, password: cleanPassword };
          this.userService.register(newUser).subscribe({
            next: () => {
              this.toastr.success('Registration successful! Please login');
              this.router.navigate(['/login']);
            },
            error: () => this.toastr.error('Registration failed! Please try again')
          });
        },
        error: () => this.toastr.error('Cannot connect to server to verify username!')
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}