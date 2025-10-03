import {Component, inject, input} from '@angular/core';
import {DatePipe} from "@angular/common";
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
import {FormationService} from '../formation.service';
import {Router} from '@angular/router';
import {FormationTagsComponent} from '../formation-tags.component/formation-tags.component';

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
    FormationTagsComponent
  ],
  templateUrl: './formation-card.component.html',
  styleUrl: './formation-card.component.css'
})
export class FormationCardComponent {
  formationService = inject(FormationService);
  router = inject(Router);

  formation = input.required<Formation>()

  isDatePast(formation: Formation) {
    return new Date().getTime() > formation.date.getTime();
  }

  deleteFormation(formation: Formation) {
    this.formationService.deleteFormation(formation);
  }

  goToFormation(formation: Formation) {
    this.router.navigate(['/detail', formation.id] );
  }
}
