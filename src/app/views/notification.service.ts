import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _snackBar = inject(MatSnackBar);

  public notify(message: string, action: string = "Close"){
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
