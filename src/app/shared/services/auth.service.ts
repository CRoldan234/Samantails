import { Injectable, signal } from '@angular/core';

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

  login(userName: string): void {
    this._isLoggedIn.set(true);
    this._userFullName.set(userName);
    this._profileImage.set('assets/img/men.png');
  }

  logout(): void {
    this._isLoggedIn.set(false);
    this._userFullName.set('');
    this._profileImage.set('assets/img/user.png');
  }
}
