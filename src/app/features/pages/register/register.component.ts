import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';









@Component({
  selector: 'app-register',
  standalone: true,
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
  verificationCode = new FormControl('', [Validators.required]);
  needConfirmation = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  createUser(): void {
    if (this.userForm.valid) {
      console.log('Register data:', this.userForm.value);
      this.needConfirmation = true;
      // Aquí va tu lógica de registro
    }
  }

  confirmCreatedUser(): void {
    if (this.verificationCode.valid) {
      console.log('Verification code:', this.verificationCode.value);
      // Lógica de verificación
      this.dialogRef.close(); // Cerrar modal después de registro exitoso
    }
  }

  switchToLogin(event: Event): void {
    event.preventDefault();
    this.dialogRef.close('switch-to-login');
  }

  signInWithGoogle(): void {
    console.log('Google sign in');
    // Lógica de Google Sign In
  }
}