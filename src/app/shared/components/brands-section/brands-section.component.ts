import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Brand {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-brands-section',
  imports: [CommonModule],
  template: `
    <section class="brands-section">
      <div class="brands-paws">🐾</div>
      <h2 class="brands-title">Marcas <span>Destacadas</span></h2>
      <p class="brands-subtitle">Trabajamos con las mejores marcas del mercado</p>

      <div class="brands-container">
        <div
          class="brand-square"
          *ngFor="let brand of brands; let i = index"
          [style.animation-delay]="i * 0.08 + 's'">
          <div class="brand-logo-wrapper">
            <img [src]="brand.logo" [alt]="brand.name" />
            <div class="brand-shine"></div>
          </div>
          <span class="brand-name">{{ brand.name }}</span>
          <div class="brand-stars">★★★★★</div>
        </div>
      </div>

      <div class="brands-paws bottom">🐾 🐾 🐾</div>
    </section>
  `,
  styles: [`
    .brands-section {
      text-align: center;
      padding: 60px 20px;
      background: linear-gradient(180deg, #FFF8F0 0%, #FFF5EC 50%, #FEF0E6 100%);
      position: relative;
      overflow: hidden;
    }

    .brands-paws {
      font-size: 1.8rem;
      color: #E8A440;
      opacity: 0.2;
      letter-spacing: 14px;
      margin-bottom: 8px;

      &.bottom {
        margin-top: 36px;
        margin-bottom: 0;
        font-size: 1.4rem;
      }
    }

    .brands-title {
      font-size: 2.3rem;
      font-weight: 800;
      color: #4E342E;
      margin: 0 0 6px;
      letter-spacing: -0.5px;

      span {
        color: #E8A440;
      }
    }

    .brands-subtitle {
      font-size: 1rem;
      color: #A1887F;
      margin: 0 0 40px;
      font-style: italic;
    }

    .brands-container {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 22px;
      max-width: 1100px;
      margin: 0 auto;
    }

    .brand-square {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 24px 16px;
      background: white;
      border-radius: 18px;
      box-shadow: 0 6px 25px rgba(92, 64, 51, 0.06);
      border: 2px solid #FEF0E6;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      animation: fadeInUp 0.5s ease both;
      cursor: pointer;

      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 14px 35px rgba(92, 64, 51, 0.12);
        border-color: #E8A440;

        .brand-shine {
          opacity: 1;
        }

        .brand-stars {
          color: #E8A440;
        }
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .brand-logo-wrapper {
      width: 90px;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #FFFBF5, #FFF5EC);
      border-radius: 50%;
      padding: 16px;
      position: relative;
      overflow: hidden;
    }

    .brand-shine {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 30% 30%, rgba(232, 164, 64, 0.1), transparent 60%);
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .brand-logo-wrapper img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 8px;
      position: relative;
      z-index: 1;
    }

    .brand-name {
      font-size: 0.92rem;
      font-weight: 700;
      color: #5D4037;
    }

    .brand-stars {
      font-size: 0.7rem;
      color: #D7CCC8;
      letter-spacing: 2px;
      transition: color 0.3s ease;
    }

    @media (max-width: 1024px) {
      .brands-container {
        grid-template-columns: repeat(3, 1fr);
        gap: 18px;
      }
    }

    @media (max-width: 600px) {
      .brands-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
      }

      .brands-title {
        font-size: 1.8rem;
      }
    }
  `]
})
export class BrandsSectionComponent {
  @Input() brands: Brand[] = [];
}
