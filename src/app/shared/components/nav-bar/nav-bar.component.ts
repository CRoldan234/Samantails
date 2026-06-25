import { Component, computed, ElementRef, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service';
import { RegisterComponent } from '../../../features/pages/register/register.component';
import { LoginComponent } from '../../../features/pages/login/login.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnDestroy {
  userFullName = computed(() => this.authService.userFullName());
  profileImage = computed(() => this.authService.profileImage());
  isLoggedIn = computed(() => this.authService.isLoggedIn());
  isUserMenuOpen = signal(false);
  isCartOpen = false;
  cartItemsCount = 0;
  cartSubscription!: Subscription;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private eRef: ElementRef,
    public router: Router,
    private dialog: MatDialog,
    private cartService: CartService
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.checkCurrentRoute();
      });
  }

  ngOnInit() {
    this.cartSubscription = this.cartService.cartItems$.subscribe(() => {
      this.cartItemsCount = this.cartService.getCartCount();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  openRegisterModal(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
      maxWidth: '90vw',
      panelClass: 'auth-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'switch-to-login') {
        this.openLoginModal();
      }
    });
  }

  openLoginModal(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      maxWidth: '90vw',
      panelClass: 'auth-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'switch-to-register') {
        this.openRegisterModal();
      }
    });
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCart(): void {
    this.isCartOpen = false;
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  removeFromCart(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity - 1);
  }

  get cartItems(): CartItem[] {
    return this.cartService.items;
  }

  getCartItems(): CartItem[] {
    return this.cartService.items;
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  proceedToCheckout(): void {
    this.closeCart();
    this.router.navigate(['/checkout']);
  }

  isActive(route: string): boolean {
    const current = this.router.url;

    if (route === '/home') {
      return current === '/' || current.includes('/home');
    }
    if (route === '/services') {
      return current.includes('/services');
    }
    if (route === '/about-us') {
      return current.includes('/about-us');
    }
    return current.includes(route);
  }

  logout(): void {
    this.authService.logout();
    this.isUserMenuOpen.set(false);
  }

  toggleUserMenu() {
    this.isUserMenuOpen.update(open => !open);
  }

  closeUserMenu() {
    this.isUserMenuOpen.set(false);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToSe() {
    this.router.navigate(['/services']);
  }

  navigateToAb() {
    this.router.navigate(['/about-us']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (!this.eRef.nativeElement.contains(targetElement)) {
      this.isUserMenuOpen.set(false);
    }
  }

  private checkCurrentRoute() {}
}
