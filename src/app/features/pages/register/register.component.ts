import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../shared/services/api.service';









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
  registerSuccess = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
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
      const newUser = {
        usuario: this.userForm.value.username,
        email: this.userForm.value.email,
        password: this.userForm.value.password
      };

      // 🔹 Verificamos si el correo ya existe
      this.apiService.login(newUser.usuario, newUser.password).subscribe(existingUsers => {
        if (existingUsers.length > 0) {
          this.errorMessage = '⚠️ Este usuario ya está registrado.';
        } else {
          this.apiService.registerUser(newUser).subscribe({
            next: () => {
              this.registerSuccess = true;
              alert('✅ Registro exitoso. Ya puedes iniciar sesión.');
              this.dialogRef.close('switch-to-login'); // opcional, abre login automáticamente
            },
            error: (err) => {
              console.error('Error al registrar usuario:', err);
              this.errorMessage = '❌ Error al registrar el usuario.';
            }
          });
        }
      });
    }
  }

  switchToLogin(event: Event): void {
    event.preventDefault();
    this.dialogRef.close('switch-to-login');
  }

  signInWithGoogle(): void {
    alert('🔑 Login con Google');
  }
}