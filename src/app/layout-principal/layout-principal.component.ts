import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-layout-principal',
    imports: [CommonModule, RouterOutlet, NavBarComponent, MatSidenavModule],
    templateUrl: './layout-principal.component.html',
    styleUrl: './layout-principal.component.scss'
})
export class LayoutPrincipalComponent {
  isFullyCollapsed: boolean = true;
}
