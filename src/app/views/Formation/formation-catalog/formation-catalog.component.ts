import {Component} from '@angular/core';
import {Formation} from '../../../model/formation';
import {FormationCardComponent} from '../formation-card/formation-card.component';
import {uuid} from '../../../shared/uuid';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-formation-catalog',
  imports: [
    FormationCardComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatButton
  ],
  templateUrl: './formation-catalog.component.html',
  styleUrl: './formation-catalog.component.css'
})
export class FormationCatalogComponent {

  form = new FormGroup({
    title: new FormControl<string>('',
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
    description: new FormControl<string>(''),
    location: new FormControl<string>('',
      [Validators.required]),
    date: new FormControl<Date | null>(null, [Validators.required]),
    tags: new FormControl<string> ('',)
  })

  catalog: Formation[] = [
    {
      id: uuid(),
      title: 'Angular - premiers pas',
      description: 'Fais tes premiers pas avec Angular',
      location: 'EPHEC',
      date: new Date("2025-09-20T10:30:00"),
      tags: ['Angular', 'TypeScript']
    },
    {
      id: uuid(),
      title: 'Java - Springboot',
      description: 'Découvrez Springboot',
      location: 'Remote',
      date: new Date("2025-09-30T10:30:00"),
      tags: ['Java', 'Springboot']
    }
  ];

  addFormation() {
    const formation: Formation = {
      id: uuid(),
      title: this.form.controls.title.value!,
      description: this.form.controls.description?.value ?? '',
      location: this.form.controls.location.value!,
      date: this.form.controls.date.value!,
      tags: this.form.controls.tags.value?.split(',').map(tag => tag.trim()) || []
    }

    this.catalog.push(formation);
    this.form.reset();
  }

  isTitleLengthValid(): boolean {
    return !this.form.controls.title.hasError('minlength');
  }
}
