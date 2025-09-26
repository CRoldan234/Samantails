import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, EventEmitter, Output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

@Component({
  selector: 'app-news-carousel-dynamic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-carousel-dynamic.component.html',
  styleUrls: ['./news-carousel-dynamic.component.scss']
})
export class NewsCarouselDynamicComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() carouselTitle: string = 'Productos Destacados';
  @Input() carouselId: string = 'animal-products-carousel';
  @Input() existingCarousel: any;
  @Input() carouselType: 'products' | 'services' = 'products'; // Nuevo input para tipo
  
  @Output() carouselUpdated = new EventEmitter<any>();
  @Output() carouselDeleted = new EventEmitter<any>();

  public swiperInstance: Swiper | null = null;

  public categories = [
    {
      name: 'Alimentos',
      icon: 'assets/img/alimentos.png'
    },
    {
      name: 'Accesorios',
      icon: 'assets/img/accesorios.png'
    },
    {
      name: 'Cuidado e Higiene',
      icon: 'assets/img/cuidado.png'
    },
    {
      name: 'Snacks y Juguetes',
      icon: 'assets/img/snacks.png'
    }
  ];

  // Marcas para la sección cuadrada
  public brands = [
    {
      name: 'NutriPet',
      logo: 'assets/img/marca1.png'
    },
    {
      name: 'VetCare',
      logo: 'assets/img/marca2.png'
    },
    {
      name: 'PetComfort',
      logo: 'assets/img/marca3.png'
    },
    {
      name: 'DogTrain',
      logo: 'assets/img/marca4.png'
    },
    {
      name: 'CatClean',
      logo: 'assets/img/marca5.png'
    },
    {
      name: 'PetSpa',
      logo: 'assets/img/marca6.png'
    }
  ];

  
  // Data quemada para PRODUCTOS de animales
  public animalProducts: any[] = [
    {
      id: 1,
      title: 'Alimento Premium para Perros',
      summary: 'Alimento balanceado con proteína de alta calidad para todas las razas',
      source: 'NutriPet',
      topic: 'Alimentos',
      datetime: new Date('2024-01-15T10:30:00'),
      img: 'assets/img/alimento1.png',
      logo: 'assets/img/brands/nutripet-logo.png',
      price: '$45.900',
      category: 'Perros',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Arenero Sanitario para Gatos',
      summary: 'Arenero automático con filtro de carbón activado',
      source: 'CatClean',
      topic: 'Higiene',
      datetime: new Date('2024-01-14T14:20:00'),
      img: 'assets/img/arenero.png',
      logo: 'assets/img/brands/catclean-logo.png',
      price: '$89.900',
      category: 'Gatos',
      rating: 4.5
    },
    {
      id: 3,
      title: 'Juguete Interactivo para Aves',
      summary: 'Juguete de madera natural para loros y guacamayos',
      source: 'BirdFun',
      topic: 'Juguetes',
      datetime: new Date('2024-01-13T09:15:00'),
      img: 'assets/img/ave.png',
      logo: 'assets/img/brands/birdfun-logo.png',
      price: '$23.500',
      category: 'Aves',
      rating: 4.7
    },
    {
      id: 4,
      title: 'Transportadora para Mascotas',
      summary: 'Transportadora ventilada y segura para viajes',
      source: 'PetTravel',
      topic: 'Accesorios',
      datetime: new Date('2024-01-12T16:45:00'),
      img: 'assets/img/transporte.png',
      logo: 'assets/img/brands/pettravel-logo.png',
      price: '$67.800',
      category: 'Varios',
      rating: 4.9
    },
    {
      id: 5,
      title: 'Shampoo Antipulgas',
      summary: 'Shampoo natural para control de pulgas y garrapatas',
      source: 'VetCare',
      topic: 'Salud',
      datetime: new Date('2024-01-11T11:30:00'),
      img: 'assets/img/antipulgas.png',
      logo: 'assets/img/brands/vetcare-logo.png',
      price: '$18.900',
      category: 'Higiene',
      rating: 4.6
    },
    {
      id: 6,
      title: 'Cama Térmica para Mascotas',
      summary: 'Cama térmica para invierno, tamaño grande',
      source: 'PetComfort',
      topic: 'Confort',
      datetime: new Date('2024-01-10T13:20:00'),
      img: 'assets/img/cama.png',
      logo: 'assets/img/brands/petcomfort-logo.png',
      price: '$54.900',
      category: 'Confort',
      rating: 4.8
    }
  ];

  // Data quemada para SERVICIOS veterinarios
  public animalServices: any[] = [
    {
      id: 101,
      title: 'Consulta Veterinaria General',
      summary: 'Consulta completa con examen físico y diagnóstico',
      source: 'VetCenter',
      topic: 'Consulta',
      datetime: new Date('2024-01-15T08:00:00'),
      img: 'assets/img/services/vet-consultation.jpg',
      logo: 'assets/img/brands/vetcenter-logo.png',
      price: '$35.000',
      category: 'Salud',
      duration: '30 min',
      urgency: 'Disponible hoy'
    },
    {
      id: 102,
      title: 'Vacunación Completa',
      summary: 'Esquema completo de vacunación para tu mascota',
      source: 'PetVacc',
      topic: 'Vacunación',
      datetime: new Date('2024-01-14T09:00:00'),
      img: 'assets/img/services/vaccination.jpg',
      logo: 'assets/img/brands/petvacc-logo.png',
      price: '$25.000',
      category: 'Prevención',
      duration: '20 min',
      urgency: 'Agendar'
    },
    {
      id: 103,
      title: 'Peluquería Canina',
      summary: 'Baño, corte de pelo y uñas, limpieza dental',
      source: 'PetSpa',
      topic: 'Estética',
      datetime: new Date('2024-01-13T10:00:00'),
      img: 'assets/img/services/grooming.jpg',
      logo: 'assets/img/brands/petspa-logo.png',
      price: '$40.000',
      category: 'Belleza',
      duration: '2 horas',
      urgency: 'Disponible'
    },
    {
      id: 104,
      title: 'Cirugía de Esterilización',
      summary: 'Procedimiento seguro con equipo especializado',
      source: 'SurgicalVet',
      topic: 'Cirugía',
      datetime: new Date('2024-01-12T07:00:00'),
      img: 'assets/img/services/surgery.jpg',
      logo: 'assets/img/brands/surgicalvet-logo.png',
      price: '$120.000',
      category: 'Salud',
      duration: '1 día',
      urgency: 'Agendar'
    },
    {
      id: 105,
      title: 'Guardería para Mascotas',
      summary: 'Cuidado diurno con actividades recreativas',
      source: 'PetHotel',
      topic: 'Guardería',
      datetime: new Date('2024-01-11T06:00:00'),
      img: 'assets/img/services/daycare.jpg',
      logo: 'assets/img/brands/pethotel-logo.png',
      price: '$15.000/día',
      category: 'Cuidado',
      duration: 'Flexible',
      urgency: 'Disponible'
    },
    {
      id: 106,
      title: 'Entrenamiento Canino',
      summary: 'Sesiones de obediencia básica y avanzada',
      source: 'DogTrain',
      topic: 'Entrenamiento',
      datetime: new Date('2024-01-10T16:00:00'),
      img: 'assets/img/services/training.jpg',
      logo: 'assets/img/brands/dogtrain-logo.png',
      price: '$50.000/sesión',
      category: 'Educación',
      duration: '1 hora',
      urgency: 'Agendar'
    }
  ];

  // Propiedad computada para obtener los items según el tipo
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
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

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
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 15
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20
          }
        },
        loop: false,
        on: {
          init: (swiper) => {
            this.updateNavigationButtons(swiper);
          },
          reachBeginning: (swiper) => {
            this.updateNavigationButtons(swiper);
          },
          reachEnd: (swiper) => {
            this.updateNavigationButtons(swiper);
          },
          fromEdge: (swiper) => {
            this.updateNavigationButtons(swiper);
          },
        },
      });
    }, 100);
  }

  private updateNavigationButtons(swiper: Swiper): void {
    if (swiper.navigation.prevEl) {
      swiper.isBeginning 
        ? swiper.navigation.prevEl.classList.add('swiper-button-disabled')
        : swiper.navigation.prevEl.classList.remove('swiper-button-disabled');
    }
    
    if (swiper.navigation.nextEl) {
      swiper.isEnd 
        ? swiper.navigation.nextEl.classList.add('swiper-button-disabled')
        : swiper.navigation.nextEl.classList.remove('swiper-button-disabled');
    }
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
    // Implementar navegación real
  }

  onSeeAllClick(): void {
    console.log('Ver todos los productos/servicios');
  }

  onCarouselUpdated(event: any): void {
    this.carouselUpdated.emit(event);
  }

  onCarouselDeleted(event: any): void {
    this.carouselDeleted.emit(event);
  }
}