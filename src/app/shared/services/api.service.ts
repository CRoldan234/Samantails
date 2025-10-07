import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(usuario: string, password: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuarios?usuario=${usuario}&password=${password}`);
  }

  registerUser(usuarioData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios`, usuarioData);
  }
}
