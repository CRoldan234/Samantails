import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, EventEmitter, Output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

@Component({
  selector: 'app-about-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-component.html',
  styleUrls: ['./about-component.scss']
})
export class AboutComponent {

}