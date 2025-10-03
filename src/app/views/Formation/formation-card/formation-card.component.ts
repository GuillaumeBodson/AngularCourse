import {Component, inject, input} from '@angular/core';
import {DatePipe, NgClass} from "@angular/common";
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {Formation} from '../../../model/formation';
import {MatButton} from '@angular/material/button';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {FormationService} from '../formation.service';

@Component({
  selector: 'app-formation-card',
  imports: [
    DatePipe,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle,
    MatButton,
    MatCardSubtitle,
    MatChipSet,
    MatChip,
    NgClass
  ],
  templateUrl: './formation-card.component.html',
  styleUrl: './formation-card.component.css'
})
export class FormationCardComponent {
  formationService = inject(FormationService);


  formation = input.required<Formation>()

  isDatePast(formation: Formation) {
    return new Date().getTime() > formation.date.getTime();
  }

  isAngular(tag: string) {
    return 'Angular' === tag;
  }

  deleteFormation(formation: Formation) {
    this.formationService.removeFormation(formation);
  }
}
