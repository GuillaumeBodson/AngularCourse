import {Component} from '@angular/core';
import {Formation} from '../../../model/formation';
import {FormationCardComponent} from '../formation-card/formation-card.component';
import {uuid} from '../../../shared/uuid';

@Component({
  selector: 'app-formation-catalog',
  imports: [
    FormationCardComponent
  ],
  templateUrl: './formation-catalog.component.html',
  styleUrl: './formation-catalog.component.css'
})
export class FormationCatalogComponent {

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

}
