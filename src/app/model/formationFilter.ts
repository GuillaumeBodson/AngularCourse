export type FormationFilter = {
  title: string,
  tags: string[],
  maxPrice: number | null,
  availableSeatsMin: number,
  startDate: Date | null,
  endDate: Date | null,
  onlyPastFormations: boolean
}
