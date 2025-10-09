import {Component, inject, model} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatDateRangeInput,
    MatDateRangePicker,
    MatCheckbox
  ],
  templateUrl: './formation-filter.component.html',
  styleUrl: './formation-filter.component.css'
})
export class FormationFilterComponent {
  router = inject(Router)
  tagService = inject(TagService);
  filter = model.required<FormationFilter|null>()

  form = new FormGroup({
    title: new FormControl<string>('',
      [Validators.maxLength(100)]),
    PreviousFormations: new FormControl<boolean>(false),
    range: new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    }),
    maxPrice: new FormControl<number | null>(null,
      [Validators.min(0)]),
    availableSeatsMin: new FormControl<number | null>(null,
      [Validators.min(0)]),
    tags: new FormControl<string[] | null> (null,)
  });

  submit() {
    const v = this.form.value;
    let formationFilter :FormationFilter = {
      title: v.title??'',
      tags: v.tags ?? [],
      maxPrice: v.maxPrice ?? null,
      availableSeatsMin: v.availableSeatsMin ?? -1,
      startDate: v.range?.start ?? null,
      endDate: v.range?.end ?? null,
      onlyPastFormations: v.PreviousFormations ?? false
    };
    if(v.PreviousFormations){
      formationFilter.endDate = new Date();
      formationFilter.startDate = null;
    }

    this.router.navigate(['/catalog', {filter: JSON.stringify(formationFilter)}]);
    //this.filter.set(formationFilter);
  }
}
