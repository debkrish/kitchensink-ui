import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 20000,
      panelClass: ['snackbar-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  info(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-info'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
