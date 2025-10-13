import {Component, inject, input} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {Menu} from '../menu';
import {MatIconModule} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIconModule,
    MatMiniFabButton,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
menuService = inject(Menu);

isOpened = input(false);

  toggleSidenav() {
    this.menuService.toggle();
  }
}
