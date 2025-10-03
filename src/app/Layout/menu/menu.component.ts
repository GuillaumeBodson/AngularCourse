import {Component} from '@angular/core';
import {MatListItem} from '@angular/material/list';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    MatListItem,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
