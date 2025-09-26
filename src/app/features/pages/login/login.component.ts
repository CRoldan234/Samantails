import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorLogin: string = '';
  enableUsersLogin: boolean = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {

  }

  // Simulación de login
  onSubmit() {
    if (this.username === 'admin' && this.password === '1234') {
      alert('✅ Login exitoso!');
      this.errorLogin = '';
    } else {
      this.errorLogin = '❌ Usuario o contraseña incorrectos';
    }
  }

  // Para botones sociales
  authMethods = () => [
    { id: 'google', img_url: 'assets/img/google.png' },
    { id: 'facebook', img_url: 'assets/img/facebook.png' }
  ];

  onLoginProvider(auth: any) {
    alert(`🔑 Login con ${auth.id}`);
  }

  switchToRegister(event: Event): void {
    event.preventDefault();
    this.dialogRef.close('switch-to-register');
  } 
}
