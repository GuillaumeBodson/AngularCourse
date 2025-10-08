import {Component, computed, inject, signal} from '@angular/core';
import {FormationCardComponent} from '../formation-card/formation-card.component';
import {FormationService} from '../formation.service';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-formation-catalog',
  imports: [
    FormationCardComponent,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,

  ],
  templateUrl: './formation-catalog.component.html',
  styleUrl: './formation-catalog.component.css'
})
export class FormationCatalogComponent {

  formationService = inject(FormationService);
  catalog = signal(this.formationService.getCatalog());

  textfilter = signal("")

  filteredCatalog = computed(
    () => this.catalog().filter(f => f.title.toLowerCase().includes(this.textfilter().toLowerCase()))
  );
}
