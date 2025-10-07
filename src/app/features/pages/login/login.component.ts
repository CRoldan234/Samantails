import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../shared/services/api.service';
import { AuthService } from '../../../shared/services/auth.service';

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
    private apiService: ApiService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {

  }

  // Simulación de login
  onSubmit() {
    this.apiService.login(this.username, this.password).subscribe((users) => {
      if (users.length > 0) {
        const user = users[0];
        this.authService.login(user.usuario);
        alert('✅ Login exitoso!');
        this.errorLogin = '';
        this.dialogRef.close();
      } else {
        this.errorLogin = '❌ Usuario o contraseña incorrectos';
      }
    });
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
