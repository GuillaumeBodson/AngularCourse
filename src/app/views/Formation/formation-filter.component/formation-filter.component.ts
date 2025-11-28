import {Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {TagService} from '../tag.service';
import {MatOption, MatSelect} from "@angular/material/select";
import {FormationFilter} from '../../../model/formationFilter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckbox} from '@angular/material/checkbox';
import {Router} from '@angular/router';

@Component({
  selector: 'app-formation-filter',
  imports: [
    FormsModule,
    MatButton,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSuffix,
    MatSelect,
    MatOption,
    MatDateRangeInput,
    MatDateRangePicker,
    MatCheckbox,
  ],
  templateUrl: './formation-filter.component.html',
  styleUrl: './formation-filter.component.css'
})
export class FormationFilterComponent {
  router = inject(Router);
  tagService = inject(TagService);
  filter = model.required<FormationFilter>();

  title = signal<string>('');
  previousFormations = signal<boolean>(false);
  startDate = signal<Date | null>(null);
  endDate = signal<Date | null>(null);
  maxPrice = signal<number | null>(null);
  availableSeatsMin = signal<number | null>(null);
  tags = signal<string[]>([]);



  submit() {
    let formationFilter: FormationFilter = new FormationFilter(
      this.title(),
      this.tags(),
      this.maxPrice(),
      this.availableSeatsMin() ?? -1,
      this.startDate(),
      this.endDate(),
      this.previousFormations(),
    );

    this.filter.set(formationFilter);



    // this.router.navigate(
    //   ['/catalog'],
    //   { queryParams: { filter: JSON.stringify(formationFilter) } });
  }
}
