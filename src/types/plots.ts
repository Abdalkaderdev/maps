export interface PlotLocation {
  id: string;
  name: string;
  description?: string;
  image: string;
  bounds: {
    southWest: [number, number];
    northEast: [number, number];
  };
  opacity: number;
}

export interface PlotsConfig {
  companyName: string;
  locations: PlotLocation[];
}
