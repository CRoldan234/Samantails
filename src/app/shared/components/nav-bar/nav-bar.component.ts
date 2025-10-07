import { Component, computed, effect, ElementRef, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service';
import { RegisterComponent } from '../../../features/pages/register/register.component';
import { LoginComponent } from '../../../features/pages/login/login.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [    
    MatIconModule, CommonModule    
    ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnDestroy {
  imgSrc: string = "assets/img/Alex.png";
  boardImgSrc: string = "assets/img/Board.png";
  isBoardModalVisible: boolean = false;
  userFullName = computed(() => this.authService.userFullName());
  profileImage = computed(() => this.authService.profileImage());
  private defaultImage = "assets/img/Men.jpg";
  private destroy$ = new Subject<void>();
  isUserMenuOpen = signal(false);
  imageTimestamp = signal<number>(Date.now());
  isLoggedIn = computed(() => this.authService.isLoggedIn());

  isCartOpen = false;
  cartItems: any[] = [];
  cartItemsCount = 0;
  cartSubscription!: Subscription;

  constructor(private authService: AuthService, 
    private eRef: ElementRef, 
    public router: Router, 
    private dialog: MatDialog, 
    private cartService: CartService

) {
    effect(() => {

    });



    this.checkCurrentRoute();
    
   
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
    this.checkCurrentRoute();

    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItemsCount = this.cartService.getCartCount();
    });
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkCurrentRoute();
      });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  openRegisterModal(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
      maxWidth: '90vw',
      panelClass: 'auth-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'switch-to-login') {
        this.openLoginModal(); // Cambiar a login
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
      } else if (result === 'login-success') {

      }
    });
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  openCart(): void {
    this.isCartOpen = true;
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

  increaseQuantity(item: any): void {
    item.quantity += 1;
    this.saveCartToStorage();
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity - 1);
  }

  getCartItems(): any[] {
    return this.cartService.items;
  }


  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  private updateCartCount(): void {
    this.cartItemsCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  proceedToCheckout(): void {
    this.closeCart();
    this.router.navigate(['/checkout']);
  }

    private saveCartToStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  private loadCartFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
        this.updateCartCount();
      }
    }
  }


  private checkCurrentRoute() {
    const currentRoute = this.router.url;
    
    if (currentRoute.includes('/home')) {
      this.changeBoardImage(true);
      this.changeImage(false);
    } else if (currentRoute.includes('/services')) {
      this.changeImage(true);
      this.changeBoardImage(false);
    }
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
    this.router.navigate(['/home']);
  }

 
  toggleUserMenu() {
    this.isUserMenuOpen.update(open => !open);
  }

 
  closeUserMenu() {
    this.isUserMenuOpen.set(false);
  }

 
  changeImage(hover: boolean) {
    this.imgSrc = hover ? "assets/img/AlexActive.png" : "assets/img/Alex.png";
  }

 
  changeBoardImage(hover: boolean) {
    this.boardImgSrc = hover ? "assets/img/BoardActive.png" : "assets/img/Board.png";
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

 
  toggleBoardModal(event: MouseEvent) {
    event.stopPropagation();
    this.isBoardModalVisible = !this.isBoardModalVisible;
  }

 
  closeBoardModal() {
    this.isBoardModalVisible = false;
  }

 
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;

   
    if (!this.eRef.nativeElement.contains(targetElement)) {
      this.closeBoardModal();
    }
  }
}
