import {Component, inject} from '@angular/core';
import {FormationCardComponent} from '../formation-card/formation-card.component';
import {FormsModule} from '@angular/forms';
import {FormationFilterComponent} from '../formation-filter.component/formation-filter.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {
  DistanceSliderComponent
} from '../formation-filter.component/distance-slider.component/distance-slider.component';
import {PagedFormationService} from '../paged.formation.service';

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

  onPage(event: PageEvent) {
    this.formationService.pageIndex.set(event.pageIndex);
    this.formationService.pageSize.set(event.pageSize);
  }

}


