import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorLogin: string = '';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  onSubmit() {
    this.errorLogin = '';
    this.authService.login(
      this.username,
      this.password,
      () => {
        this.dialogRef.close();
      },
      (msg) => {
        this.errorLogin = msg;
      }
    );
  }

  switchToRegister(event: Event): void {
    event.preventDefault();
    this.dialogRef.close('switch-to-register');
  }
}
