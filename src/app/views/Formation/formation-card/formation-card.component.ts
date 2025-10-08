import {Component, computed, inject, model} from '@angular/core';
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
    FormationTagsComponent,
    NgClass
  ],
  templateUrl: './formation-card.component.html',
  styleUrl: './formation-card.component.css'
})
export class FormationCardComponent {
  formationService = inject(FormationService);
  router = inject(Router);

  formation = model.required<Formation>()

  isPast = computed(() => {
    return Date.now() > this.formation().date.getTime();
  });


  deleteFormation() {
    this.formationService.deleteFormation(this.formation());
  }

  goToFormation(formation: Formation) {
    this.router.navigate(['/detail', formation.id] );
  }

  postPone() {
    this.formation.update(f => {
      let newDate = new Date(f.date);
      newDate.setDate(newDate.getDate() + 1);
      f.date = newDate;

      return f;
    });
  }
}
