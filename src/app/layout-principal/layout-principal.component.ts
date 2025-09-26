import { CommonModule } from '@angular/common';
import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';



@Component({
  selector: 'app-layout-principal',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, MatSidenavModule],
  templateUrl: './layout-principal.component.html',
  styleUrl: './layout-principal.component.scss'
})
export class LayoutPrincipalComponent {
  title = 'lexpad-front-end';



  isExpanded: boolean = false; 
  isFullyCollapsed: boolean = true; 

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}


  ngOnInit() {
    

  }

  
  handleExpandChange(isExpanded: boolean) {
    this.isExpanded = isExpanded;
  }


}
