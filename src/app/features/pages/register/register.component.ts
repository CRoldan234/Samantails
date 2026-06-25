import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-register',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userForm: FormGroup;
  errorMessage = '';
  needConfirmation = false;
  registerSuccess = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  createUser(): void {
    if (!this.userForm.valid) return;

    this.errorMessage = '';
    this.authService.register(
      this.userForm.value.username,
      this.userForm.value.email,
      this.userForm.value.password,
      () => {
        this.dialogRef.close('login-success');
      },
      (msg) => {
        this.errorMessage = msg;
      }
    );
  }

  switchToLogin(event: Event): void {
    event.preventDefault();
    this.dialogRef.close('switch-to-login');
  }

  signInWithGoogle(): void {
    alert('Iniciar sesión con Google');
  }
}
