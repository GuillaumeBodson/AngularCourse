import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService{
  private readonly _tags = new Set<string>(['Angular', 'TypeScript', 'Java', 'Springboot', 'C#', '.NET', 'Python', 'Django']);

  tags = signal(this._tags);
}
