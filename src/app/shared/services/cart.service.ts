import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  type: 'product' | 'service';
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(item: CartItem): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      currentItems.push({ ...item, quantity: item.quantity });
    }
    
    this.cartItems.next([...currentItems]);
    this.saveCartToStorage();
  }

  removeFromCart(itemId: string): void {
    const currentItems = this.cartItems.value.filter(item => item.id !== itemId);
    this.cartItems.next(currentItems);
    this.saveCartToStorage();
  }

  updateQuantity(itemId: string, quantity: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(cartItem => cartItem.id === itemId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        item.quantity = quantity;
        this.cartItems.next([...currentItems]);
        this.saveCartToStorage();
      }
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.saveCartToStorage();
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  get items(): CartItem[] {
    return this.cartItems.value;
  }

  private saveCartToStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));
    }
  }
  private loadCartFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        this.cartItems.next(JSON.parse(storedCart));
      }
    }
  }
}