import {Component, inject} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatNavList} from '@angular/material/list';
import {FooterComponent} from './Layout/footer/footer.component';
import {HeaderComponent} from './Layout/header/header.component';
import {ContentComponent} from './Layout/content/content.component';
import {MenuComponent} from './Layout/menu/menu.component';
import {Menu} from './Layout/menu';


@Component({
  selector: 'app-root',
  imports: [MatSidenavContainer,
    MatSidenav,
    MatToolbar,
    MatNavList,
    MatSidenavContent,
    FooterComponent, HeaderComponent, ContentComponent, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  menuService = inject(Menu);
}
