import {Formation} from './formation';

export class FormationFilter {
  title: string;
  tags: string[];
  maxPrice: number | null;
  availableSeatsMin: number;
  startDate: Date | null;
  endDate: Date | null;
  onlyPastFormations: boolean;

  constructor(title: string, tags: string[], maxPrice: number|null, availableSeatsMin: number, startDate: Date|null, endDate: Date|null, onlyPastFormations: boolean) {
    this.title = title ?? '';
    this.tags = tags ?? [];
    this.maxPrice = maxPrice ?? null;
    this.availableSeatsMin = availableSeatsMin ?? -1;
    this.startDate = startDate ?? null;
    this.endDate = endDate ?? null;
    this.onlyPastFormations = onlyPastFormations ?? false;

    if(onlyPastFormations){
      this.endDate = new Date();
      this.startDate = null;
    }
  }

  public applyFilter(catalog: Formation[]) :Formation[]{
    if(this.title){
      catalog = catalog.filter(f => f.title.toLowerCase().includes(this.title.toLowerCase()));
    }
    if(this.tags && this!.tags.length > 0){
      catalog = catalog.filter(f => this.tags!.every(tag => f.tags.includes(tag)));
    }
    if(this.maxPrice != null){
      catalog = catalog.filter(f => f.price <= this!.maxPrice!);
    }
    if(this.availableSeatsMin != null && this.availableSeatsMin! > 0){
      catalog = catalog.filter(f => f.remainingSeats >= this!.availableSeatsMin!);
    }
    if((this.startDate && this.endDate && this.startDate == this.endDate) || this.startDate ){
      catalog = catalog.filter(f => f.date >= this.startDate!);
    }
    if(this.endDate){
      catalog = catalog.filter(f => f.date <= this.endDate!);
    }
    return catalog;
  }

  static default(): FormationFilter {
    return new FormationFilter('', [], null, -1, null, null, false);
  }
}
