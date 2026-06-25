import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service';
import { ApiService, Product } from '../../services/api.service';
import { NewsCarouselDynamicComponent } from '../home-component/news-carousel-dynamic/news-carousel-dynamic.component';
import { Category } from '../../components/categories-section/categories-section.component';
import { BrandsSectionComponent, Brand } from '../../components/brands-section/brands-section.component';
import { ProductsGridComponent } from '../../components/products-grid/products-grid.component';
import { FooterComponent } from '../../components/footer/footer.component';

const CATEGORY_ICONS: Record<string, string> = {
  'todos': 'assets/img/home.png',
  'Alimentos': 'assets/img/alimentos.png',
  'Accesorios': 'assets/img/accesorios.png',
  'Juguetes': 'assets/img/snacks.png',
  'Servicios': 'assets/img/services.png',
  'Cuidado e Higiene': 'assets/img/cuidado.png',
  'Confort': 'assets/img/cama.png',
};

@Component({
  selector: 'app-services-component',
  imports: [
    CommonModule,
    NewsCarouselDynamicComponent,
    BrandsSectionComponent,
    ProductsGridComponent,
    FooterComponent
  ],
  templateUrl: './services-component.html',
  styleUrls: ['./services-component.scss']
})
export class ServicesComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'todos';
  categories: string[] = ['todos'];
  categoryIconList: Category[] = [];

  brandList: Brand[] = [
    { name: 'NutriPet', logo: 'assets/img/marca1.png' },
    { name: 'VetCare', logo: 'assets/img/marca2.png' },
    { name: 'PetComfort', logo: 'assets/img/marca3.png' },
    { name: 'DogTrain', logo: 'assets/img/marca4.png' },
    { name: 'CatClean', logo: 'assets/img/marca5.png' },
    { name: 'PetSpa', logo: 'assets/img/marca6.png' }
  ];

  constructor(
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (res) => {
        this.products = res.products;
        this.filterByCategory(this.selectedCategory);
      }
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.categories;
        this.categoryIconList = res.categories.map(name => ({
          name,
          icon: CATEGORY_ICONS[name] || 'assets/img/home.png'
        }));
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
        button.textContent = '🛒 Añadir al Carrito';
        button.classList.remove('added');
      }, 2000);
    }
  }
}
