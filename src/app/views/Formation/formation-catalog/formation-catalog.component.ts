import {Component, computed, inject, signal, WritableSignal} from '@angular/core';
import {FormationCardComponent} from '../formation-card/formation-card.component';
import {FormationService} from '../formation.service';
import {FormsModule} from '@angular/forms';
import {FormationFilterComponent} from '../formation-filter.component/formation-filter.component';
import {FormationFilter} from '../../../model/formationFilter';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

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

  readonly queryFilter = toSignal(
    this.route.queryParamMap.pipe(map(p => p.get('filter'))),
    { initialValue: null }
  );

  filter :WritableSignal<FormationFilter|null> = signal(null)

  readonly parsedFilter = computed(() => {
    const raw = this.queryFilter();
    if (!raw) return null;
    try {
      const json = JSON.parse(raw) as FormationFilter;
      return FormationFilter.fromJson(json);
    } catch {
      return null;
    }
  });


  filteredCatalog = computed(
    () => {
      let catalog = this.formationService.catalog();
      if (!this.parsedFilter()) return catalog;

      catalog = this.parsedFilter()!.applyFilter(catalog);
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


