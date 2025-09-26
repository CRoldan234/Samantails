import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-confirm-logout-dialog',
  standalone: true,
  imports: [    
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule],
  templateUrl: './confirm-logout-dialog.component.html',
  styleUrl: './confirm-logout-dialog.component.scss'
})
export class ConfirmLogoutDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmLogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}
}
