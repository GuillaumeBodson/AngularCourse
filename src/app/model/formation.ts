import {uuid} from '../shared/uuid';

export class Formation {
  constructor(
    public title: string,
    public description: string,
    public location: string,
    public date: Date,
    public tags: string[],
    public price: number,
    public remainingSeats: number,
    public timeStart: number,
    public durationHours: number,
  ) {
    this.id = uuid();
  }
  public id: string;
   get isFree(): boolean {
    return this.price === 0;
  }
}
