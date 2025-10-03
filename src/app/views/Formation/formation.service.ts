import { Injectable } from '@angular/core';
import {Formation} from '../../model/formation';
import {uuid} from '../../shared/uuid';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private readonly catalog: Formation[] = [
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
  constructor() {
  }
  getCatalog(): Formation[] {
    return this.catalog;
  }

  addFormation(formation: Formation): void {
    this.catalog.push(formation);
  }

  removeFormation(formation: Formation): void {
    const index = this.catalog.findIndex(f => f.id === formation.id);
    if (index !== -1) {
      this.catalog.splice(index, 1);
    }
  }
}
