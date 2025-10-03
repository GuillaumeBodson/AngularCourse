import {Component, inject} from '@angular/core';
import {FormationService} from '../formation.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {FormationTagsComponent} from '../formation-tags.component/formation-tags.component';

@Component({
  selector: 'app-formation-detail.component',
  imports: [
    DatePipe,
    FormationTagsComponent
  ],
  templateUrl: './formation-detail.component.html',
  styleUrl: './formation-detail.component.css'
})
export class FormationDetailComponent {
  formationService = inject(FormationService);
  route = inject(ActivatedRoute);

  formationId = this.route.snapshot.paramMap.get('id')!;
  formation = this.formationService.getFormation(this.formationId);
}
