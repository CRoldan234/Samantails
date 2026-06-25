import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-about-component',
    imports: [CommonModule, RouterModule, FooterComponent],
    templateUrl: './about-component.html',
    styleUrls: ['./about-component.scss']
})
export class AboutComponent {}
