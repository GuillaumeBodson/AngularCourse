import {inject, Injectable, Signal} from '@angular/core';
import {Formation} from '../../model/Formation';
import {NotificationService} from '../notification.service';
import {catchError, map, Observable, of, startWith, Subject, switchMap} from 'rxjs';
import {UUID} from '../../shared/uuid';
import {toSignal} from '@angular/core/rxjs-interop';
import {Client, FormationDto} from '../../apiclient/client';


@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private _notificationService = inject(NotificationService);

  private _client = inject(Client)

  private readonly refreshTrigger$ = new Subject<void>()
  private readonly findFormations :Observable<Formation[]> =
    this.refreshTrigger$.pipe(
      startWith([]),
      switchMap(() :Observable<FormationDto[]> => this._client.formationsAll()),
      map(data => {
        return data.map(this.mapFormation);
      }),
      catchError(err => {
        console.log('error fetching formations', err);
        return of([]);
      })
    );

  private readonly _catalog :Signal<Formation[]> = toSignal(this.findFormations, {initialValue: []});

  get getCatalog() {
    return this._catalog;
  }
  mapFormation = (f: FormationDto) => {
    return {
      ...f,
            date: f.date,
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
    return toSignal(this._client.formationsGET(formationId)
      .pipe(
        map(this.mapFormation),
        catchError(err => {
          console.log(`error fetching formation with id ${formationId}`, err);
          throw err;
        })
      ),
      {initialValue: {} as Formation}
    );
  }
}
