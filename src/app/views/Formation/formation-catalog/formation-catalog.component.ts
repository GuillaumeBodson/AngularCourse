import {Component, computed, inject, signal} from '@angular/core';
import {FormationCardComponent} from '../formation-card/formation-card.component';
import {FormsModule} from '@angular/forms';
import {FormationFilterComponent} from '../formation-filter.component/formation-filter.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {
  DistanceSliderComponent
} from '../formation-filter.component/distance-slider.component/distance-slider.component';
import {PagedFormationService} from '../paged.formation.service';
import {FormationFilter} from '../../../model/formationFilter';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-formation-catalog',
  imports: [
    FormationCardComponent,
    FormsModule,
    FormationFilterComponent,
    MatExpansionModule,
    MatPaginatorModule,
    DistanceSliderComponent
  ],
  templateUrl: './formation-catalog.component.html',
  styleUrl: './formation-catalog.component.css'
})
export class FormationCatalogComponent {
  formationService = inject(PagedFormationService);
  private _route = inject(ActivatedRoute);


  onPage(event: PageEvent) {
    this.formationService.pageIndex.set(event.pageIndex);
    this.formationService.pageSize.set(event.pageSize);
  }

  formationFilter = signal<FormationFilter>(FormationFilter.default());
  onfilterchange = toObservable(this.formationFilter).pipe(
    f => f
  )

  private readonly queryFilter = toSignal(
    this._route.queryParamMap.pipe(map(p => p.get('filter'))),
    { initialValue: null }
  );

  private readonly parsedFilter = computed(() => {
    const raw = this.queryFilter();
    if (!raw) return null;
    try {
      const json = JSON.parse(raw) as FormationFilter;
      return FormationFilter.fromJson(json);
    } catch {
      return null;
    }
  });

}


