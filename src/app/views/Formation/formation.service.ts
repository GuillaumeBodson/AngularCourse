import {inject, Injectable, Signal, signal} from '@angular/core';
import {Formation} from '../../model/formation';
import {NotificationService} from '../notification.service';
import {catchError, map, Observable, of, startWith, Subject, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UUID} from '../../shared/uuid';
import {toSignal} from '@angular/core/rxjs-interop';


type FormationDTO ={
  id: UUID;
  title: string;
  description: string;
  location: string;
  date: string;
  tags: string[];
}


@Injectable({
  providedIn: 'root'
})
export class FormationService {

    private _notificationService = inject(NotificationService);

  private readonly FORMATION_URL = 'https://localhost:7122/formations';
  http = inject(HttpClient);

  private readonly refreshTrigger$ = new Subject<void>()
  private readonly findFormations :Observable<Formation[]> =
    this.refreshTrigger$.pipe(
      startWith([]),
      switchMap(() :Observable<FormationDTO[]> => this.http.get<FormationDTO[]>(this.FORMATION_URL)),
      map(data => {
        return data.map(this.mapFormation);
      }),
      catchError(err => {
        console.log('error fetching formations', err);
        return of([]);
      })
    );

  private readonly _catalog :Signal<Formation[]> = toSignal(this.findFormations, {initialValue: []});
  //getCatalog = this._catalog;

   get getCatalog() {
    return this._catalog;
  }
  mapFormation = (f: FormationDTO) => {
    return {
      ...f,
            date: new Date(f.date),
      distance: Math.floor(Math.random() * 100),
    } as Formation
  }


  addFormation(formation: Formation): void {
    // this.catalog.update(c => {
    //   c.push(formation);
    //   return c;
    // });

    this._notificationService.notify(`Formation "${formation.title}" added to catalog.`);
  }

  deleteFormation(formation: Formation): void {
    const index = this._catalog().findIndex(f => f.id === formation.id);
    if (index !== -1) {
      this._catalog().splice(index, 1);

      //this.catalog.set([...this.catalog()]); // Force Angular to detect the change
      this._notificationService.notify(`Formation "${formation.title}" removed from catalog.`);
    }
  }

  getFormation(formationId: UUID) :Signal<Formation> {
    return toSignal(this.http.get<FormationDTO>(`${this.FORMATION_URL}/${formationId}`)
      .pipe(map(this.mapFormation),
        catchError(err => {
          console.log(`error fetching formation with id ${formationId}`, err);
          throw err;
        })),
      {initialValue: {} as Formation}
      );
  }
}
