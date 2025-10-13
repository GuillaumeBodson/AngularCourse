import { Routes } from '@angular/router';
import {FormationCatalogComponent} from './views/Formation/formation-catalog/formation-catalog.component';
import {FormationCreationComponent} from './views/Formation/formation-creation/formation-creation.component';
import {FormationDetailComponent} from './views/Formation/formation-detail.component/formation-detail.component';

export const routes: Routes = [
  {path: '', redirectTo: 'catalog', pathMatch: 'full'},
  {path: 'catalog', component: FormationCatalogComponent},
  {path: 'creation', component: FormationCreationComponent},
  {path:'detail/:id', component: FormationDetailComponent}
];
