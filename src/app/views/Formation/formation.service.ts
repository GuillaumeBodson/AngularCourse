import {Injectable, signal} from '@angular/core';
import {Formation} from '../../model/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private readonly _catalog = [
    new Formation('Angular - premiers pas', 'Fais tes premiers pas avec Angular', 'EPHEC', new Date("2025-09-20T10:30:00"), ['Angular', 'TypeScript'],0,20,9,8),
    new Formation('Java - Springboot', 'Découvrez Springboot', 'Remote', new Date("2025-09-30T10:30:00"), ['Java', 'Springboot'],100,20,14,4),
  ];
  constructor() {
  }
  catalog = signal<Formation[]>(this._catalog);

  addFormation(formation: Formation): void {
    this.catalog.update(c => {
      c.push(formation);
      return c;
    });
  }

  deleteFormation(formation: Formation): void {
    const index = this.catalog().findIndex(f => f.id === formation.id);
    if (index !== -1) {
      this.catalog().splice(index, 1);

      this.catalog.set([...this.catalog()]); // Force Angular to detect the change
    }
  }

  getFormation(formationId: string) {
    return this.catalog().find(f => f.id === formationId);
  }
}
