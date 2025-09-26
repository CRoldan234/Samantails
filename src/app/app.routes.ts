import { Routes } from '@angular/router';
import { LayoutPrincipalComponent } from './layout-principal/layout-principal.component';
import { HomeComponent } from './shared/pages/home-component/home.component';
import { ServicesComponent } from './shared/pages/services-component/services-component';
import { AboutComponent } from './shared/pages/about-component/about-component';

export const routes: Routes = [
  { 
    path: '', 
    component: LayoutPrincipalComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent }, 
      { path: 'services', component: ServicesComponent },
      { path: 'about-us', component: AboutComponent }

    ]
  },
];
