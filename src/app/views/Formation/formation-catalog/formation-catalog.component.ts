import {Component, computed, inject, signal, WritableSignal} from '@angular/core';
import {FormationCardComponent} from '../formation-card/formation-card.component';
import {FormationService} from '../formation.service';
import {FormsModule} from '@angular/forms';
import {FormationFilterComponent} from '../formation-filter.component/formation-filter.component';
import {FormationFilter} from '../../../model/formationFilter';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-formation-catalog',
  imports: [
    FormationCardComponent,
    FormsModule,
    FormationFilterComponent,
    MatExpansionModule,
    MatPaginatorModule
  ],
  templateUrl: './formation-catalog.component.html',
  styleUrl: './formation-catalog.component.css'
})
export class FormationCatalogComponent {
  formationService = inject(FormationService);
  route = inject(ActivatedRoute);
  queryFilter = signal(this.route.snapshot.paramMap.get('filter'));

  filter :WritableSignal<FormationFilter|null> = signal(JSON.parse(this.queryFilter() || 'null'))

  filteredCatalog = computed(
    () => {
      let catalog = this.formationService.catalog();
      let test = this.queryFilter();

      let formationFilterFromQuery: FormationFilter|null = JSON.parse(this.queryFilter() || 'null');

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
        catalog = catalog.filter(f => f.date >= this.filter()!.startDate!);
      }
      if(this.filter()?.endDate){
        catalog = catalog.filter(f => f.date <= this.filter()!.endDate!);
      }
      return catalog;
    });

  // Pagination
  readonly pageIndex = signal(0);
  readonly pageSize = signal(2);
  readonly pageSizeOptions = [2, 5, 10];

  readonly pagedCatalog = computed(() => {
    const list = this.filteredCatalog();
    const start = this.pageIndex() * this.pageSize();
    return list.slice(start, start + this.pageSize());
  });

  onPage(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

}


