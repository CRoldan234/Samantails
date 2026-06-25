import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

@Component({
    selector: 'app-news-carousel-dynamic',
    imports: [CommonModule],
    templateUrl: './news-carousel-dynamic.component.html',
    styleUrls: ['./news-carousel-dynamic.component.scss']
})
export class NewsCarouselDynamicComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() carouselTitle: string = 'Productos Destacados';
  @Input() carouselId: string = 'animal-products-carousel';
  @Input() carouselType: 'products' | 'services' = 'products';

  public swiperInstance: Swiper | null = null;

  public animalProducts: any[] = [
    { id: 1, title: 'Alimento Premium para Perros', summary: 'Alimento balanceado con proteina de alta calidad para todas las razas', source: 'NutriPet', topic: 'Alimentos', img: 'assets/img/alimento1.png', price: '$45.900', category: 'Perros', rating: 4.8 },
    { id: 2, title: 'Arenero Sanitario para Gatos', summary: 'Arenero automatico con filtro de carbon activado', source: 'CatClean', topic: 'Higiene', img: 'assets/img/arenero.png', price: '$89.900', category: 'Gatos', rating: 4.5 },
    { id: 3, title: 'Juguete Interactivo para Aves', summary: 'Juguete de madera natural para loros y guacamayos', source: 'BirdFun', topic: 'Juguetes', img: 'assets/img/ave.png', price: '$23.500', category: 'Aves', rating: 4.7 },
    { id: 4, title: 'Transportadora para Mascotas', summary: 'Transportadora ventilada y segura para viajes', source: 'PetTravel', topic: 'Accesorios', img: 'assets/img/transporte.png', price: '$67.800', category: 'Varios', rating: 4.9 },
    { id: 5, title: 'Shampoo Antipulgas', summary: 'Shampoo natural para control de pulgas y garrapatas', source: 'VetCare', topic: 'Salud', img: 'assets/img/antipulgas.png', price: '$18.900', category: 'Higiene', rating: 4.6 },
    { id: 6, title: 'Cama Termica para Mascotas', summary: 'Cama termica para invierno, tamano grande', source: 'PetComfort', topic: 'Confort', img: 'assets/img/cama.png', price: '$54.900', category: 'Confort', rating: 4.8 }
  ];

  public animalServices: any[] = [
    { id: 101, title: 'Consulta Veterinaria General', summary: 'Consulta completa con examen fisico y diagnostico', source: 'VetCenter', topic: 'Consulta', img: 'assets/img/services/vet-consultation.jpg', price: '$35.000', category: 'Salud', duration: '30 min', urgency: 'Disponible hoy' },
    { id: 102, title: 'Vacunacion Completa', summary: 'Esquema completo de vacunacion para tu mascota', source: 'PetVacc', topic: 'Vacunacion', img: 'assets/img/services/vaccination.jpg', price: '$25.000', category: 'Prevencion', duration: '20 min', urgency: 'Agendar' },
    { id: 103, title: 'Peluqueria Canina', summary: 'Bano, corte de pelo y unas, limpieza dental', source: 'PetSpa', topic: 'Estetica', img: 'assets/img/services/grooming.jpg', price: '$40.000', category: 'Belleza', duration: '2 horas', urgency: 'Disponible' },
    { id: 104, title: 'Cirugia de Esterilizacion', summary: 'Procedimiento seguro con equipo especializado', source: 'SurgicalVet', topic: 'Cirugia', img: 'assets/img/services/surgery.jpg', price: '$120.000', category: 'Salud', duration: '1 dia', urgency: 'Agendar' },
    { id: 105, title: 'Guarderia para Mascotas', summary: 'Cuidado diurno con actividades recreativas', source: 'PetHotel', topic: 'Guarderia', img: 'assets/img/services/daycare.jpg', price: '$15.000/dia', category: 'Cuidado', duration: 'Flexible', urgency: 'Disponible' },
    { id: 106, title: 'Entrenamiento Canino', summary: 'Sesiones de obediencia basica y avanzada', source: 'DogTrain', topic: 'Entrenamiento', img: 'assets/img/services/training.jpg', price: '$50.000/sesion', category: 'Educacion', duration: '1 hora', urgency: 'Agendar' }
  ];

  get newsItems(): any[] {
    return this.carouselType === 'services' ? this.animalServices : this.animalProducts;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    Swiper.use([Navigation, Pagination, Autoplay]);
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['carouselId'] || changes['carouselType']) && !changes['carouselId']?.firstChange) {
      this.reinitSwiper();
    }
  }

  ngOnDestroy(): void {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }
  }

  initSwiper(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      this.swiperInstance = new Swiper(`.${this.carouselId}`, {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        grabCursor: true,
        navigation: {
          nextEl: `.swiper-button-next-${this.carouselId}`,
          prevEl: `.swiper-button-prev-${this.carouselId}`,
          disabledClass: 'swiper-button-disabled',
        },
        pagination: {
          el: `.swiper-pagination-${this.carouselId}`,
          clickable: true,
        },
        autoplay: { delay: 5000, disableOnInteraction: false },
        breakpoints: {
          320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 15 },
          1024: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 20 }
        },
        loop: false
      });
    }, 100);
  }

  reinitSwiper(): void {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }
    this.initSwiper();
  }

  getImageSource(item: any): string {
    return item.img || 'assets/img/default-product.png';
  }

  navigateToNews(id: number): void {
    console.log('Navegar a producto/servicio:', id);
  }
}
