import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Category {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-categories-section',
  imports: [CommonModule],
  template: `
    <section class="categories-section">
      <div class="categories-paws">🐾</div>
      <h2 class="categories-title">Categorías <span>Destacadas</span></h2>
      <p class="categories-subtitle">Todo lo que tu mascota necesita</p>

      <div class="categories-container">
        <div
          class="category-circle"
          *ngFor="let category of categories; let i = index"
          [style.animation-delay]="i * 0.1 + 's'">
          <div class="circle-icon">
            <img [src]="category.icon" [alt]="category.name" />
            <div class="circle-shine"></div>
          </div>
          <span class="category-name">{{ category.name }}</span>
        </div>
      </div>

      <div class="categories-paws bottom">🐾 🐾 🐾</div>
    </section>
  `,
  styles: [`
    .categories-section {
      text-align: center;
      padding: 60px 20px 50px;
      background: linear-gradient(180deg, #FFF5EC 0%, white 40%, #FFF8F0 100%);
      position: relative;
      overflow: hidden;
    }

    .categories-paws {
      font-size: 2rem;
      color: #E8A440;
      opacity: 0.25;
      letter-spacing: 16px;
      margin-bottom: 8px;

      &.bottom {
        margin-top: 40px;
        margin-bottom: 0;
        font-size: 1.6rem;
      }
    }

    .categories-title {
      font-size: 2.3rem;
      font-weight: 800;
      color: #4E342E;
      margin: 0 0 8px;
      letter-spacing: -0.5px;

      span {
        color: #E8A440;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 8px;
          background: rgba(232, 164, 64, 0.25);
          border-radius: 4px;
          z-index: -1;
        }
      }
    }

    .categories-subtitle {
      font-size: 1.05rem;
      color: #A1887F;
      margin: 0 0 40px;
      font-style: italic;
    }

    .categories-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 36px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .category-circle {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      animation: fadeInUp 0.5s ease both;
      cursor: pointer;
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

    .circle-icon {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 30px rgba(92, 64, 51, 0.1), 0 2px 8px rgba(232, 164, 64, 0.08);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      border: 3px solid #F5E6D3;
      overflow: hidden;

      &:hover {
        transform: translateY(-8px) scale(1.05);
        box-shadow: 0 16px 40px rgba(92, 64, 51, 0.15), 0 4px 16px rgba(232, 164, 64, 0.2);
        border-color: #E8A440;

        .circle-shine {
          opacity: 1;
        }

        img {
          transform: scale(1.12);
        }

        & + .category-name {
          color: #E8A440;
        }
      }
    }

    .circle-shine {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle at 30% 30%, rgba(232, 164, 64, 0.15), transparent 60%);
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }

    .circle-icon img {
      width: 80px;
      height: 80px;
      border-radius: 20px;
      object-fit: contain;
      transition: transform 0.4s ease;
      position: relative;
      z-index: 1;
    }

    .category-name {
      font-weight: 700;
      color: #6D4C41;
      font-size: 1.05rem;
      transition: color 0.3s ease;
      letter-spacing: -0.2px;
    }

    @media (max-width: 768px) {
      .categories-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }

      .categories-title {
        font-size: 1.8rem;
      }

      .circle-icon {
        width: 110px;
        height: 110px;

        img {
          width: 65px;
          height: 65px;
        }
      }
    }
  `]
})
export class CategoriesSectionComponent {
  @Input() categories: Category[] = [];
}
