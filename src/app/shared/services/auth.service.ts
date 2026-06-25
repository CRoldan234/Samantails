import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = signal(false);
  private _userFullName = signal<string>('');
  private _profileImage = signal<string>('assets/img/user.png');

  isLoggedIn = this._isLoggedIn.asReadonly();
  userFullName = this._userFullName.asReadonly();
  profileImage = this._profileImage.asReadonly();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this._isLoggedIn.set(true);
      this._userFullName.set(localStorage.getItem('username') || '');
    }
  }

  login(username: string, password: string, onSuccess: () => void, onError: (msg: string) => void): void {
    this.apiService.login(username, password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.user.username);
        this._isLoggedIn.set(true);
        this._userFullName.set(res.user.username);
        this._profileImage.set('assets/img/men.png');
        onSuccess();
      },
      error: () => {
        onError('Usuario o contraseña incorrectos');
      }
    });
  }

  register(username: string, email: string, password: string, onSuccess: () => void, onError: (msg: string) => void): void {
    this.apiService.register(username, email, password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.user.username);
        this._isLoggedIn.set(true);
        this._userFullName.set(res.user.username);
        this._profileImage.set('assets/img/men.png');
        onSuccess();
      },
      error: (err) => {
        onError(err.error?.error || 'Error al registrar');
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this._isLoggedIn.set(false);
    this._userFullName.set('');
    this._profileImage.set('assets/img/user.png');
    this.router.navigate(['/home']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
