export interface ChartSerie {
  name: Date;
  value: number;
}

export interface ChartModel {
  name: string;
  series: ChartSerie[];
}
