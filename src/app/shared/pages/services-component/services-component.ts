import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service';


interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  type: 'product' | 'service';
}

@Component({
  selector: 'app-services-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-component.html',
  styleUrls: ['./services-component.scss']
})
export class ServicesComponent implements OnInit {
  
  // Datos de ejemplo para productos y servicios
  products: Product[] = [
    {
      id: '1',
      name: 'Alimento Premium para Perros',
      price: 45900,
      image: 'assets/img/alimento1.png',
      category: 'Alimentos',
      description: 'Alimento balanceado con proteína de alta calidad para todas las razas',
      rating: 4.8,
      type: 'product'
    },
    {
      id: '2',
      name: 'Arenero Sanitario para Gatos',
      price: 89900,
      image: 'assets/img/arenero.png',
      category: 'Accesorios',
      description: 'Arenero automático con filtro de carbón activado para Gatos',
      rating: 4.5,
      type: 'product'
    },
    {
      id: '3',
      name: 'Consulta Veterinaria General',
      price: 35000,
      image: 'assets/img/antipulgas.png',
      category: 'Servicios',
      description: 'Consulta completa con examen físico y diagnóstico',
      rating: 4.9,
      type: 'service'
    },
    {
      id: '4',
      name: 'Peluquería Canina Completa',
      price: 40000,
      image: 'assets/img/transporte.png',
      category: 'Servicios',
      description: 'Baño, corte de pelo, uñas y limpieza dental, para tu adorable mascota',
      rating: 4.7,
      type: 'service'
    },
    {
      id: '5',
      name: 'Juguete Interactivo para Aves',
      price: 23500,
      image: 'assets/img/ave.png',
      category: 'Juguetes',
      description: 'Juguete de madera natural para loros y guacamayos',
      rating: 4.6,
      type: 'product'
    },
    {
      id: '6',
      name: 'Guardería para Mascotas',
      price: 15000,
      image: 'assets/img/cama.png',
      category: 'Servicios',
      description: 'Cuidado diurno con actividades recreativas, juegos y alimento',
      rating: 4.8,
      type: 'service'
    }
  ];

  filteredProducts: Product[] = [];
  selectedCategory: string = 'todos';
  categories: string[] = ['todos', 'Alimentos', 'Accesorios', 'Juguetes', 'Servicios'];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.filteredProducts = this.products;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    
    if (category === 'todos') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => 
        product.category === category
      );
    }
  }

  addToCart(product: Product): void {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
      type: product.type
    };

    this.cartService.addToCart(cartItem);
    
    // Efecto visual de confirmación
    this.showAddToCartFeedback(product.id);
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
}