import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Formation} from '../../../model/formation';
import {MatButton} from '@angular/material/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatError, MatFormField, MatHint, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {FormationService} from '../formation.service';

@Component({
  selector: 'app-formation-creation',
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule
  ],
  templateUrl: './formation-creation.component.html',
  styleUrl: './formation-creation.component.css'
})
export class FormationCreationComponent {
  formationService = inject(FormationService);


  form = new FormGroup({
    title: new FormControl<string>('',
      [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
    description: new FormControl<string>(''),
    location: new FormControl<string>('',
      [Validators.required]),
    date: new FormControl<Date | null>(null, [Validators.required]),
    tags: new FormControl<string> ('',)
  });

  addFormation() {
    const formation: Formation = new Formation(
      this.form.controls.title.value!,
      this.form.controls.description?.value ?? '',
      this.form.controls.location.value!,
      this.form.controls.date.value!,
      this.form.controls.tags.value?.split(',').map(tag => tag.trim()) || [],
      0,20,9,8);

    this.formationService.addFormation(formation);
    this.form.reset();
  }

  isTitleLengthValid(): boolean {
    return !this.form.controls.title.hasError('minlength');
  }
}
