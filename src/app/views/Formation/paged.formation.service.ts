import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {FormationFilter} from '../../model/formationFilter';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {FormationService} from './formation.service';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PagedFormationService {
  private _formationService = inject(FormationService);
  private _route = inject(ActivatedRoute);

  readonly length = computed(() => this.filteredCatalog().length);
  readonly pageIndex = signal(0);
  readonly pageSize = signal(2);
    readonly pageSizeOptions = [2, 5, 10];
  distanceFilter = signal(100);

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
  private filteredCatalog = computed(
    () => {
      let catalog = this._formationService.catalog();
      catalog = catalog.filter(f => f.distance <= this.distanceFilter());

      if (!this.parsedFilter()) return catalog;

      catalog = this.parsedFilter()!.applyFilter(catalog);
      return catalog;
    });

  readonly pagedCatalog = computed(() => {
    const list = this.filteredCatalog();
    const start = this.pageIndex() * this.pageSize();
    return list.slice(start, start + this.pageSize());
  });

}
