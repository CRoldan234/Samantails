import { ChangeDetectorRef, Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { NewsCarouselDynamicComponent } from './news-carousel-dynamic/news-carousel-dynamic.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, NewsCarouselDynamicComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  


}
