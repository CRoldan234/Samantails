import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-paws">🐾 🐾 🐾 🐾 🐾 🐾 🐾 🐾 🐾 🐾 🐾 🐾 🐾 🐾 🐾 🐾</div>
      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-brand">
            <img src="assets/img/Samantha.png" alt="SamanTails" class="footer-logo" />
            <p class="footer-tagline">Cuidamos a tus mascotas como familia 🐶🐱</p>
            <div class="footer-contact">
              <p><strong>Tel:</strong> 300 910 1234</p>
              <p><strong>Bogota D.C., Colombia</strong></p>
            </div>
          </div>

          <div class="footer-columns">
            <div class="footer-col">
              <h4>SamanTails</h4>
              <a href="#">Sobre nosotros</a>
              <a href="#">Servicios</a>
              <a href="#">Blog</a>
              <a href="#">Terminos</a>
            </div>
            <div class="footer-col">
              <h4>Ayuda</h4>
              <a href="#">Preguntas frecuentes</a>
              <a href="#">Politica de privacidad</a>
              <a href="#">Devoluciones</a>
            </div>
            <div class="footer-col">
              <h4>Tiendas</h4>
              <p><strong>Medellin</strong><br/>KM 2.5 via Las Palmas</p>
              <p><strong>Soacha</strong><br/>Cra 145 #22-91</p>
            </div>
            <div class="footer-col">
              <h4>Horario</h4>
              <p>Lun - Vie: 8am - 7pm</p>
              <p>Sab: 9am - 5pm</p>
              <p>Dom: 10am - 3pm</p>
              <p class="footer-emergency">🚨 Emergencias 24/7</p>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 SamanTails. Todos los derechos reservados. Hecho con 🐾 para tus mascotas.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(180deg, #4E342E, #3E2723);
      color: white;
      padding: 50px 20px 20px;
    }

    .footer-paws {
      text-align: center;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.08);
      letter-spacing: 24px;
      white-space: nowrap;
      overflow: hidden;
      margin-bottom: 30px;
    }

    .footer-content {
      max-width: 1100px;
      margin: 0 auto;
    }

    .footer-main {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 50px;
      margin-bottom: 36px;
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-logo {
      height: 90px;
      width: auto;
      filter: brightness(1.1);
    }

    .footer-tagline {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.65);
      font-style: italic;
      margin: 0;
    }

    .footer-contact {
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.88rem;
      color: rgba(255, 255, 255, 0.7);

      p { margin: 0; }
      strong { color: #E8A440; }
    }

    .footer-columns {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 36px;
    }

    .footer-col {
      display: flex;
      flex-direction: column;
      gap: 8px;

      h4 {
        font-size: 0.95rem;
        font-weight: 700;
        color: #F4C46A;
        margin: 0 0 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      a {
        color: rgba(255, 255, 255, 0.65);
        text-decoration: none;
        font-size: 0.85rem;
        transition: color 0.2s;

        &:hover { color: #E8A440; }
      }

      p {
        margin: 0;
        font-size: 0.82rem;
        color: rgba(255, 255, 255, 0.55);
        line-height: 1.5;

        strong { color: rgba(255, 255, 255, 0.8); }
      }
    }

    .footer-emergency {
      color: #EF5350 !important;
      font-weight: 700 !important;
      margin-top: 4px !important;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 18px;
      text-align: center;

      p {
        margin: 0;
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.82rem;
      }
    }

    @media (max-width: 900px) {
      .footer-main {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .footer-brand {
        text-align: center;
        align-items: center;
      }

      .footer-columns {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }
    }

    @media (max-width: 500px) {
      .footer-columns {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .footer-col {
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {}
