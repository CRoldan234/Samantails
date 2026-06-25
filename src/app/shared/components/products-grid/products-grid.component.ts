import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/api.service';
import { Category } from '../categories-section/categories-section.component';

@Component({
  selector: 'app-products-grid',
  imports: [CommonModule],
  template: `
    <div class="catalog-wrapper">
      <div class="catalog-header">
        <p class="catalog-paws">🐾</p>
        <h1 class="title">Productos y <span>Servicios</span></h1>
        <p class="summary">Descubre la mejor calidad para el cuidado de tus mascotas 🐶🐱</p>
      </div>

      <div class="categories-row">
        <div
          class="category-chip"
          *ngFor="let cat of categoryIcons"
          [class.active]="selectedCategory === cat.name"
          (click)="onFilter(cat.name)">
          <div class="chip-circle">
            <img [src]="cat.icon" [alt]="cat.name" />
          </div>
          <span class="chip-label">{{ cat.name === 'todos' ? 'Todo' : cat.name }}</span>
        </div>
      </div>

      <div class="results-bar">
        <span class="results-count">{{ filteredProducts.length }} resultado{{ filteredProducts.length !== 1 ? 's' : '' }}</span>
      </div>

      <div class="products-grid">
        <div *ngFor="let product of filteredProducts" class="product-card">
          <div class="product-image">
            <img [src]="product.image" [alt]="product.name" />
            <span class="product-type-badge" [class.service]="product.type === 'service'">
              {{ product.type === 'service' ? 'Servicio' : 'Producto' }}
            </span>
            <div class="product-rating">⭐ {{ product.rating }}</div>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <span class="category-tag">{{ product.category }}</span>
            <div class="product-price">{{ product.price | currency:'COP':'symbol':'1.0-0' }}</div>
            <button
              class="add-to-cart-btn"
              [attr.data-product-id]="product.id"
              (click)="onAddToCart(product)">
              🛒 Añadir al Carrito
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="filteredProducts.length === 0" class="no-results">
        <div class="no-results-icon">😿</div>
        <h3>No hay productos en esta categoria</h3>
        <p>Explora otras categorias o mira todas las opciones</p>
        <button class="view-all-btn" (click)="onFilter('todos')">🐾 Ver Todos</button>
      </div>
    </div>
  `,
  styles: [`
    .catalog-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .catalog-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .catalog-paws {
      font-size: 1.5rem;
      color: #E8A440;
      opacity: 0.25;
      margin: 0 0 4px;
    }

    .title {
      font-size: 2.2rem;
      font-weight: 800;
      color: #4E342E;
      margin: 0 0 4px;
      letter-spacing: -0.5px;

      span { color: #E8A440; }
    }

    .summary {
      font-size: 1rem;
      color: #A1887F;
      font-style: italic;
      margin: 0;
    }

    .categories-row {
      display: flex;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .category-chip {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      padding: 4px;
      transition: transform 0.25s ease;

      &:hover {
        transform: translateY(-3px);

        .chip-circle {
          border-color: #E8A440;
          box-shadow: 0 6px 18px rgba(232, 164, 64, 0.25);
        }
      }

      &.active .chip-circle {
        background: linear-gradient(135deg, #E8A440, #F4C46A);
        border-color: #E8A440;
        box-shadow: 0 6px 18px rgba(232, 164, 64, 0.35);

        img {
          filter: brightness(0) invert(1);
        }
      }

      &.active .chip-label {
        color: #E8A440;
        font-weight: 700;
      }
    }

    .chip-circle {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #F5E6D3;
      transition: all 0.3s ease;
      box-shadow: 0 3px 12px rgba(92, 64, 51, 0.06);

      img {
        width: 32px;
        height: 32px;
        object-fit: contain;
        border-radius: 6px;
        transition: filter 0.3s ease;
      }
    }

    .chip-label {
      font-size: 0.72rem;
      color: #8D6E63;
      font-weight: 600;
      transition: color 0.3s ease;
      white-space: nowrap;
    }

    .results-bar {
      text-align: center;
      margin-bottom: 28px;
    }

    .results-count {
      font-size: 0.82rem;
      color: #A1887F;
      font-weight: 600;
      background: #FFF5EC;
      padding: 5px 16px;
      border-radius: 20px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }

    .product-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(92, 64, 51, 0.08);
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid #FEF0E6;

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 40px rgba(92, 64, 51, 0.14);
        border-color: #E8A440;
      }
    }

    .product-image {
      position: relative;
      height: 190px;
      overflow: hidden;
      background: linear-gradient(180deg, #FFF8F0, #FFF5EC);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .product-image img {
      width: 65%;
      height: 65%;
      object-fit: contain;
      transition: transform 0.4s ease;
    }

    .product-card:hover .product-image img {
      transform: scale(1.1);
    }

    .product-type-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: linear-gradient(135deg, #66BB6A, #43A047);
      color: white;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(102, 187, 106, 0.3);
    }

    .product-type-badge.service {
      background: linear-gradient(135deg, #EF5350, #E53935);
      box-shadow: 0 2px 8px rgba(239, 83, 80, 0.3);
    }

    .product-rating {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255,255,255,0.95);
      padding: 4px 10px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 0.78rem;
      color: #E8A440;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .product-info {
      padding: 16px 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .product-name {
      font-size: 1.05rem;
      font-weight: 700;
      color: #3E2723;
      letter-spacing: -0.2px;
    }

    .product-description {
      color: #A1887F;
      line-height: 1.4;
      font-size: 0.82rem;
    }

    .category-tag {
      background: #FFF5EC;
      color: #8D6E63;
      padding: 3px 10px;
      border-radius: 15px;
      font-size: 0.72rem;
      font-weight: 600;
      align-self: flex-start;
    }

    .product-price {
      font-size: 1.3rem;
      font-weight: 800;
      color: #5C4033;
    }

    .add-to-cart-btn {
      width: 100%;
      background: linear-gradient(135deg, #5C4033, #8D6E63);
      color: white;
      border: none;
      padding: 12px;
      border-radius: 14px;
      cursor: pointer;
      font-weight: 700;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(92, 64, 51, 0.2);

      &:hover {
        background: linear-gradient(135deg, #E8A440, #F4C46A);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(232, 164, 64, 0.3);
      }
    }

    .add-to-cart-btn.added {
      background: linear-gradient(135deg, #43A047, #66BB6A) !important;
    }

    .no-results {
      text-align: center;
      padding: 60px 20px;
    }

    .no-results-icon { font-size: 4rem; margin-bottom: 12px; }
    .no-results h3 { color: #4E342E; margin: 0 0 6px; }
    .no-results p { color: #A1887F; margin: 0 0 16px; font-size: 0.9rem; }

    .view-all-btn {
      background: linear-gradient(135deg, #E8A440, #F4C46A);
      color: white;
      border: none;
      padding: 12px 26px;
      border-radius: 25px;
      cursor: pointer;
      font-weight: 700;
      box-shadow: 0 4px 15px rgba(232, 164, 64, 0.3);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(232, 164, 64, 0.4);
      }
    }

    @media (max-width: 768px) {
      .title { font-size: 1.7rem; }
      .categories-row { gap: 8px; }
      .chip-circle { width: 46px; height: 46px; }
      .chip-circle img { width: 26px; height: 26px; }
      .chip-label { font-size: 0.68rem; }
      .products-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ProductsGridComponent {
  @Input() products: Product[] = [];
  @Input() categories: string[] = [];
  @Input() selectedCategory: string = 'todos';
  @Input() filteredProducts: Product[] = [];
  @Input() categoryIcons: Category[] = [];

  @Output() filterChange = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<Product>();

  onFilter(category: string): void {
    this.filterChange.emit(category);
  }

  onAddToCart(product: Product): void {
    this.addToCart.emit(product);
  }
}
