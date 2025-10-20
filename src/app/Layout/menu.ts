import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Menu {
  isMenuOpen = signal(false);

  toggle() {
    this.isMenuOpen.update(v => !v);
  }
}
