import {Component, inject} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {LayoutService} from '../layout.service';
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
  menuService = inject(LayoutService);
}
