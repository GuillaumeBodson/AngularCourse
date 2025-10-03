import {Component, inject} from '@angular/core';
import {Formation} from '../../../model/formation';
import {FormationCardComponent} from '../formation-card/formation-card.component';
import {FormationCreationComponent} from '../formation-creation/formation-creation.component';
import {FormationService} from '../formation.service';

@Component({
  selector: 'app-formation-catalog',
  imports: [
    FormationCardComponent,
    FormationCreationComponent,

  ],
  templateUrl: './formation-catalog.component.html',
  styleUrl: './formation-catalog.component.css'
})
export class FormationCatalogComponent {

  formationService = inject(FormationService);
  catalog: Formation[] = this.formationService.getCatalog();
}
