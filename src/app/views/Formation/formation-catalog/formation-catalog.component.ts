import {Component, computed, inject, signal, WritableSignal} from '@angular/core';
import {FormationCardComponent} from '../formation-card/formation-card.component';
import {FormationService} from '../formation.service';
import {FormsModule} from '@angular/forms';
import {FormationFilterComponent} from '../formation-filter.component/formation-filter.component';
import {FormationFilter} from '../../../model/formationFilter';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-formation-catalog',
  imports: [
    FormationCardComponent,
    FormsModule,
    FormationFilterComponent,
    MatExpansionModule
  ],
  templateUrl: './formation-catalog.component.html',
  styleUrl: './formation-catalog.component.css'
})
export class FormationCatalogComponent {
  formationService = inject(FormationService);

  textfilter = signal("")

  filter :WritableSignal<FormationFilter|null> = signal(null)

  filteredCatalog = computed(
    () => {
      let catalog = this.formationService.catalog();

      if(this.filter()?.title){
        catalog = catalog.filter(f => f.title.toLowerCase().includes(this.filter()!.title.toLowerCase()));
      }
      if(this.filter()?.tags && this.filter()!.tags.length > 0){
        catalog = catalog.filter(f => this.filter()!.tags!.every(tag => f.tags.includes(tag)));
      }
      if(this.filter()?.maxPrice != null){
        catalog = catalog.filter(f => f.price <= this.filter()!.maxPrice!);
      }
      if(this.filter()?.availableSeatsMin != null && this.filter()!.availableSeatsMin! > 0){
        catalog = catalog.filter(f => f.remainingSeats >= this.filter()!.availableSeatsMin!);
      }
      if((this.filter()?.startDate && this.filter()?.endDate && this.filter()?.startDate == this.filter()?.endDate) || this.filter()?.startDate ){
        catalog.filter(f => f.date >= this.filter()!.startDate!);
      }
      if(this.filter()?.endDate){
        catalog = catalog.filter(f => f.date <= this.filter()!.endDate!);
      }
      return catalog;
    });
}


