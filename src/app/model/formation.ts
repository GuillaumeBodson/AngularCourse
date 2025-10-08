export class Formation {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public location: string,
    public date: Date,
    public tags: string[],
    public price: number,
    public totalSeats: number,
    public timeStart: number,
    public durationHours: number,
  ) {}

   get isFree(): boolean {
    return this.price === 0;
  }
}
