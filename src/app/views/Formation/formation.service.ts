import {Injectable, signal} from '@angular/core';
import {Formation} from '../../model/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private readonly _catalog = [
    new Formation('Angular - premiers pas', 'Fais tes premiers pas avec Angular', 'EPHEC', new Date("2025-09-20T10:30:00"), ['Angular', 'TypeScript'],0,20,9,8),
    new Formation('Java - Springboot', 'Découvrez Springboot', 'Remote', new Date("2025-09-30T10:30:00"), ['Java', 'Springboot'],100,20,14,4),
    new Formation('React - Essentials', 'Apprenez les bases de React', 'Bruxelles', new Date("2025-10-05T09:00:00"), ['React', 'JavaScript'],120,25,10,5),
    new Formation('Python - Data Science', 'Introduction à la Data Science avec Python', 'EPHEC', new Date("2025-10-12T14:00:00"), ['Python', 'Data Science'],150,30,20,10),
    new Formation('DevOps - CI/CD', 'Mettez en place des pipelines CI/CD', 'Remote', new Date("2025-10-20T13:00:00"), ['DevOps', 'CI/CD'],130,15,7,3),
    new Formation('Node.js - Backend', 'Développez des APIs avec Node.js', 'Liège', new Date("2025-11-01T10:00:00"), ['Node.js', 'API'],110,20,12,6),
    new Formation('Vue.js - Avancé', 'Maîtrisez Vue.js pour des applications complexes', 'Namur', new Date("2025-11-10T09:30:00"), ['Vue.js', 'JavaScript'],140,18,8,2),
    new Formation('Kotlin - Android', 'Développez des apps Android avec Kotlin', 'Remote', new Date("2025-11-15T15:00:00"), ['Kotlin', 'Android'],160,22,11,7),
    new Formation('C# - ASP.NET Core', 'Créez des applications web avec ASP.NET Core', 'Bruxelles', new Date("2025-11-20T11:00:00"), ['C#', 'ASP.NET Core'],170,20,13,9),
    new Formation('SQL - Bases de données', 'Maîtrisez les bases de données relationnelles', 'EPHEC', new Date("2025-12-01T10:00:00"), ['SQL', 'Database'],90,25,15,10),
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
