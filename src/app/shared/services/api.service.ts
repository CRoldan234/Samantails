import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  message: string;
  token: string;
  user: { id: number; username: string; email: string };
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  type: 'product' | 'service';
  stock: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(tap(res => localStorage.setItem('token', res.token)));
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, { username, email, password })
      .pipe(tap(res => localStorage.setItem('token', res.token)));
  }

  getProfile(): Observable<{ user: any }> {
    return this.http.get<{ user: any }>(`${this.baseUrl}/auth/me`, {
      headers: this.getAuthHeaders()
    });
  }

  getProducts(category?: string): Observable<{ products: Product[] }> {
    const params = category && category !== 'todos' ? `?category=${category}` : '';
    return this.http.get<{ products: Product[] }>(`${this.baseUrl}/products${params}`);
  }

  getCategories(): Observable<{ categories: string[] }> {
    return this.http.get<{ categories: string[] }>(`${this.baseUrl}/products/categories`);
  }

  getProduct(id: number): Observable<{ product: Product }> {
    return this.http.get<{ product: Product }>(`${this.baseUrl}/products/${id}`);
  }

  createOrder(items: OrderItem[]): Observable<{ message: string; order: { orderId: number; total: number } }> {
    return this.http.post<{ message: string; order: { orderId: number; total: number } }>(
      `${this.baseUrl}/orders`,
      { items },
      { headers: this.getAuthHeaders() }
    );
  }

  getOrders(): Observable<{ orders: any[] }> {
    return this.http.get<{ orders: any[] }>(`${this.baseUrl}/orders`, {
      headers: this.getAuthHeaders()
    });
  }
}
