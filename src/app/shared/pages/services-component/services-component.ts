import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service';
import { ApiService, Product } from '../../services/api.service';

@Component({
  selector: 'app-services-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-component.html',
  styleUrls: ['./services-component.scss']
})
export class ServicesComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'todos';
  categories: string[] = ['todos'];
  loading = true;

  constructor(
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    this.apiService.getProducts().subscribe({
      next: (res) => {
        this.products = res.products;
        this.filterByCategory(this.selectedCategory);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.categories;
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;

    if (category === 'todos') {
      this.filteredProducts = this.products;
    } else {
      this.apiService.getProducts(category).subscribe({
        next: (res) => {
          this.filteredProducts = res.products;
        }
      });
    }
  }

  addToCart(product: Product): void {
    const cartItem: CartItem = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
      type: product.type
    };

    this.cartService.addToCart(cartItem);
    this.showAddToCartFeedback(product.id.toString());
  }

  private showAddToCartFeedback(productId: string): void {
    const button = document.querySelector(`[data-product-id="${productId}"]`) as HTMLElement;
    if (button) {
      button.textContent = '✓ Añadido';
      button.classList.add('added');

      setTimeout(() => {
        button.textContent = 'Añadir al Carrito';
        button.classList.remove('added');
      }, 2000);
    }
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, index) => index < Math.floor(rating) ? 1 : 0);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('es-CO');
  }
}
